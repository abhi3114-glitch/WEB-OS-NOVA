import { Camera, Monitor, Square, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';

export default function ScreenshotApp() {
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const captureScreen = async () => {
        try {
            setIsCapturing(true);
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { mediaSource: 'screen' as any }
            });

            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();

            video.onloadedmetadata = () => {
                const canvas = canvasRef.current;
                if (!canvas) return;

                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                ctx.drawImage(video, 0, 0);
                const imageUrl = canvas.toDataURL('image/png');
                setCapturedImage(imageUrl);

                stream.getTracks().forEach(track => track.stop());
                setIsCapturing(false);
            };
        } catch (err) {
            console.error('Error capturing screen:', err);
            setIsCapturing(false);
            alert('Screen capture cancelled or denied.');
        }
    };

    const downloadScreenshot = () => {
        if (capturedImage) {
            const link = document.createElement('a');
            link.href = capturedImage;
            link.download = `screenshot-${Date.now()}.png`;
            link.click();
        }
    };

    const newCapture = () => {
        setCapturedImage(null);
    };

    return (
        <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
            <canvas ref={canvasRef} className="hidden" />

            {capturedImage ? (
                <div className="flex flex-col items-center w-full h-full">
                    <div className="flex-1 flex items-center justify-center w-full p-4">
                        <img
                            src={capturedImage}
                            alt="Screenshot"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                        />
                    </div>
                    <div className="flex gap-4 mt-4">
                        <Button onClick={newCapture} variant="outline" className="text-white border-white hover:bg-white/10">
                            New Capture
                        </Button>
                        <Button onClick={downloadScreenshot} className="bg-[#00F5FF] hover:bg-[#00F5FF]/90">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                    <Camera className="w-20 h-20 mb-8 opacity-50" />

                    <h2 className="text-3xl font-bold mb-4">Screenshot Tool</h2>
                    <p className="text-gray-400 mb-8 text-center max-w-md">
                        Capture your screen with one click. You'll be able to select which screen or window to capture.
                    </p>

                    <div className="grid grid-cols-1 gap-4 max-w-md w-full">
                        <button
                            onClick={captureScreen}
                            disabled={isCapturing}
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-8 rounded-xl flex flex-col items-center gap-4 transition-all disabled:opacity-50"
                        >
                            <Monitor className="w-12 h-12" />
                            <div>
                                <div className="font-bold text-lg">
                                    {isCapturing ? 'Capturing...' : 'Capture Screen'}
                                </div>
                                <div className="text-sm text-gray-400">
                                    {isCapturing ? 'Select a screen or window' : 'Click to start capturing'}
                                </div>
                            </div>
                        </button>
                    </div>

                    <div className="mt-12 text-sm text-gray-500">
                        Keyboard shortcut: <kbd className="bg-white/10 px-2 py-1 rounded">Ctrl + Shift + S</kbd>
                    </div>
                </>
            )}
        </div>
    );
}
