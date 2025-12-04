import { useSettingsStore } from '@/stores/settingsStore';
import { useWindowStore } from '@/stores/windowStore';
import { APPS } from '@/utils/constants';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { FileText, Folder, Settings, Trash2 } from 'lucide-react';

export default function Desktop() {
  const { wallpaper } = useSettingsStore();
  const { openWindow } = useWindowStore();
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  const handleDoubleClick = (appId: string) => {
    const app = APPS.find((a) => a.id === appId);
    if (app) {
      openWindow(app.id, app.name, app.icon);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className="fixed inset-0 overflow-hidden"
          style={{
            backgroundImage: `url(${wallpaper})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Parallax overlay */}
          <motion.div
            className="absolute inset-0 bg-black/20"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          />

          {/* Desktop Icons Grid */}
          <div className="absolute top-8 left-8 grid grid-cols-1 gap-6 w-[120px]">
            {APPS.slice(0, 4).map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onDoubleClick={() => handleDoubleClick(app.id)}
                className="flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer hover:bg-white/10 transition-colors group"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform">
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white text-sm font-medium text-center drop-shadow-lg">
                  {app.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-64 bg-[#1A1A1A]/95 backdrop-blur-xl border-white/10">
        <ContextMenuItem className="text-white hover:bg-white/10">
          <FileText className="mr-2 h-4 w-4" />
          New File
        </ContextMenuItem>
        <ContextMenuItem className="text-white hover:bg-white/10">
          <Folder className="mr-2 h-4 w-4" />
          New Folder
        </ContextMenuItem>
        <ContextMenuItem className="text-white hover:bg-white/10">
          <Settings className="mr-2 h-4 w-4" />
          Desktop Settings
        </ContextMenuItem>
        <ContextMenuItem className="text-white hover:bg-white/10">
          <Trash2 className="mr-2 h-4 w-4" />
          Empty Recycle Bin
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}