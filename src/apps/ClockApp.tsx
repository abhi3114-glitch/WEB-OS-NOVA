import { Plus, Bell, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function ClockApp() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const alarms = [
        { time: '7:00 AM', label: 'Wake up', active: true },
        { time: '12:00 PM', label: 'Lunch', active: false },
    ];

    const worldClocks = [
        { city: 'New York', time: '10:30 AM', offset: '-5' },
        { city: 'London', time: '3:30 PM', offset: '+0' },
        { city: 'Tokyo', time: '11:30 PM', offset: '+9' },
    ];

    return (
        <div className="h-full bg-gradient-to-br from-gray-900 to-black text-white p-8">
            {/* Main Clock */}
            <div className="text-center mb-12">
                <div className="text-8xl font-bold mb-2">
                    {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="text-2xl opacity-60">
                    {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Alarms */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Bell className="w-5 h-5" />
                            <h3 className="text-xl font-bold">Alarms</h3>
                        </div>
                        <Button size="sm" className="bg-[#FF006E] hover:bg-[#FF006E]/90">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="space-y-3">
                        {alarms.map((alarm, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                <div>
                                    <div className="text-2xl font-bold">{alarm.time}</div>
                                    <div className="text-sm opacity-60">{alarm.label}</div>
                                </div>
                                <input type="checkbox" checked={alarm.active} className="w-5 h-5" readOnly />
                            </div>
                        ))}
                    </div>
                </div>

                {/* World Clocks */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Globe className="w-5 h-5" />
                            <h3 className="text-xl font-bold">World Clock</h3>
                        </div>
                        <Button size="sm" className="bg-[#FF006E] hover:bg-[#FF006E]/90">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="space-y-3">
                        {worldClocks.map((clock, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                <div>
                                    <div className="font-semibold">{clock.city}</div>
                                    <div className="text-sm opacity-60">UTC {clock.offset}</div>
                                </div>
                                <div className="text-2xl font-bold">{clock.time}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
