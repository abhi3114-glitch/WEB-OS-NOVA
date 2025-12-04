import { useState } from 'react';
import { Send, Inbox, Star, Trash2, Search, Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function EmailApp() {
    const [selectedEmail, setSelectedEmail] = useState<number | null>(null);

    const emails = [
        { id: 1, from: 'john@company.com', subject: 'Project Update', preview: 'Here is the latest update on the project...', time: '10:30 AM' },
        { id: 2, from: 'sarah@example.com', subject: 'Meeting Tomorrow', preview: 'Don\'t forget about our meeting tomorrow...', time: '9:15 AM' },
        { id: 3, from: 'team@webos.dev', subject: 'Welcome to WebOS', preview: 'Thank you for installing WebOS Nova...', time: 'Yesterday' },
    ];

    return (
        <div className="h-full flex bg-white">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 border-r flex flex-col">
                <div className="p-4">
                    <Button className="w-full bg-[#FF006E] hover:bg-[#FF006E]/90">
                        <Plus className="w-4 h-4 mr-2" />
                        Compose
                    </Button>
                </div>

                <nav className="flex-1 px-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-50 text-blue-600">
                        <Inbox className="w-4 h-4" />
                        Inbox
                        <span className="ml-auto bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">3</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 mt-1">
                        <Star className="w-4 h-4" />
                        Starred
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 mt-1">
                        <Send className="w-4 h-4" />
                        Sent
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 mt-1">
                        <Trash2 className="w-4 h-4" />
                        Trash
                    </button>
                </nav>
            </div>

            {/* Email List */}
            <div className="w-96 bg-white border-r flex flex-col">
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder="Search emails..." className="pl-10" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {emails.map((email) => (
                        <div
                            key={email.id}
                            onClick={() => setSelectedEmail(email.id)}
                            className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedEmail === email.id ? 'bg-blue-50' : ''
                                }`}
                        >
                            <div className="flex items-start justify-between mb-1">
                                <span className="font-semibold text-sm">{email.from}</span>
                                <span className="text-xs text-gray-500">{email.time}</span>
                            </div>
                            <div className="font-medium text-sm mb-1">{email.subject}</div>
                            <div className="text-sm text-gray-600 truncate">{email.preview}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Email Content */}
            <div className="flex-1 flex flex-col">
                {selectedEmail ? (
                    <>
                        <div className="p-6 border-b">
                            <h2 className="text-2xl font-bold mb-2">
                                {emails.find(e => e.id === selectedEmail)?.subject}
                            </h2>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF006E] to-[#00F5FF] flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-medium">{emails.find(e => e.id === selectedEmail)?.from}</div>
                                    <div className="text-sm text-gray-500">to me</div>
                                </div>
                                <div className="ml-auto text-sm text-gray-500">
                                    {emails.find(e => e.id === selectedEmail)?.time}
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto">
                            <p className="text-gray-700">
                                {emails.find(e => e.id === selectedEmail)?.preview}
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                        Select an email to read
                    </div>
                )}
            </div>
        </div>
    );
}
