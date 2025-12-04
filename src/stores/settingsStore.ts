import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'glass';
export type Language = 'en' | 'hi';

interface SettingsState {
  theme: Theme;
  accentColor: string;
  language: Language;
  fontSize: number;
  highContrast: boolean;
  wallpaper: string;
  desktopIconSize: number;
  
  setTheme: (theme: Theme) => void;
  setAccentColor: (color: string) => void;
  setLanguage: (language: Language) => void;
  setFontSize: (size: number) => void;
  setHighContrast: (enabled: boolean) => void;
  setWallpaper: (wallpaper: string) => void;
  setDesktopIconSize: (size: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'dark',
      accentColor: '#FF006E',
      language: 'en',
      fontSize: 14,
      highContrast: false,
      wallpaper: '/assets/wallpaper-default.jpg',
      desktopIconSize: 80,

      setTheme: (theme) => set({ theme }),
      setAccentColor: (color) => set({ accentColor: color }),
      setLanguage: (language) => set({ language }),
      setFontSize: (size) => set({ fontSize: size }),
      setHighContrast: (enabled) => set({ highContrast: enabled }),
      setWallpaper: (wallpaper) => set({ wallpaper }),
      setDesktopIconSize: (size) => set({ desktopIconSize: size }),
    }),
    {
      name: 'webos-settings',
    }
  )
);