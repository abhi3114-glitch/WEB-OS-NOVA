import { Pencil, Eraser, Circle, Square, Download, Palette, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useState, useEffect } from 'react';

type Tool = 'pencil' | 'eraser' | 'circle' | 'square';

export default function PaintApp() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [tool, setTool] = useState<Tool>('pencil');
    const [color, setColor] = useState('#000000');
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineWidth, setLineWidth] = useState(3);

    const colors = ['#000000', '#FF006E', '#00F5FF', '#FFD700', '#00FF00', '#FF0000', '#0000FF', '#FFFFFF'];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        setIsDrawing(true);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.strokeStyle = tool === 'eraser' ? 'white' : color;
        ctx.lineWidth = tool === 'eraser' ? 20 : lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (tool === 'pencil' || tool === 'eraser') {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const downloadImage = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement('a');
        link.download = `drawing-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
    };

    return (
        <div className="h-full flex flex-col bg-gray-100">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-white border-b">
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        variant={tool === 'pencil' ? 'default' : 'ghost'}
                        onClick={() => setTool('pencil')}
                    >
                        <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                        size="sm"
                        variant={tool === 'eraser' ? 'default' : 'ghost'}
                        onClick={() => setTool('eraser')}
                    >
                        <Eraser className="w-4 h-4" />
                    </Button>

                    <div className="w-px h-6 bg-gray-300 mx-2" />

                    <input
                        type="range"
                        min="1"
                        max="20"
                        value={lineWidth}
                        onChange={(e) => setLineWidth(Number(e.target.value))}
                        className="w-24"
                    />
                    <span className="text-sm text-gray-600">{lineWidth}px</span>
                </div>

                <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    {colors.map(c => (
                        <button
                            key={c}
                            onClick={() => setColor(c)}
                            className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-blue-500 scale-110' : 'border-gray-300'} transition-transform`}
                            style={{ backgroundColor: c }}
                        />
                    ))}

                    <div className="w-px h-6 bg-gray-300 mx-2" />

                    <Button size="sm" variant="ghost" onClick={clearCanvas}>
                        <Trash2 className="w-4 h-4 mr-1" />
                        Clear
                    </Button>
                    <Button size="sm" className="bg-[#FF006E] hover:bg-[#FF006E]/90" onClick={downloadImage}>
                        <Download className="w-4 h-4 mr-1" />
                        Save
                    </Button>
                </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 flex items-center justify-center p-8 bg-gray-200">
                <canvas
                    ref={canvasRef}
                    width={1000}
                    height={600}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="bg-white border-2 border-gray-300 rounded-lg shadow-lg cursor-crosshair"
                />
            </div>
        </div>
    );
}
