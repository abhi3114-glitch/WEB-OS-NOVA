import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import BootScreen from '@/components/BootScreen';
import Desktop from '@/components/Desktop';
import Taskbar from '@/components/Taskbar';
import StartMenu from '@/components/StartMenu';
import Window from '@/components/Window';
import { useWindowStore } from '@/stores/windowStore';
import { seedInitialData } from '@/utils/db';
import NotesApp from '@/apps/NotesApp';
import CalculatorApp from '@/apps/CalculatorApp';
import TerminalApp from '@/apps/TerminalApp';
import FileExplorerApp from '@/apps/FileExplorerApp';
import TodoApp from '@/apps/TodoApp';

export default function Index() {
  const [isBooting, setIsBooting] = useState(true);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { windows } = useWindowStore();

  useEffect(() => {
    // Initialize database
    seedInitialData();
  }, []);

  const handleBootComplete = () => {
    setIsBooting(false);
  };

  const getAppContent = (appId: string) => {
    switch (appId) {
      case 'notes':
        return <NotesApp />;
      case 'calculator':
        return <CalculatorApp />;
      case 'terminal':
        return <TerminalApp />;
      case 'file-explorer':
        return <FileExplorerApp />;
      case 'todo':
        return <TodoApp />;
      default:
        return (
          <div className="h-full flex items-center justify-center text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
              <p className="text-white/60">This app is under development</p>
            </div>
          </div>
        );
    }
  };

  if (isBooting) {
    return <BootScreen onBootComplete={handleBootComplete} />;
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Desktop */}
      <Desktop />

      {/* Windows */}
      <AnimatePresence>
        {windows.map((window) => (
          <Window key={window.id} window={window}>
            {getAppContent(window.appId)}
          </Window>
        ))}
      </AnimatePresence>

      {/* Start Menu */}
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
      />

      {/* Taskbar */}
      <Taskbar
        onStartMenuToggle={() => setIsStartMenuOpen(!isStartMenuOpen)}
        onNotificationsToggle={() => setIsNotificationsOpen(!isNotificationsOpen)}
      />
    </div>
  );
}