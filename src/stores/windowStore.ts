import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  icon?: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  content?: React.ReactNode;
}

interface WindowStore {
  windows: WindowState[];
  activeWindowId: string | null;
  maxZIndex: number;
  
  openWindow: (appId: string, title: string, icon?: string, content?: React.ReactNode) => string;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  activeWindowId: null,
  maxZIndex: 1000,

  openWindow: (appId, title, icon, content) => {
    const id = uuidv4();
    const newZIndex = get().maxZIndex + 1;
    
    const newWindow: WindowState = {
      id,
      appId,
      title,
      icon,
      position: { 
        x: 100 + (get().windows.length * 30), 
        y: 100 + (get().windows.length * 30) 
      },
      size: { width: 800, height: 600 },
      isMinimized: false,
      isMaximized: false,
      zIndex: newZIndex,
      content,
    };

    set({
      windows: [...get().windows, newWindow],
      activeWindowId: id,
      maxZIndex: newZIndex,
    });

    return id;
  },

  closeWindow: (id) => {
    set({
      windows: get().windows.filter((w) => w.id !== id),
      activeWindowId: get().activeWindowId === id ? null : get().activeWindowId,
    });
  },

  minimizeWindow: (id) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
      activeWindowId: null,
    });
  },

  maximizeWindow: (id) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, isMaximized: true, isMinimized: false } : w
      ),
    });
  },

  restoreWindow: (id) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, isMaximized: false, isMinimized: false } : w
      ),
      activeWindowId: id,
    });
  },

  focusWindow: (id) => {
    const newZIndex = get().maxZIndex + 1;
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, zIndex: newZIndex, isMinimized: false } : w
      ),
      activeWindowId: id,
      maxZIndex: newZIndex,
    });
  },

  updateWindowPosition: (id, position) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    });
  },

  updateWindowSize: (id, size) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, size } : w
      ),
    });
  },
}));