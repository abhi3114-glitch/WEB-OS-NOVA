import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/stores/windowStore';
import { useAppStore } from '@/stores/appStore';
import { Search, Power, Settings as SettingsIcon } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StartMenu({ isOpen, onClose }: StartMenuProps) {
  const { openWindow } = useWindowStore();
  const { apps } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter apps: must be installed AND match search query
  const filteredApps = apps.filter((app) =>
    app.installed && app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedApps = apps.filter(app => app.installed && app.pinned);
  const allInstalledApps = apps.filter(app => app.installed);

  const handleAppClick = (app: typeof apps[0]) => {
    openWindow(app.id, app.name, app.icon);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9997]"
          />

          {/* Start Menu */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-[70px] left-4 w-[600px] h-[700px] bg-[#1A1A1A]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl z-[9998] overflow-hidden"
          >
            {/* Search Bar */}
            <div className="p-4 border-b border-white/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search apps..."
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto h-[calc(100%-140px)]">
              {searchQuery ? (
                // Search Results
                <div className="grid grid-cols-4 gap-4">
                  {filteredApps.map((app) => (
                    <motion.button
                      key={app.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAppClick(app)}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <div className="text-3xl mb-1">{app.icon}</div>
                      <span className="text-white text-xs text-center">
                        {app.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Pinned Apps */}
                  <div>
                    <h3 className="text-white/60 text-sm font-medium mb-4 px-2">Pinned</h3>
                    <div className="grid grid-cols-4 gap-4">
                      {pinnedApps.map((app) => (
                        <motion.button
                          key={app.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAppClick(app)}
                          className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 transition-colors"
                        >
                          <div className="text-3xl mb-1">{app.icon}</div>
                          <span className="text-white text-xs text-center">
                            {app.name}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* All Apps */}
                  <div>
                    <h3 className="text-white/60 text-sm font-medium mb-4 px-2">All Apps</h3>
                    <div className="grid grid-cols-4 gap-4">
                      {allInstalledApps.map((app) => (
                        <motion.button
                          key={app.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAppClick(app)}
                          className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 transition-colors"
                        >
                          <div className="text-3xl mb-1">{app.icon}</div>
                          <span className="text-white text-xs text-center">
                            {app.name}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile & Power */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-[#0A0A0A]/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF006E] to-[#00F5FF] flex items-center justify-center">
                  <span className="text-white font-bold">U</span>
                </div>
                <div>
                  <div className="text-white text-sm font-medium">User</div>
                  <div className="text-white/60 text-xs">user@webos.nova</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openWindow('settings', 'Settings', '⚙️')}
                  className="text-white hover:bg-white/10"
                >
                  <SettingsIcon className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-red-500/20"
                >
                  <Power className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}