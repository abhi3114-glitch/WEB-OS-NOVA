import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export interface Notification {
  id: string;
  title: string;
  message: string;
  icon?: string;
  timestamp: Date;
  read: boolean;
  actions?: Array<{ label: string; onClick: () => void }>;
}

interface NotificationStore {
  notifications: Notification[];
  doNotDisturb: boolean;

  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  toggleDoNotDisturb: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  doNotDisturb: false,

  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: uuidv4(),
      timestamp: new Date(),
      read: false,
    };

    set((state) => ({
      notifications: [newNotification, ...state.notifications],
    }));
  },

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },

  toggleDoNotDisturb: () => {
    set((state) => ({ doNotDisturb: !state.doNotDisturb }));
  },
}));