import { create } from 'zustand';
import { db, FileItem } from '@/utils/db';

interface FileSystemStore {
  currentFolderId: number | null;
  selectedFileId: number | null;
  
  setCurrentFolder: (id: number | null) => void;
  setSelectedFile: (id: number | null) => void;
  
  createFile: (name: string, content: string, parentId: number | null) => Promise<number>;
  createFolder: (name: string, parentId: number | null) => Promise<number>;
  readFile: (id: number) => Promise<FileItem | undefined>;
  updateFile: (id: number, updates: Partial<FileItem>) => Promise<void>;
  deleteFile: (id: number) => Promise<void>;
  getFiles: (parentId: number | null) => Promise<FileItem[]>;
  searchFiles: (query: string) => Promise<FileItem[]>;
}

export const useFileSystemStore = create<FileSystemStore>((set) => ({
  currentFolderId: null,
  selectedFileId: null,

  setCurrentFolder: (id) => set({ currentFolderId: id }),
  setSelectedFile: (id) => set({ selectedFileId: id }),

  createFile: async (name, content, parentId) => {
    const id = await db.files.add({
      name,
      type: 'file',
      content,
      parentId,
      createdAt: new Date(),
      modifiedAt: new Date(),
      size: content.length,
    });
    return id as number;
  },

  createFolder: async (name, parentId) => {
    const id = await db.files.add({
      name,
      type: 'folder',
      parentId,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });
    return id as number;
  },

  readFile: async (id) => {
    return await db.files.get(id);
  },

  updateFile: async (id, updates) => {
    await db.files.update(id, {
      ...updates,
      modifiedAt: new Date(),
    });
  },

  deleteFile: async (id) => {
    // Delete file and all its children (if folder)
    const file = await db.files.get(id);
    if (file?.type === 'folder') {
      const children = await db.files.where('parentId').equals(id).toArray();
      for (const child of children) {
        if (child.id) {
          await db.files.delete(child.id);
        }
      }
    }
    await db.files.delete(id);
  },

  getFiles: async (parentId) => {
    return await db.files.where('parentId').equals(parentId).toArray();
  },

  searchFiles: async (query) => {
    const allFiles = await db.files.toArray();
    return allFiles.filter(
      (file) =>
        file.name.toLowerCase().includes(query.toLowerCase()) ||
        (file.content && file.content.toLowerCase().includes(query.toLowerCase()))
    );
  },
}));