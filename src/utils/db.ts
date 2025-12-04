import Dexie, { Table } from 'dexie';

export interface FileItem {
  id?: number;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  parentId: number | null;
  createdAt: Date;
  modifiedAt: Date;
  size?: number;
}

export class WebOSDatabase extends Dexie {
  files!: Table<FileItem>;

  constructor() {
    super('WebOSDatabase');
    this.version(1).stores({
      files: '++id, name, type, parentId, createdAt, modifiedAt',
    });
  }
}

export const db = new WebOSDatabase();

// Seed initial data
export async function seedInitialData() {
  const count = await db.files.count();
  if (count === 0) {
    // Create Welcome folder
    const welcomeFolderId = await db.files.add({
      name: 'Welcome',
      type: 'folder',
      parentId: null,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });

    // Create README.txt
    await db.files.add({
      name: 'README.txt',
      type: 'file',
      content: `Welcome to WebOS Nova!

This is a modern browser-based operating system built with React, TypeScript, and Tailwind CSS.

Features:
- Draggable and resizable windows
- File system with IndexedDB storage
- Built-in applications (Notes, Calculator, Terminal, Image Viewer, Todo)
- AI Copilot assistant
- App Store for installing new applications
- Customizable themes and settings
- PWA support for offline usage

Getting Started:
1. Double-click desktop icons to open applications
2. Use the Start Menu (bottom-left) to access all apps
3. Press Ctrl+K to open the Command Palette
4. Right-click on the desktop for context menu options
5. Click the AI Copilot icon (bottom-right) for assistance

Enjoy exploring WebOS Nova!`,
      parentId: welcomeFolderId as number,
      createdAt: new Date(),
      modifiedAt: new Date(),
      size: 500,
    });

    // Create demo-notes.md
    await db.files.add({
      name: 'demo-notes.md',
      type: 'file',
      content: `# WebOS Nova Demo Notes

## What is WebOS Nova?

WebOS Nova is a fully functional operating system that runs entirely in your web browser. It provides a familiar desktop experience with modern web technologies.

## Key Features

### Window Management
- Drag windows to move them around
- Resize windows from any edge or corner
- Minimize, maximize, and close windows
- Multiple windows can be open simultaneously

### File System
- Create, read, update, and delete files
- Organize files in folders
- Search through your files
- Import and export files as ZIP

### Built-in Apps
- **Notes**: Rich text editor with auto-save
- **Calculator**: Standard calculator with keyboard support
- **Terminal**: Command-line interface with mock shell
- **Image Viewer**: View images with zoom controls
- **Todo**: Task management with priorities

### Customization
- Light, Dark, and Glass themes
- Custom accent colors
- Wallpaper selection
- Accessibility options

## Technical Stack

- React 19 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- Zustand for state management
- IndexedDB (via Dexie) for data persistence
- xterm.js for terminal emulation

## Future Enhancements

- Multi-user support
- Real-time collaboration
- More built-in applications
- Plugin system for third-party apps
- Cloud sync capabilities

---

*Last updated: ${new Date().toLocaleDateString()}*`,
      parentId: welcomeFolderId as number,
      createdAt: new Date(),
      modifiedAt: new Date(),
      size: 1200,
    });

    // Create Documents folder
    await db.files.add({
      name: 'Documents',
      type: 'folder',
      parentId: null,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });

    // Create Pictures folder
    await db.files.add({
      name: 'Pictures',
      type: 'folder',
      parentId: null,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });
  }
}