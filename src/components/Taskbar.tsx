import { useWindowStore } from '@/stores/windowStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { useAppStore } from '@/stores/appStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  LayoutGrid,
  Wifi,
  Battery,
  Bell,
  Bot,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { soundManager } from '@/utils/sound';

interface TaskbarProps {
  onStartMenuToggle: () => void;
  onNotificationsToggle: () => void;
  onCopilotToggle: () => void;
}

export default function Taskbar({
  onStartMenuToggle,
  onNotificationsToggle,
  onCopilotToggle
}: TaskbarProps) {
  const {
    windows,
    activeWindowId,
    minimizeWindow,
    restoreWindow,
    focusWindow,
    currentDesktop,
    switchDesktop,
    openWindow
  } = useWindowStore();
  const { notifications } = useNotificationStore();
  const { apps } = useAppStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAppClick = (appId: string, windowId?: string) => {
    if (windowId) {
      // App is already running
      const window = windows.find(w => w.id === windowId);
      if (window) {
        if (window.desktopId !== currentDesktop) {
          switchDesktop(window.desktopId);
        }
        if (window.isMinimized) {
          restoreWindow(windowId);
        } else if (activeWindowId === windowId) {
          minimizeWindow(windowId);
        } else {
          focusWindow(windowId);
        }
      }
    } else {
      // App is pinned but not running
      const app = apps.find(a => a.id === appId);
      if (app) {
        openWindow(app.id, app.name, app.icon);
      }
    }
  };

  // Combine pinned apps and running apps
  // Logic: Show all pinned apps. If running, show running state. If not pinned but running, show too.
  const pinnedApps = apps.filter(app => app.pinned && app.installed);
  const runningApps = windows; // All running windows

  // Create a merged list for display
  // We want to show pinned apps first, then unpinned running apps?
  // Or just mix them? Windows style: Pinned apps stay, running apps appear.

  const taskbarItems = [...pinnedApps];

  // Add running apps that are NOT pinned
  runningApps.forEach(window => {
    if (!taskbarItems.find(app => app.id === window.appId)) {
      const app = apps.find(a => a.id === window.appId);
      if (app) {
        taskbarItems.push(app);
      }
    }
  });

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#0A0A0A]/80 backdrop-blur-xl border-t border-white/10 flex items-center px-4 z-50">
      {/* Start & Widgets */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onStartMenuToggle}
          className="text-white hover:bg-white/10"
        >
          <LayoutGrid className="w-5 h-5 text-[#FF006E]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCopilotToggle}
          className="text-white hover:bg-white/10"
        >
          <Bot className="w-5 h-5 text-[#00F5FF]" />
        </Button>

        {/* Desktop Switcher */}
        <div className="flex items-center bg-white/5 rounded-lg p-1 ml-2 gap-1">
          {[0, 1, 2].map((id) => (
            <button
              key={id}
              onClick={() => switchDesktop(id)}
              className={`
                w-6 h-6 rounded flex items-center justify-center text-xs transition-colors
                ${currentDesktop === id ? 'bg-white/20 text-white font-bold' : 'text-white/40 hover:bg-white/10'}
              `}
            >
              {id + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Apps */}
      <div className="flex-1 flex items-center justify-center gap-2 px-4">
        <AnimatePresence>
          {taskbarItems.map((app) => {
            // Check if running
            const window = windows.find(w => w.appId === app.id);
            const isRunning = !!window;
            const isActive = window?.id === activeWindowId && !window?.isMinimized;

            return (
              <motion.button
                key={app.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                onClick={() => handleAppClick(app.id, window?.id)}
                className={`
                  relative group p-2 rounded-lg transition-all
                  ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}
                `}
              >
                <div className="text-xl">{app.icon}</div>

                {/* Running Indicator */}
                {isRunning && (
                  <motion.div
                    layoutId={`indicator-${app.id}`}
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isActive ? 'bg-[#FF006E] w-4' : 'bg-white/50'}`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#1A1A1A] border border-white/10 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {app.name}
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
          <ChevronUp className="w-4 h-4 text-white/60" />
        </div>

        <div className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
          <Wifi className="w-4 h-4 text-white" />
        </div>

        <div className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
          <Battery className="w-4 h-4 text-white" />
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNotificationsToggle}
          className="relative text-white hover:bg-white/10"
        >
          <Bell className="w-4 h-4" />
          {notifications.length > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF006E] rounded-full" />
          )}
        </Button>

        <div className="flex flex-col items-end px-2 py-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer ml-2">
          <span className="text-xs font-medium text-white">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="text-[10px] text-white/60">
            {time.toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}