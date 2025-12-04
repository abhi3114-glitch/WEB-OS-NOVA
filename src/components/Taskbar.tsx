import { useWindowStore } from '@/stores/windowStore';
import { motion } from 'framer-motion';
import { Menu, Wifi, Battery, User, Bell } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TaskbarProps {
  onStartMenuToggle: () => void;
  onNotificationsToggle: () => void;
}

export default function Taskbar({ onStartMenuToggle, onNotificationsToggle }: TaskbarProps) {
  const { windows, focusWindow, restoreWindow } = useWindowStore();
  const [time, setTime] = useState(new Date());

  // Update time every minute
  setInterval(() => setTime(new Date()), 60000);

  const runningWindows = windows.filter((w) => !w.isMinimized);

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 h-[60px] bg-[#1A1A1A]/95 backdrop-blur-xl border-t border-white/10 flex items-center justify-between px-4 z-[9998]"
    >
      {/* Start Button */}
      <Button
        onClick={onStartMenuToggle}
        className="h-10 px-4 bg-gradient-to-r from-[#FF006E] to-[#00F5FF] hover:opacity-90 transition-opacity"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Running Apps */}
      <div className="flex-1 flex items-center gap-2 mx-4 overflow-x-auto">
        {windows.map((window) => (
          <Tooltip key={window.id}>
            <TooltipTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (window.isMinimized) {
                    restoreWindow(window.id);
                  } else {
                    focusWindow(window.id);
                  }
                }}
                className={`h-10 px-3 rounded-lg flex items-center gap-2 transition-colors ${
                  !window.isMinimized
                    ? 'bg-white/10 border border-[#FF006E]'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {window.icon && (
                  <img src={window.icon} alt="" className="w-5 h-5 object-contain" />
                )}
                <span className="text-white text-sm max-w-[100px] truncate">
                  {window.title}
                </span>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{window.title}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
        >
          <Wifi className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
        >
          <Battery className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNotificationsToggle}
          className="text-white hover:bg-white/10"
        >
          <Bell className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
        >
          <User className="w-4 h-4" />
        </Button>
        <div className="text-white text-sm ml-2">
          <div className="font-medium">
            {time.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
          <div className="text-xs text-white/60">
            {time.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}