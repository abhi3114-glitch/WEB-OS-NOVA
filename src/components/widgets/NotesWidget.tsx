import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NotesWidget() {
    const [note, setNote] = useState('');
    const [savedNotes, setSavedNotes] = useState<string[]>(['Buy groceries', 'Meeting at 3 PM']);

    const handleSave = () => {
        if (note.trim()) {
            setSavedNotes([note, ...savedNotes]);
            setNote('');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl w-[320px]"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">Quick Notes</h3>
                <div className="w-2 h-2 rounded-full bg-[#FF006E]" />
            </div>

            <div className="flex gap-2 mb-4">
                <Input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a note..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    onKeyPress={(e) => e.key === 'Enter' && handleSave()}
                />
                <Button size="icon" onClick={handleSave} className="bg-[#FF006E] hover:bg-[#FF006E]/80">
                    <Plus className="w-4 h-4" />
                </Button>
            </div>

            <div className="space-y-2 max-h-[150px] overflow-y-auto">
                {savedNotes.map((n, i) => (
                    <div key={i} className="bg-white/5 p-3 rounded-lg text-sm text-white/80 border-l-2 border-[#00F5FF]">
                        {n}
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
