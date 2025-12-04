import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, FileText, Settings, AppWindow } from 'lucide-react';
import { useWindowStore } from '@/stores/windowStore';
import { APPS } from '@/utils/constants';
import { Input } from '@/components/ui/input';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Command {
  id: string;
  title: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { openWindow } = useWindowStore();

  const commands: Command[] = [
    ...APPS.map((app) => ({
      id: `open-${app.id}`,
      title: `Open ${app.name}`,
      icon: <AppWindow className="w-4 h-4" />,
      action: () => openWindow(app.id, app.name, app.icon),
    })),
    {
      id: 'new-file',
      title: 'Create New File',
      icon: <FileText className="w-4 h-4" />,
      action: () => {
        // TODO: Implement create file logic
        console.log('Create file');
      },
      shortcut: 'Ctrl+N',
    },
    {
      id: 'open-terminal',
      title: 'Run Terminal Command',
      icon: <Terminal className="w-4 h-4" />,
      action: () => openWindow('terminal', 'Terminal', '/assets/icons/terminal.png'),
    },
    {
      id: 'settings',
      title: 'Open Settings',
      icon: <Settings className="w-4 h-4" />,
      action: () => {
        // TODO: Open settings
        console.log('Open settings');
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            onClose();
          }
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[600px] max-w-[90vw] bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl z-[10000] overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 flex items-center gap-3">
              <Search className="w-5 h-5 text-white/40" />
              <Input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="border-none bg-transparent text-white placeholder:text-white/40 focus-visible:ring-0 p-0 h-auto text-lg"
              />
            </div>
            <div className="max-h-[400px] overflow-y-auto p-2">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, index) => (
                  <button
                    key={cmd.id}
                    onClick={() => {
                      cmd.action();
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      index === selectedIndex
                        ? 'bg-[#FF006E]/20 text-white'
                        : 'text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {cmd.icon}
                      <span className="font-medium">{cmd.title}</span>
                    </div>
                    {cmd.shortcut && (
                      <span className="text-xs bg-white/10 px-2 py-1 rounded text-white/50">
                        {cmd.shortcut}
                      </span>
                    )}
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-white/40">
                  No commands found
                </div>
              )}
            </div>
            <div className="p-2 border-t border-white/10 bg-white/5 flex items-center justify-between text-xs text-white/40 px-4">
              <div className="flex gap-2">
                <span>↑↓ to navigate</span>
                <span>↵ to select</span>
              </div>
              <span>esc to close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
