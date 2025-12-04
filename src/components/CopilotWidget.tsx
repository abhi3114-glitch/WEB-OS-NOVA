import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, X, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface CopilotWidgetProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CopilotWidget({ isOpen, onClose }: CopilotWidgetProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hi! I'm Nova Copilot powered by Llama 3.3 70B. How can I help you today?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

            if (!API_KEY) {
                throw new Error('Groq API key not configured');
            }

            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [
                        {
                            role: 'user',
                            content: currentInput,
                        },
                    ],
                    temperature: 0.7,
                    max_tokens: 1024,
                }),
            });

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error('RATE_LIMIT');
                }
                throw new Error('Failed to get response from Groq');
            }

            const data = await response.json();
            const aiResponse = data.choices[0]?.message?.content || "I couldn't generate a response.";

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: aiResponse,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error: any) {
            console.error('Copilot error:', error);

            let errorText = "Sorry, I encountered an error. Please try again.";

            if (error.message === 'RATE_LIMIT') {
                errorText = "⏱️ Rate limit reached. Please wait a minute and try again.";
            } else if (error.message === 'Groq API key not configured') {
                errorText = "🔑 API key not configured. Please add VITE_GROQ_API_KEY to your .env file.";
            }

            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: errorText,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 300 }}
                    className="fixed right-4 bottom-20 w-96 h-[600px] bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-[#FF006E]/10 to-[#00F5FF]/10">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-[#FF006E] to-[#00F5FF]">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Nova Copilot</h3>
                                <p className="text-xs text-white/60 flex items-center gap-1">
                                    <Sparkles className="w-3 h-3 text-[#00F5FF]" />
                                    Llama 3.3 70B
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="text-white/60 hover:text-white hover:bg-white/10"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl ${message.role === 'user'
                                                ? 'bg-[#FF006E] text-white rounded-tr-none'
                                                : 'bg-white/10 text-white rounded-tl-none'
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                        <span className="text-[10px] opacity-50 mt-1 block">
                                            {message.timestamp.toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" />
                                            <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce delay-75" />
                                            <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce delay-150" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>
                    </ScrollArea>

                    {/* Input */}
                    <div className="p-4 border-t border-white/10 bg-white/5">
                        <div className="flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask anything..."
                                className="bg-black/20 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-[#00F5FF]"
                            />
                            <Button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="bg-gradient-to-r from-[#FF006E] to-[#00F5FF] text-white"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
