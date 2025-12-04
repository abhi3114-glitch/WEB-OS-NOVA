import { useState, useEffect } from 'react';
import { useFileSystemStore } from '@/stores/fileSystemStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileItem } from '@/utils/db';
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
  const { 
    currentFolderId, 
    setCurrentFolder, 
    createFile, 
    createFolder, 
    deleteFile, 
    getFiles,
    searchFiles 
  } = useFileSystemStore();
  
  const [files, setFiles] = useState<FileItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [folderPath, setFolderPath] = useState<Array<{ id: number | null; name: string }>>([
    { id: null, name: 'Home' }
  ]);

  useEffect(() => {
    loadFiles();
  }, [currentFolderId, searchQuery]);

  const loadFiles = async () => {
    if (searchQuery) {
      const results = await searchFiles(searchQuery);
      setFiles(results);
    } else {
      const items = await getFiles(currentFolderId);
      setFiles(items);
    }
  };

  const handleNewFolder = async () => {
    const name = prompt('Enter folder name:');
    if (name) {
      await createFolder(name, currentFolderId);
      loadFiles();
    }
  };

  const handleNewFile = async () => {
    const name = prompt('Enter file name:');
    if (name) {
      await createFile(name, '', currentFolderId);
      loadFiles();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await deleteFile(id);
      loadFiles();
    }
  };

  const handleFolderOpen = (folder: FileItem) => {
    if (folder.id) {
      setCurrentFolder(folder.id);
      setFolderPath([...folderPath, { id: folder.id, name: folder.name }]);
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    const newPath = folderPath.slice(0, index + 1);
    setFolderPath(newPath);
    setCurrentFolder(newPath[newPath.length - 1].id);
  };

  const getFileIcon = (file: FileItem) => {
    if (file.type === 'folder') {
      return <Folder className="w-12 h-12 text-[#FF006E]" />;
    }
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) {
      return <ImageIcon className="w-12 h-12 text-blue-400" />;
    }
    if (['txt', 'md', 'json'].includes(ext || '')) {
      return <FileText className="w-12 h-12 text-green-400" />;
    }
    return <File className="w-12 h-12 text-gray-400" />;
  };

  return (
    <div className="h-full flex flex-col bg-[#0A0A0A] text-white">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-4 border-b border-white/10">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setCurrentFolder(null);
            setFolderPath([{ id: null, name: 'Home' }]);
          }}
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
        {folderPath.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-4 h-4" />}
            <button
              onClick={() => handleBreadcrumbClick(index)}
              className="hover:text-white transition-colors"
            >
              {crumb.name}
            </button>
          </div>
        ))}
      </div>

      {/* File List */}
      <ScrollArea className="flex-1 p-4">
        <div className="grid grid-cols-4 gap-4">
          {files.map((file) => (
            <ContextMenu key={file.id}>
              <ContextMenuTrigger>
                <div
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer hover:bg-white/5 transition-colors ${
                    selectedItem === file.id ? 'bg-white/10' : ''
                  }`}
                  onClick={() => setSelectedItem(file.id || null)}
                  onDoubleClick={() => {
                    if (file.type === 'folder') {
                      handleFolderOpen(file);
                    }
                  }}
                >
                  {getFileIcon(file)}
                  <span className="text-sm text-center truncate w-full">{file.name}</span>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="bg-[#1A1A1A]/95 backdrop-blur-xl border-white/10">
                <ContextMenuItem
                  onClick={() => file.id && handleDelete(file.id)}
                  className="text-white hover:bg-white/10"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </div>

        {files.length === 0 && (
          <div className="flex items-center justify-center h-64 text-white/40">
            <p>No files or folders found</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}