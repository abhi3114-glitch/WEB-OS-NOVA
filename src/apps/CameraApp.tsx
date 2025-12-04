import { Button } from '@/components/ui/button';
import { Camera, Video, Download, Settings2, RotateCcw } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function CameraApp() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { width: 1280, height: 720 },
                audio: false
            });

            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                setStream(mediaStream);
                setIsStreaming(true);
                setError(null);
            }
        } catch (err) {
            console.error('Error accessing camera:', err);
            setError('Camera access denied. Please allow camera permissions.');
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            setIsStreaming(false);
        }
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const video = videoRef.current;

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(video, 0, 0);
                const imageUrl = canvas.toDataURL('image/png');
                setCapturedImage(imageUrl);
                stopCamera();
            }
        }
    };

    const downloadPhoto = () => {
        if (capturedImage) {
            const link = document.createElement('a');
            link.href = capturedImage;
            link.download = `photo-${Date.now()}.png`;
            link.click();
        }
    };

    const retake = () => {
        setCapturedImage(null);
        startCamera();
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    return (
        <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 to-black">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 py-4">
                <h2 className="text-white font-bold text-xl">Camera</h2>
                <button className="text-white p-2 hover:bg-white/10 rounded-lg">
                    <Settings2 className="w-5 h-5" />
                </button>
            </div>

            {/* Camera View */}
            <div className="flex-1 flex items-center justify-center p-6 relative">
                {error && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
                        {error}
                    </div>
                )}

                {capturedImage ? (
                    <img src={capturedImage} className="max-w-full max-h-full rounded-xl shadow-2xl" alt="Captured" />
                ) : isStreaming ? (
                    <>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="max-w-full max-h-full rounded-xl shadow-2xl"
                        />
                        <canvas ref={canvasRef} className="hidden" />
                    </>
                ) : (
                    <div className="text-center">
                        <Camera className="w-20 h-20 text-white/20 mx-auto mb-4" />
                        <p className="text-white/60 mb-2">Camera not started</p>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 pb-8">
                {!isStreaming && !capturedImage ? (
                    <Button onClick={startCamera} className="bg-[#FF006E] hover:bg-[#FF006E]/90 px-8 py-6 text-lg">
                        <Camera className="w-5 h-5 mr-2" />
                        Start Camera
                    </Button>
                ) : capturedImage ? (
                    <>
                        <Button onClick={retake} variant="outline" className="text-white border-white hover:bg-white/10">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Retake
                        </Button>
                        <Button onClick={downloadPhoto} className="bg-[#00F5FF] hover:bg-[#00F5FF]/90">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={capturePhoto} className="bg-white text-black hover:bg-gray-200 w-16 h-16 rounded-full">
                            <Camera className="w-6 h-6" />
                        </Button>
                        <Button onClick={stopCamera} variant="ghost" className="text-white">
                            Stop
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
