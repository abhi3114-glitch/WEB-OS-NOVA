import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSettingsStore } from '@/stores/settingsStore';

interface LockScreenProps {
    onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [time, setTime] = useState(new Date());
    const { wallpaper } = useSettingsStore();

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleUnlock = () => {
        if (password === '1234' || password === '') {
            onUnlock();
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ y: -1000, opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center text-white overflow-hidden"
            style={{
                backgroundImage: `url(${wallpaper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            <div className="relative z-10 flex flex-col items-center gap-8">
                <div className="text-center">
                    <h1 className="text-8xl font-thin tracking-tighter">
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </h1>
                    <p className="text-2xl font-light mt-2">
                        {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                <div className="flex flex-col items-center gap-4 mt-12">
                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
                        <img
                            src="/assets/profile.png"
                            alt="Abhi"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="text-xl font-medium">Abhi</h2>

                    <div className="flex gap-2 w-64">
                        <motion.div
                            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                            className="relative flex-1"
                        >
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-center"
                            />
                        </motion.div>
                        <Button
                            size="icon"
                            onClick={handleUnlock}
                            className="bg-white/10 hover:bg-white/20 text-white"
                        >
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>

                    <p className="text-xs text-white/40 mt-2">Hint: Press Enter (or use '1234')</p>
                </div>
            </div>
        </motion.div>
    );
}
