import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsStore {
  wallpaper: string;
  darkMode: boolean;
  accentColor: string;
  setWallpaper: (url: string) => void;
  toggleDarkMode: () => void;
  setAccentColor: (color: string) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      wallpaper: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
      darkMode: true,
      accentColor: '#FF006E', // Default Pink

      setWallpaper: (url) => set({ wallpaper: url }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setAccentColor: (color) => set({ accentColor: color }),
    }),
    {
      name: 'webos-settings',
    }
  )
);