import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CalendarWidget() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const isToday = (day: number) => {
        const today = new Date();
        return day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl w-[320px]"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-lg">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={prevMonth} className="h-8 w-8 text-white hover:bg-white/10">
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={nextMonth} className="h-8 w-8 text-white hover:bg-white/10">
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {days.map(day => (
                    <div key={day} className="text-center text-xs font-medium text-white/40 py-1">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    return (
                        <div
                            key={day}
                            className={`
                                aspect-square flex items-center justify-center rounded-full text-sm cursor-pointer transition-colors
                                ${isToday(day)
                                    ? 'bg-[#FF006E] text-white font-bold shadow-[0_0_10px_rgba(255,0,110,0.5)]'
                                    : 'text-white hover:bg-white/10'
                                }
                            `}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}
