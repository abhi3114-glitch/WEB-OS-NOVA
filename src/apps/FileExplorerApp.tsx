import { useState, useEffect } from 'react';
import { useFileSystemStore } from '@/stores/fileSystemStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Folder,
  File,
  Image as ImageIcon,
  FileText,
  Plus,
  Trash2,
  Search,
  ChevronRight,
  Home,
} from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

export default function FileExplorerApp() {
  const { files, folders, createFile, createFolder, deleteFile, deleteFolder } = useFileSystemStore();
  const [currentPath, setCurrentPath] = useState('/');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const getCurrentFolderItems = () => {
    const currentFolders = folders.filter((f) => f.parentId === currentPath);
    const currentFiles = files.filter((f) => f.parentId === currentPath);
    
    if (searchQuery) {
      return {
        folders: currentFolders.filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase())),
        files: currentFiles.filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase())),
      };
    }
    
    return { folders: currentFolders, files: currentFiles };
  };

  const { folders: displayFolders, files: displayFiles } = getCurrentFolderItems();

  const handleNewFolder = () => {
    const name = prompt('Enter folder name:');
    if (name) {
      createFolder(name, currentPath);
    }
  };

  const handleNewFile = () => {
    const name = prompt('Enter file name:');
    if (name) {
      createFile(name, '', 'text', currentPath);
    }
  };

  const handleDelete = (id: string, type: 'file' | 'folder') => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === 'file') {
        deleteFile(id);
      } else {
        deleteFolder(id);
      }
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-5 h-5 text-blue-400" />;
      case 'text':
        return <FileText className="w-5 h-5 text-green-400" />;
      default:
        return <File className="w-5 h-5 text-gray-400" />;
    }
  };

  const breadcrumbs = currentPath.split('/').filter(Boolean);

  return (
    <div className="h-full flex flex-col bg-[#0A0A0A] text-white">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-4 border-b border-white/10">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setCurrentPath('/')}
          className="text-white hover:bg-white/10"
        >
          <Home className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleNewFolder}
          className="text-white hover:bg-white/10"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Folder
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleNewFile}
          className="text-white hover:bg-white/10"
        >
          <Plus className="w-4 h-4 mr-2" />
          New File
        </Button>
        <div className="flex-1" />
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
          />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 px-4 py-2 text-sm text-white/60 border-b border-white/10">
        <button
          onClick={() => setCurrentPath('/')}
          className="hover:text-white transition-colors"
        >
          Home
        </button>
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            <button
              onClick={() => setCurrentPath('/' + breadcrumbs.slice(0, index + 1).join('/'))}
              className="hover:text-white transition-colors"
            >
              {crumb}
            </button>
          </div>
        ))}
      </div>

      {/* File List */}
      <ScrollArea className="flex-1 p-4">
        <div className="grid grid-cols-4 gap-4">
          {/* Folders */}
          {displayFolders.map((folder) => (
            <ContextMenu key={folder.id}>
              <ContextMenuTrigger>
                <div
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer hover:bg-white/5 transition-colors ${
                    selectedItem === folder.id ? 'bg-white/10' : ''
                  }`}
                  onClick={() => setSelectedItem(folder.id)}
                  onDoubleClick={() => setCurrentPath(folder.id)}
                >
                  <Folder className="w-12 h-12 text-[#FF006E]" />
                  <span className="text-sm text-center truncate w-full">{folder.name}</span>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="bg-[#1A1A1A]/95 backdrop-blur-xl border-white/10">
                <ContextMenuItem
                  onClick={() => handleDelete(folder.id, 'folder')}
                  className="text-white hover:bg-white/10"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}

          {/* Files */}
          {displayFiles.map((file) => (
            <ContextMenu key={file.id}>
              <ContextMenuTrigger>
                <div
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer hover:bg-white/5 transition-colors ${
                    selectedItem === file.id ? 'bg-white/10' : ''
                  }`}
                  onClick={() => setSelectedItem(file.id)}
                >
                  {getFileIcon(file.type)}
                  <span className="text-sm text-center truncate w-full">{file.name}</span>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="bg-[#1A1A1A]/95 backdrop-blur-xl border-white/10">
                <ContextMenuItem
                  onClick={() => handleDelete(file.id, 'file')}
                  className="text-white hover:bg-white/10"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </div>

        {displayFolders.length === 0 && displayFiles.length === 0 && (
          <div className="flex items-center justify-center h-64 text-white/40">
            <p>No files or folders found</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}