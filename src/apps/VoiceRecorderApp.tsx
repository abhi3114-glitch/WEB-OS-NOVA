import { Mic, Square, Play, Download, Trash2, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';

interface Recording {
    id: number;
    name: string;
    url: string;
    duration: string;
    date: string;
}

export default function VoiceRecorderApp() {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [recordings, setRecordings] = useState<Recording[]>([]);
    const [playingId, setPlayingId] = useState<number | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);
                const recording: Recording = {
                    id: Date.now(),
                    name: `Recording ${recordings.length + 1}`,
                    url,
                    duration: formatTime(recordingTime),
                    date: new Date().toLocaleString()
                };
                setRecordings([recording, ...recordings]);
                setRecordingTime(0);

                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            setIsPaused(false);

            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        } catch (err) {
            console.error('Error accessing microphone:', err);
            alert('Microphone access denied. Please allow microphone permissions.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setIsPaused(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };

    const pauseRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            if (isPaused) {
                mediaRecorderRef.current.resume();
                timerRef.current = setInterval(() => {
                    setRecordingTime(prev => prev + 1);
                }, 1000);
            } else {
                mediaRecorderRef.current.pause();
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
            }
            setIsPaused(!isPaused);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const playRecording = (id: number, url: string) => {
        if (playingId === id) {
            audioRef.current?.pause();
            setPlayingId(null);
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            const audio = new Audio(url);
            audioRef.current = audio;
            audio.play();
            setPlayingId(id);
            audio.onended = () => setPlayingId(null);
        }
    };

    const downloadRecording = (url: string, name: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = `${name}.webm`;
        link.click();
    };

    const deleteRecording = (id: number) => {
        setRecordings(recordings.filter(r => r.id !== id));
        if (playingId === id) {
            audioRef.current?.pause();
            setPlayingId(null);
        }
    };

    return (
        <div className="h-full flex flex-col bg-gradient-to-br from-purple-900 to-pink-900 text-white">
            {/* Recording Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-8 ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-white/20'}`}>
                    <Mic className="w-16 h-16" />
                </div>

                <div className="text-6xl font-bold mb-2">
                    {formatTime(recordingTime)}
                </div>
                <div className="text-xl opacity-60 mb-8">
                    {isRecording ? (isPaused ? 'Paused' : 'Recording...') : 'Ready to record'}
                </div>

                <div className="flex gap-4">
                    {!isRecording ? (
                        <Button
                            onClick={startRecording}
                            className="w-16 h-16 rounded-full bg-[#FF006E] hover:bg-[#FF006E]/90"
                        >
                            <Mic className="w-6 h-6" />
                        </Button>
                    ) : (
                        <>
                            <Button
                                onClick={pauseRecording}
                                className="w-16 h-16 rounded-full bg-yellow-500 hover:bg-yellow-600"
                            >
                                <Pause className="w-6 h-6" />
                            </Button>
                            <Button
                                onClick={stopRecording}
                                className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600"
                            >
                                <Square className="w-6 h-6" />
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {/* Recordings List */}
            <div className="bg-black/30 backdrop-blur-sm border-t border-white/10 p-6 max-h-64 overflow-y-auto">
                <h3 className="text-lg font-bold mb-4">Recordings ({recordings.length})</h3>
                {recordings.length === 0 ? (
                    <p className="text-white/60 text-center py-8">No recordings yet</p>
                ) : (
                    <div className="space-y-2">
                        {recordings.map(rec => (
                            <div key={rec.id} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="text-white"
                                        onClick={() => playRecording(rec.id, rec.url)}
                                    >
                                        {playingId === rec.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                    </Button>
                                    <div>
                                        <div className="font-semibold">{rec.name}</div>
                                        <div className="text-sm opacity-60">{rec.duration} • {rec.date}</div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="text-white"
                                        onClick={() => downloadRecording(rec.url, rec.name)}
                                    >
                                        <Download className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="text-white"
                                        onClick={() => deleteRecording(rec.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
