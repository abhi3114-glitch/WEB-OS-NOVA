import { FileText, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function PDFViewerApp() {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            const fileURL = URL.createObjectURL(file);
            setPdfUrl(fileURL);
        } else {
            alert('Please select a valid PDF file');
        }
    };

    return (
        <div className="h-full flex flex-col bg-gray-100">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-white border-b">
                <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    <span className="font-semibold">PDF Viewer</span>
                </div>

                <label className="cursor-pointer">
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                    <Button className="bg-[#FF006E] hover:bg-[#FF006E]/90">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload PDF
                    </Button>
                </label>
            </div>

            {/* PDF Display */}
            <div className="flex-1 overflow-auto bg-gray-200 flex items-center justify-center">
                {pdfUrl ? (
                    <iframe
                        src={pdfUrl}
                        className="w-full h-full border-none"
                        title="PDF Viewer"
                    />
                ) : (
                    <div className="text-center bg-white rounded-xl shadow-lg p-12 max-w-md">
                        <FileText className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">No PDF Loaded</h3>
                        <p className="text-gray-600 mb-6">Select a PDF file to view</p>
                        <label className="cursor-pointer">
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                            <Button className="bg-[#FF006E] hover:bg-[#FF006E]/90">
                                <FileText className="w-4 h-4 mr-2" />
                                Open PDF File
                            </Button>
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
}
