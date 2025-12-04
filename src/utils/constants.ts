export const APPS = [
  {
    id: 'file-explorer',
    name: 'File Explorer',
    icon: '/assets/app-icon-files.png',
    description: 'Browse and manage your files',
  },
  {
    id: 'notes',
    name: 'Notes',
    icon: '/assets/app-icon-notes.png',
    description: 'Take notes and write documents',
  },
  {
    id: 'calculator',
    name: 'Calculator',
    icon: '/assets/app-icon-calculator.png',
    description: 'Perform calculations',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: '/assets/app-icon-terminal.png',
    description: 'Command line interface',
  },
  {
    id: 'image-viewer',
    name: 'Image Viewer',
    icon: '/assets/app-icon-files_variant_1.png',
    description: 'View and manage images',
  },
  {
    id: 'todo',
    name: 'Todo',
    icon: '/assets/app-icon-notes_variant_1.png',
    description: 'Manage your tasks',
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: '/assets/app-icon-files_variant_1.png',
    description: 'Configure system settings',
  },
  {
    id: 'app-store',
    name: 'App Store',
    icon: '/assets/app-icon-calculator_variant_1.png',
    description: 'Download and install apps',
  },
];

export const WALLPAPERS = [
  {
    id: 'default',
    name: 'Default',
    url: '/assets/wallpaper-default.jpg',
  },
  {
    id: 'space',
    name: 'Space',
    url: '/assets/wallpaper-space.jpg',
  },
  {
    id: 'waves',
    name: 'Waves',
    url: '/assets/wallpaper-waves.jpg',
  },
];

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  GLASS: 'glass',
} as const;

export const ACCENT_COLORS = [
  { id: 'pink', name: 'Pink', value: '#FF006E' },
  { id: 'teal', name: 'Teal', value: '#00F5FF' },
  { id: 'purple', name: 'Purple', value: '#9D4EDD' },
  { id: 'green', name: 'Green', value: '#00FF88' },
  { id: 'orange', name: 'Orange', value: '#FF6B35' },
  { id: 'blue', name: 'Blue', value: '#0096FF' },
];

export const KEYBOARD_SHORTCUTS = [
  { key: 'Ctrl+K', description: 'Open Command Palette' },
  { key: 'Ctrl+N', description: 'New File' },
  { key: 'Ctrl+Shift+N', description: 'New Folder' },
  { key: 'Alt+Tab', description: 'Switch Windows' },
  { key: 'Win', description: 'Open Start Menu' },
  { key: 'Ctrl+Q', description: 'Close Window' },
  { key: 'F11', description: 'Toggle Fullscreen' },
];

export const TERMINAL_COMMANDS = {
  help: 'Available commands: help, ls, cd, cat, open, clear, echo, mkdir, rm, pwd',
  ls: 'List files and directories',
  cd: 'Change directory',
  cat: 'Display file contents',
  open: 'Open a file or application',
  clear: 'Clear terminal screen',
  echo: 'Print text to terminal',
  mkdir: 'Create a new directory',
  rm: 'Remove a file or directory',
  pwd: 'Print working directory',
};