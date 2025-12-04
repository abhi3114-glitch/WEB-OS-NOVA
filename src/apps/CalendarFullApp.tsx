import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useState } from 'react';

export default function CalendarApp() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const events = [
        { time: '10:00 AM', title: 'Team Meeting', color: 'bg-blue-500' },
        { time: '2:00 PM', title: 'Project Review', color: 'bg-purple-500' },
        { time: '4:30 PM', title: 'Client Call', color: 'bg-green-500' },
    ];

    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    return (
        <div className="h-full flex bg-white">
            {/* Sidebar */}
            <div className="w-80 bg-gray-50 border-r p-6">
                <Button className="w-full bg-[#FF006E] hover:bg-[#FF006E]/90 mb-6">
                    <Plus className="w-4 h-4 mr-2" />
                    New Event
                </Button>

                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
                        <div className="flex gap-1">
                            <button className="p-1 hover:bg-gray-100 rounded">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs">
                        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                            <div key={day} className="text-gray-500 font-medium">{day}</div>
                        ))}
                        {Array.from({ length: 35 }, (_, i) => (
                            <div key={i} className="aspect-square flex items-center justify-center hover:bg-blue-100 rounded cursor-pointer">
                                {i >= 2 && i < 33 ? i - 1 : ''}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <h4 className="font-semibold mb-3">Today's Events</h4>
                    {events.map((event, i) => (
                        <div key={i} className="flex items-start gap-3 mb-3">
                            <div className={`w-1 h-12 ${event.color} rounded-full`} />
                            <div>
                                <div className="font-medium">{event.title}</div>
                                <div className="text-sm text-gray-500">{event.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Calendar */}
            <div className="flex-1 p-6">
                <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-xl overflow-hidden h-full">
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                        <div key={day} className="bg-white p-4">
                            <div className="font-semibold text-sm mb-2">{day}</div>
                            <div className="space-y-2">
                                {day === 'Monday' && (
                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-2 rounded text-xs">
                                        <div className="font-medium">Team Meeting</div>
                                        <div className="text-gray-600">10:00 AM</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
