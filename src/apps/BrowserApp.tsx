import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, RotateCw, Search, ExternalLink } from 'lucide-react';

export default function BrowserApp() {
    const [url, setUrl] = useState('https://www.google.com/webhp?igu=1');
    const [inputUrl, setInputUrl] = useState('https://www.google.com/webhp?igu=1');
    const [isLoading, setIsLoading] = useState(false);

    const handleNavigate = (e?: React.FormEvent) => {
        e?.preventDefault();
        let target = inputUrl;

        // Handle search query vs URL
        if (!target.includes('.') || target.includes(' ')) {
            target = `https://www.google.com/search?q=${encodeURIComponent(target)}&igu=1`;
            setUrl(target);
            setInputUrl(target);
            setIsLoading(true);
            return;
        } else if (!target.startsWith('http')) {
            target = `https://${target}`;
        }

        // Smart URL Rewrites
        if (target.includes('youtube.com/watch?v=') || target.includes('youtu.be/')) {
            const videoId = target.split('v=')[1]?.split('&')[0] || target.split('youtu.be/')[1]?.split('?')[0];
            if (videoId) {
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                setUrl(embedUrl);
                setInputUrl(target);
                setIsLoading(true);
                return;
            }
        }

        // Direct load for Google with igu=1
        if (target.includes('google.com')) {
            if (!target.includes('igu=1')) {
                target += (target.includes('?') ? '&' : '?') + 'igu=1';
            }
            setUrl(target);
            setInputUrl(target);
            setIsLoading(true);
            return;
        }

        // Apply Proxy for everything else
        // Using allorigins.win as it is more reliable for embedding than corsproxy.io
        const proxiedUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(target)}`;

        setUrl(proxiedUrl);
        setInputUrl(target); // Keep input clean
        setIsLoading(true);
    };

    const openInNewTab = () => {
        window.open(url, '_blank');
    };

    const handleRefresh = () => {
        setIsLoading(true);
        const currentUrl = url;
        setUrl('');
        setTimeout(() => setUrl(currentUrl), 10);
    };

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Toolbar */}
            <div className="flex items-center gap-2 p-2 bg-[#F3F4F6] border-b border-gray-200">
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:bg-gray-200">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:bg-gray-200">
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleRefresh}
                        className="h-8 w-8 text-gray-600 hover:bg-gray-200"
                    >
                        <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </Button>
                </div>

                <form onSubmit={handleNavigate} className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            value={inputUrl}
                            onChange={(e) => setInputUrl(e.target.value)}
                            placeholder="Search Google or watch YouTube videos"
                            className="pl-9 h-9 bg-white border-gray-300 text-sm text-gray-900 focus-visible:ring-blue-500 rounded-full"
                        />
                    </div>
                </form>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={openInNewTab}
                    className="text-gray-600 hover:bg-gray-200 text-xs gap-1"
                >
                    <ExternalLink className="w-3 h-3" />
                    Open
                </Button>
            </div>

            {/* Info Banner */}
            <div className="bg-blue-50 px-4 py-2 text-xs text-blue-800 border-b border-blue-100">
                <strong>Note:</strong> Most websites block embedding. Google Search and YouTube videos work best. Use "Open" button for other sites.
            </div>

            {/* Content */}
            <div className="flex-1 relative bg-white overflow-hidden">
                {url ? (
                    <iframe
                        src={url}
                        className="w-full h-full border-none"
                        onLoad={() => setIsLoading(false)}
                        title="Browser"
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                )}
            </div>
        </div>
    );
}
