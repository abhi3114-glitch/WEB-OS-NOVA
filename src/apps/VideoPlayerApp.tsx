import { Play, Pause, Volume2, Maximize, SkipBack, SkipForward } from 'lucide-react';
import { useState } from 'react';

export default function VideoPlayerApp() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const duration = 300;

    return (
        <div className="h-full flex flex-col bg-black">
            {/* Video Placeholder */}
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                <div className="text-center">
                    <Play className="w-32 h-32 text-white/20 mx-auto mb-4" />
                    <p className="text-white/60">No video loaded</p>
                    <button className="mt-4 px-6 py-2 bg-[#FF006E] hover:bg-[#FF006E]/90 text-white rounded-lg">
                        Open Video File
                    </button>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-gradient-to-t from-black/90 to-transparent p-6">
                {/* Progress bar */}
                <div className="mb-4">
                    <div className="bg-gray-700 h-1 rounded-full cursor-pointer">
                        <div className="bg-[#FF006E] h-1 rounded-full" style={{ width: `${(currentTime / duration) * 100}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
                        <span>{Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}</span>
                    </div>
                </div>

                {/* Control buttons */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button className="text-white hover:text-[#FF006E]">
                            <SkipBack className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-12 h-12 flex items-center justify-center bg-[#FF006E] hover:bg-[#FF006E]/90 rounded-full"
                        >
                            {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-1" />}
                        </button>
                        <button className="text-white hover:text-[#FF006E]">
                            <SkipForward className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="text-white hover:text-[#FF006E]">
                            <Volume2 className="w-5 h-5" />
                        </button>
                        <button className="text-white hover:text-[#FF006E]">
                            <Maximize className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
