import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import BootScreen from '@/components/BootScreen';
import LockScreen from '@/components/LockScreen';
import Desktop from '@/components/Desktop';
import Taskbar from '@/components/Taskbar';
import StartMenu from '@/components/StartMenu';
import Window from '@/components/Window';
import CommandPalette from '@/components/CommandPalette';
import CopilotWidget from '@/components/CopilotWidget';
import NotificationCenter from '@/components/NotificationCenter';
import { useWindowStore } from '@/stores/windowStore';
import { seedInitialData } from '@/utils/db';
import NotesApp from '@/apps/NotesApp';
import CalculatorApp from '@/apps/CalculatorApp';
import TerminalApp from '@/apps/TerminalApp';
import FileExplorerApp from '@/apps/FileExplorerApp';
import TodoApp from '@/apps/TodoApp';
import ImageViewerApp from '@/apps/ImageViewerApp';
import AppStoreApp from '@/apps/AppStoreApp';
import SettingsApp from '@/apps/SettingsApp';
import MusicPlayerApp from '@/apps/MusicPlayerApp';
import BrowserApp from '@/apps/BrowserApp';
import EmailApp from '@/apps/EmailApp';
import CalendarFullApp from '@/apps/CalendarFullApp';
import CameraApp from '@/apps/CameraApp';
import VideoPlayerApp from '@/apps/VideoPlayerApp';
import CodeEditorApp from '@/apps/CodeEditorApp';
import MarkdownEditorApp from '@/apps/MarkdownEditorApp';
import PDFViewerApp from '@/apps/PDFViewerApp';
import WeatherFullApp from '@/apps/WeatherFullApp';
import MapsApp from '@/apps/MapsApp';
import ChatApp from '@/apps/ChatApp';
import ClockApp from '@/apps/ClockApp';
import VoiceRecorderApp from '@/apps/VoiceRecorderApp';
import PaintApp from '@/apps/PaintApp';
import ScreenshotApp from '@/apps/ScreenshotApp';
import SystemMonitorApp from '@/apps/SystemMonitorApp';

export default function Index() {
  const [isBooting, setIsBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const { windows, currentDesktop } = useWindowStore();

  useEffect(() => {
    // Initialize database
    seedInitialData();

    // Global keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      // Lock screen shortcut (Win+L simulation)
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        setIsLocked(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBootComplete = () => {
    setIsBooting(false);
    setIsLocked(true);
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
      case 'image-viewer':
        return <ImageViewerApp />;
      case 'app-store':
        return <AppStoreApp />;
      case 'settings':
        return <SettingsApp />;
      case 'music-player':
        return <MusicPlayerApp />;
      case 'browser':
        return <BrowserApp />;
      case 'email':
        return <EmailApp />;
      case 'calendar-full':
        return <CalendarFullApp />;
      case 'camera':
        return <CameraApp />;
      case 'video-player':
        return <VideoPlayerApp />;
      case 'code-editor':
        return <CodeEditorApp />;
      case 'markdown-editor':
        return <MarkdownEditorApp />;
      case 'pdf-viewer':
        return <PDFViewerApp />;
      case 'weather-full':
        return <WeatherFullApp />;
      case 'maps':
        return <MapsApp />;
      case 'chat':
        return <ChatApp />;
      case 'clock':
        return <ClockApp />;
      case 'voice-recorder':
        return <VoiceRecorderApp />;
      case 'paint':
        return <PaintApp />;
      case 'screenshot':
        return <ScreenshotApp />;
      case 'system-monitor':
        return <SystemMonitorApp />;
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
      {/* Lock Screen */}
      <AnimatePresence>
        {isLocked && (
          <LockScreen onUnlock={() => setIsLocked(false)} />
        )}
      </AnimatePresence>

      {!isLocked && (
        <>
          {/* Desktop */}
          <Desktop />

          {/* Windows (Filtered by Desktop) */}
          <AnimatePresence>
            {windows
              .filter((window) => window.desktopId === currentDesktop)
              .map((window) => (
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

          {/* Command Palette */}
          <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
          />

          {/* Copilot Widget */}
          <CopilotWidget
            isOpen={isCopilotOpen}
            onClose={() => setIsCopilotOpen(false)}
          />

          {/* Notification Center */}
          <NotificationCenter
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
          />

          {/* Taskbar */}
          <Taskbar
            onStartMenuToggle={() => setIsStartMenuOpen(!isStartMenuOpen)}
            onNotificationsToggle={() => setIsNotificationsOpen(!isNotificationsOpen)}
            onCopilotToggle={() => setIsCopilotOpen(!isCopilotOpen)}
          />
        </>
      )}
    </div>
  );
}