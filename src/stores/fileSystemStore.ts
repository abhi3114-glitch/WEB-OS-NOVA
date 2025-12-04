import { create } from 'zustand';
import { db, FileItem } from '@/utils/db';
import JSZip from 'jszip';

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
  exportToZip: (folderId: number | null) => Promise<Blob>;
  importFromZip: (file: File, parentId: number | null) => Promise<void>;
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

  exportToZip: async (folderId) => {
    const zip = new JSZip();
    const files = await db.files.where('parentId').equals(folderId).toArray();

    for (const file of files) {
      if (file.type === 'file' && file.content) {
        zip.file(file.name, file.content);
      } else if (file.type === 'folder') {
        // Recursive export not implemented for simplicity in this version
        // Ideally we would recursively add folders
        zip.folder(file.name);
      }
    }

    return await zip.generateAsync({ type: 'blob' });
  },

  importFromZip: async (file, parentId) => {
    const zip = await JSZip.loadAsync(file);

    zip.forEach(async (relativePath, zipEntry) => {
      if (!zipEntry.dir) {
        const content = await zipEntry.async('string');
        await db.files.add({
          name: zipEntry.name.split('/').pop() || zipEntry.name,
          type: 'file',
          content,
          parentId,
          createdAt: new Date(),
          modifiedAt: new Date(),
          size: content.length,
        });
      }
    });
  },
}));