import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search, Download, Check, Star, Trash2 } from 'lucide-react';
import { useNotificationStore } from '@/stores/notificationStore';
import { useAppStore } from '@/stores/appStore';

export default function AppStoreApp() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const { apps, installApp, uninstallApp } = useAppStore();
    const { addNotification } = useNotificationStore();

    const categories = ['All', ...Array.from(new Set(apps.map((app) => app.category)))];

    const filteredApps = apps.filter((app) => {
        const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleInstall = (appId: string) => {
        installApp(appId);
        const app = apps.find(a => a.id === appId);
        addNotification({
            title: 'App Installed',
            message: `${app?.name} has been successfully installed.`,
            icon: '⬇️',
        });
    };

    const handleUninstall = (appId: string) => {
        uninstallApp(appId);
        const app = apps.find(a => a.id === appId);
        addNotification({
            title: 'App Uninstalled',
            message: `${app?.name} has been removed.`,
            icon: '🗑️',
        });
    };

    return (
        <div className="h-full flex flex-col bg-[#0A0A0A] text-white">
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-[#FF006E]/10 to-[#00F5FF]/10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FF006E] to-[#00F5FF] bg-clip-text text-transparent">
                        App Store
                    </h1>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <Input
                            placeholder="Search apps..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? 'default' : 'ghost'}
                            onClick={() => setSelectedCategory(category)}
                            className={`whitespace-nowrap ${selectedCategory === category
                                    ? 'bg-[#FF006E] text-white'
                                    : 'text-white/60 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>

            {/* App Grid */}
            <ScrollArea className="flex-1 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredApps.map((app) => (
                        <div
                            key={app.id}
                            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-[1.02] group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="text-4xl">{app.icon}</div>
                                <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full">
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    <span className="text-xs font-medium">{app.rating}</span>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold mb-1">{app.name}</h3>
                            <p className="text-sm text-white/60 mb-4 line-clamp-2 h-10">
                                {app.description}
                            </p>

                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-xs text-white/40">{app.category}</span>
                                {app.installed ? (
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => handleUninstall(app.id)}
                                        className="bg-white/10 text-white/60 hover:bg-red-500/20 hover:text-red-500"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Uninstall
                                    </Button>
                                ) : (
                                    <Button
                                        size="sm"
                                        onClick={() => handleInstall(app.id)}
                                        className="bg-gradient-to-r from-[#FF006E] to-[#00F5FF] text-white"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Get
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
