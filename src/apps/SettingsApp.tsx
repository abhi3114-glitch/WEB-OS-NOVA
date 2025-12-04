import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Monitor, User, Palette, Info, Image, Moon } from 'lucide-react';
import { useSettingsStore } from '@/stores/settingsStore';

const WALLPAPERS = [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2072&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506318137071-a8bcbf675b27?q=80&w=2072&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop',
];

const ACCENT_COLORS = [
    { name: 'Neon Pink', value: '#FF006E' },
    { name: 'Cyan', value: '#00F5FF' },
    { name: 'Purple', value: '#7000FF' },
    { name: 'Green', value: '#00FF94' },
    { name: 'Orange', value: '#FF9500' },
];

export default function SettingsApp() {
    const [activeTab, setActiveTab] = useState('personalization');
    const { wallpaper, setWallpaper, darkMode, toggleDarkMode, accentColor, setAccentColor } = useSettingsStore();

    const renderContent = () => {
        switch (activeTab) {
            case 'personalization':
                return (
                    <div className="space-y-8">
                        <section>
                            <h3 className="text-xl font-semibold mb-4">Wallpaper</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {WALLPAPERS.map((url) => (
                                    <div
                                        key={url}
                                        onClick={() => setWallpaper(url)}
                                        className={`aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${wallpaper === url ? 'border-[#FF006E]' : 'border-transparent hover:border-white/20'
                                            }`}
                                    >
                                        <img src={url} alt="Wallpaper" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold mb-4">Theme</h3>
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 mb-6">
                                <div className="flex items-center gap-3">
                                    <Moon className="w-5 h-5" />
                                    <Label>Dark Mode</Label>
                                </div>
                                <Switch checked={darkMode} onCheckedChange={toggleDarkMode} disabled />
                            </div>

                            <h4 className="text-sm font-medium mb-3 text-white/60">Accent Color</h4>
                            <div className="flex gap-3">
                                {ACCENT_COLORS.map((color) => (
                                    <button
                                        key={color.value}
                                        onClick={() => setAccentColor(color.value)}
                                        className={`w-10 h-10 rounded-full border-2 transition-all ${accentColor === color.value ? 'border-white scale-110' : 'border-transparent hover:scale-105'
                                            }`}
                                        style={{ backgroundColor: color.value }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>
                );
            case 'account':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#FF006E] to-[#00F5FF] flex items-center justify-center text-3xl font-bold">
                                U
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">User</h2>
                                <p className="text-white/60">Administrator</p>
                                <p className="text-sm text-white/40 mt-1">user@webos.nova</p>
                            </div>
                        </div>
                    </div>
                );
            case 'system':
                return (
                    <div className="space-y-6">
                        <div className="p-6 bg-white/5 rounded-xl border border-white/10 space-y-4">
                            <div className="flex justify-between py-2 border-b border-white/10">
                                <span className="text-white/60">OS Version</span>
                                <span>NovaOS 1.0.0</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-white/10">
                                <span className="text-white/60">Build</span>
                                <span>2024.12.04</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-white/10">
                                <span className="text-white/60">Browser</span>
                                <span>Chrome 120</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-white/60">Memory</span>
                                <span>16 GB</span>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="h-full flex bg-[#0A0A0A] text-white">
            {/* Sidebar */}
            <div className="w-64 bg-white/5 border-r border-white/10 flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF006E] to-[#00F5FF] bg-clip-text text-transparent">
                        Settings
                    </h1>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    <Button
                        variant={activeTab === 'personalization' ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setActiveTab('personalization')}
                    >
                        <Palette className="w-4 h-4 mr-2" />
                        Personalization
                    </Button>
                    <Button
                        variant={activeTab === 'account' ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setActiveTab('account')}
                    >
                        <User className="w-4 h-4 mr-2" />
                        Account
                    </Button>
                    <Button
                        variant={activeTab === 'system' ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setActiveTab('system')}
                    >
                        <Monitor className="w-4 h-4 mr-2" />
                        System
                    </Button>
                </nav>
            </div>

            {/* Content */}
            <ScrollArea className="flex-1">
                <div className="p-8 max-w-3xl mx-auto">
                    {renderContent()}
                </div>
            </ScrollArea>
        </div>
    );
}
