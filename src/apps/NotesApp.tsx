import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save, FileText, Eye, Edit } from 'lucide-react';
import { useFileSystemStore } from '@/stores/fileSystemStore';
import { useNotificationStore } from '@/stores/notificationStore';
import ReactMarkdown from 'react-markdown';

export default function NotesApp() {
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('Untitled Note');
  const [isSaving, setIsSaving] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const { createFile, updateFile } = useFileSystemStore();
  const { addNotification } = useNotificationStore();

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (content) {
        handleSave();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [content]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await createFile(fileName + '.txt', content, null);
      addNotification({
        title: 'Note Saved',
        message: `${fileName} has been saved successfully`,
        icon: '📝',
      });
    } catch (error) {
      console.error('Failed to save note:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0A0A0A]">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#FF006E]" />
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="bg-transparent text-white font-medium outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPreview(!isPreview)}
            className="text-white hover:bg-white/10"
          >
            {isPreview ? (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </>
            )}
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-gradient-to-r from-[#FF006E] to-[#00F5FF] hover:opacity-90"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      {/* Editor/Preview */}
      <div className="flex-1 p-6 overflow-auto">
        {isPreview ? (
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start typing your note... (Markdown supported)"
            className="w-full h-full bg-transparent border-none text-white resize-none focus-visible:ring-0 text-base font-mono"
          />
        )}
      </div>
    </div>
  );
}