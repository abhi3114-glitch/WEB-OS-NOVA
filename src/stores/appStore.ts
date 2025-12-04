import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AppItem {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: string;
    rating: number;
    installed: boolean;
    pinned: boolean;
    component?: string; // For dynamic loading if needed
}

interface AppStore {
    apps: AppItem[];
    installApp: (appId: string) => void;
    uninstallApp: (appId: string) => void;
    togglePin: (appId: string) => void;
    isInstalled: (appId: string) => boolean;
}

const INITIAL_APPS: AppItem[] = [
    {
        id: 'notes',
        name: 'Notes',
        description: 'A simple and elegant note-taking application with Markdown support.',
        icon: '📝',
        category: 'Productivity',
        rating: 4.8,
        installed: true,
        pinned: true,
    },
    {
        id: 'calculator',
        name: 'Calculator',
        description: 'Perform basic and advanced mathematical calculations.',
        icon: '🧮',
        category: 'Utilities',
        rating: 4.5,
        installed: true,
        pinned: true,
    },
    {
        id: 'terminal',
        name: 'Terminal',
        description: 'Command line interface for system operations and file management.',
        icon: '💻',
        category: 'Developer Tools',
        rating: 4.9,
        installed: true,
        pinned: true,
    },
    {
        id: 'file-explorer',
        name: 'File Explorer',
        description: 'Manage your files and folders with ease.',
        icon: '📁',
        category: 'Utilities',
        rating: 4.7,
        installed: true,
        pinned: true,
    },
    {
        id: 'todo',
        name: 'Todo List',
        description: 'Stay organized with this simple task manager.',
        icon: '✅',
        category: 'Productivity',
        rating: 4.6,
        installed: true,
        pinned: false,
    },
    {
        id: 'image-viewer',
        name: 'Image Viewer',
        description: 'View your photos and images.',
        icon: '🖼️',
        category: 'Media',
        rating: 4.4,
        installed: true,
        pinned: false,
    },
    {
        id: 'app-store',
        name: 'App Store',
        description: 'Discover and install new applications.',
        icon: '🛍️',
        category: 'System',
        rating: 5.0,
        installed: true,
        pinned: true,
    },
    {
        id: 'settings',
        name: 'Settings',
        description: 'Customize your system preferences.',
        icon: '⚙️',
        category: 'System',
        rating: 5.0,
        installed: true,
        pinned: false,
    },
    {
        id: 'music-player',
        name: 'Spotify',
        description: 'Stream millions of songs and podcasts.',
        icon: '🎧',
        category: 'Media',
        rating: 4.8,
        installed: true,
        pinned: false,
    },
    {
        id: 'browser',
        name: 'Web Browser',
        description: 'Surf the internet securely.',
        icon: '🌐',
        category: 'Internet',
        rating: 4.5,
        installed: true,
        pinned: false,
    },
    {
        id: 'email',
        name: 'Email',
        description: 'Manage your emails with a modern interface.',
        icon: '📧',
        category: 'Productivity',
        rating: 4.7,
        installed: true,
        pinned: true,
    },
    {
        id: 'calendar-full',
        name: 'Calendar',
        description: 'Organize events and manage your schedule.',
        icon: '📅',
        category: 'Productivity',
        rating: 4.6,
        installed: true,
        pinned: true,
    },
    {
        id: 'camera',
        name: 'Camera',
        description: 'Capture photos with your webcam.',
        icon: '📷',
        category: 'Media',
        rating: 4.3,
        installed: true,
        pinned: false,
    },
    {
        id: 'video-player',
        name: 'Video Player',
        description: 'Play your favorite videos.',
        icon: '🎬',
        category: 'Media',
        rating: 4.5,
        installed: true,
        pinned: false,
    },
    {
        id: 'code-editor',
        name: 'Code Editor',
        description: 'Write and edit code with syntax highlighting.',
        icon: '💻',
        category: 'Developer Tools',
        rating: 4.8,
        installed: true,
        pinned: true,
    },
    {
        id: 'markdown-editor',
        name: 'Markdown Editor',
        description: 'Write markdown with live preview.',
        icon: '📄',
        category: 'Productivity',
        rating: 4.6,
        installed: true,
        pinned: false,
    },
    {
        id: 'pdf-viewer',
        name: 'PDF Viewer',
        description: 'View PDF documents.',
        icon: '📕',
        category: 'Office',
        rating: 4.4,
        installed: false,
        pinned: false,
    },
    {
        id: 'weather-full',
        name: 'Weather',
        description: 'Check weather forecasts and conditions.',
        icon: '🌤️',
        category: 'Utilities',
        rating: 4.5,
        installed: true,
        pinned: false,
    },
    {
        id: 'maps',
        name: 'Maps',
        description: 'Explore locations and get directions.',
        icon: '🗺️',
        category: 'Utilities',
        rating: 4.6,
        installed: false,
        pinned: false,
    },
    {
        id: 'chat',
        name: 'Chat',
        description: 'Message friends and colleagues.',
        icon: '💬',
        category: 'Communication',
        rating: 4.3,
        installed: false,
        pinned: false,
    },
    {
        id: 'clock',
        name: 'Clock & Alarms',
        description: 'Set alarms and view world clocks.',
        icon: '⏰',
        category: 'Utilities',
        rating: 4.4,
        installed: true,
        pinned: false,
    },
    {
        id: 'voice-recorder',
        name: 'Voice Recorder',
        description: 'Record audio and voice memos.',
        icon: '🎙️',
        category: 'Media',
        rating: 4.2,
        installed: false,
        pinned: false,
    },
    {
        id: 'paint',
        name: 'Paint',
        description: 'Create digital artwork and drawings.',
        icon: '🎨',
        category: 'Creativity',
        rating: 4.5,
        installed: true,
        pinned: false,
    },
    {
        id: 'screenshot',
        name: 'Screenshot Tool',
        description: 'Capture screenshots of your screen.',
        icon: '📸',
        category: 'Utilities',
        rating: 4.7,
        installed: true,
        pinned: false,
    },
    {
        id: 'system-monitor',
        name: 'System Monitor',
        description: 'Monitor CPU, memory, and system resources.',
        icon: '📊',
        category: 'System',
        rating: 4.8,
        installed: true,
        pinned: false,
    },
];

export const useAppStore = create<AppStore>()(
    persist(
        (set, get) => ({
            apps: INITIAL_APPS,

            installApp: (appId) => {
                set((state) => ({
                    apps: state.apps.map((app) =>
                        app.id === appId ? { ...app, installed: true } : app
                    ),
                }));
            },

            uninstallApp: (appId) => {
                set((state) => ({
                    apps: state.apps.map((app) =>
                        app.id === appId ? { ...app, installed: false, pinned: false } : app
                    ),
                }));
            },

            togglePin: (appId) => {
                set((state) => ({
                    apps: state.apps.map((app) =>
                        app.id === appId ? { ...app, pinned: !app.pinned } : app
                    ),
                }));
            },

            isInstalled: (appId) => {
                return get().apps.find((app) => app.id === appId)?.installed || false;
            },
        }),
        {
            name: 'webos-apps-storage-v2',
        }
    )
);
