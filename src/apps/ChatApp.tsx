import { Send, Smile, Paperclip, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function ChatApp() {
    const [message, setMessage] = useState('');

    const chats = [
        { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?', time: '2m ago', unread: 2 },
        { id: 2, name: 'Jane Smith', lastMessage: 'Meeting at 3pm', time: '1h ago', unread: 0 },
        { id: 3, name: 'Team Chat', lastMessage: 'Great work everyone!', time: '3h ago', unread: 5 },
    ];

    const messages = [
        { id: 1, text: 'Hey! How are you?', sent: false, time: '10:30 AM' },
        { id: 2, text: 'I\'m doing great! How about you?', sent: true, time: '10:31 AM' },
        { id: 3, text: 'Pretty good! Working on the new project', sent: false, time: '10:32 AM' },
    ];

    return (
        <div className="h-full flex bg-white">
            {/* Chats List */}
            <div className="w-80 bg-gray-50 border-r flex flex-col">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Messages</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {chats.map(chat => (
                        <div key={chat.id} className="p-4 border-b hover:bg-gray-100 cursor-pointer">
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF006E] to-[#00F5FF] flex items-center justify-center">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <span className="font-semibold">{chat.name}</span>
                                        <span className="text-xs text-gray-500">{chat.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                                </div>
                                {chat.unread > 0 && (
                                    <span className="bg-[#FF006E] text-white text-xs px-2 py-1 rounded-full">{chat.unread}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat */}
            <div className="flex-1 flex flex-col">
                <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF006E] to-[#00F5FF] flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="font-semibold">John Doe</div>
                            <div className="text-xs text-gray-500">Online</div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs px-4 py-2 rounded-2xl ${msg.sent ? 'bg-[#FF006E] text-white' : 'bg-gray-100'}`}>
                                <p>{msg.text}</p>
                                <span className={`text-xs ${msg.sent ? 'text-white/70' : 'text-gray-500'}`}>{msg.time}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t">
                    <div className="flex gap-2">
                        <Button size="icon" variant="ghost">
                            <Paperclip className="w-5 h-5" />
                        </Button>
                        <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1"
                        />
                        <Button size="icon" variant="ghost">
                            <Smile className="w-5 h-5" />
                        </Button>
                        <Button className="bg-[#FF006E] hover:bg-[#FF006E]/90">
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
