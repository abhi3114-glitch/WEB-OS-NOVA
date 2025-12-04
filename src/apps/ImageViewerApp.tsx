import { useState, useEffect } from 'react';
import { useFileSystemStore } from '@/stores/fileSystemStore';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Maximize, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { FileItem } from '@/utils/db';

export default function ImageViewerApp() {
    const { currentFolderId, getFiles } = useFileSystemStore();
    const [images, setImages] = useState<FileItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        loadImages();
    }, [currentFolderId]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                handleNext();
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentIndex, images.length]);

    const loadImages = async () => {
        const files = await getFiles(currentFolderId);
        const imageFiles = files.filter((file) => {
            const ext = file.name.split('.').pop()?.toLowerCase();
            return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '');
        });
        setImages(imageFiles);
        if (imageFiles.length > 0) {
            setCurrentIndex(0);
        }
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setZoom(1);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setZoom(1);
    };

    const currentImage = images[currentIndex];

    if (images.length === 0) {
        return (
            <div className="h-full flex items-center justify-center bg-[#0A0A0A] text-white/40">
                <p>No images found in current folder</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-[#0A0A0A] text-white">
            {/* Toolbar */}
            <div className="flex items-center justify-center gap-4 p-4 border-b border-white/10 z-10 bg-[#0A0A0A]/90 backdrop-blur">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setZoom((z) => Math.max(0.1, z - 0.1))}
                    className="text-white hover:bg-white/10"
                >
                    <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-xs w-12 text-center">{Math.round(zoom * 100)}%</span>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setZoom((z) => Math.min(3, z + 0.1))}
                    className="text-white hover:bg-white/10"
                >
                    <ZoomIn className="w-4 h-4" />
                </Button>
                <div className="h-6 w-px bg-white/10 mx-2" />
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setZoom(1)}
                    className="text-white hover:bg-white/10"
                >
                    <Maximize className="w-4 h-4" />
                </Button>
                <div className="h-6 w-px bg-white/10 mx-2" />
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePrev}
                    className="text-white hover:bg-white/10"
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-xs">
                    {currentIndex + 1} / {images.length}
                </span>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNext}
                    className="text-white hover:bg-white/10"
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
                <div className="h-6 w-px bg-white/10 mx-2" />
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`text-white hover:bg-white/10 ${isPlaying ? 'text-[#FF006E]' : ''}`}
                >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
            </div>

            {/* Image Area */}
            <div className="flex-1 overflow-hidden flex items-center justify-center relative">
                {currentImage && (
                    <div
                        className="transition-transform duration-200 ease-out"
                        style={{ transform: `scale(${zoom})` }}
                    >
                        <img
                            src={currentImage.content || currentImage.name} // Fallback to name if content is empty (e.g. for external images if we supported them)
                            alt={currentImage.name}
                            className="max-w-full max-h-full object-contain shadow-2xl"
                        />
                    </div>
                )}

                {/* Info Overlay */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur rounded-full text-xs text-white/80">
                    {currentImage?.name}
                </div>
            </div>
        </div>
    );
}
