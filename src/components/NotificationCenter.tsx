import { useNotificationStore } from '@/stores/notificationStore';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { X, Bell, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface NotificationCenterProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
    const { notifications, removeNotification, clearNotifications } = useNotificationStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 300 }}
                    className="fixed right-4 bottom-16 w-80 h-[500px] bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-40"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <Bell className="w-5 h-5 text-[#FF006E]" />
                            <h3 className="font-bold text-white">Notifications</h3>
                            <span className="bg-white/10 text-xs px-2 py-0.5 rounded-full text-white/60">
                                {notifications.length}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            {notifications.length > 0 && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={clearNotifications}
                                    className="text-white/60 hover:text-white hover:bg-white/10"
                                    title="Clear all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            )}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="text-white/60 hover:text-white hover:bg-white/10"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Notifications List */}
                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-3">
                            {notifications.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-64 text-white/40">
                                    <Bell className="w-12 h-12 mb-4 opacity-20" />
                                    <p>No new notifications</p>
                                </div>
                            ) : (
                                notifications.map((notification) => (
                                    <motion.div
                                        key={notification.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        className="bg-white/5 border border-white/10 rounded-xl p-3 relative group"
                                    >
                                        <button
                                            onClick={() => removeNotification(notification.id)}
                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-white/40 hover:text-white"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                        <div className="flex gap-3">
                                            <div className="text-2xl">{notification.icon || '📢'}</div>
                                            <div>
                                                <h4 className="font-medium text-sm text-white">
                                                    {notification.title}
                                                </h4>
                                                <p className="text-xs text-white/60 mt-1">
                                                    {notification.message}
                                                </p>
                                                <span className="text-[10px] text-white/30 mt-2 block">
                                                    {new Date(notification.timestamp).toLocaleTimeString()}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </ScrollArea>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
