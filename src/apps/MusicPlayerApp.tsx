import { Music2 } from 'lucide-react';

export default function MusicPlayerApp() {
    return (
        <div className="h-full flex flex-col bg-black">
            {/* Spotify Embed */}
            <div className="flex-1">
                <iframe
                    src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title="Spotify Player"
                />
            </div>

            {/* Spotify Branding Bar */}
            <div className="bg-[#1DB954] px-4 py-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3 text-white font-semibold">
                    <Music2 className="w-5 h-5" />
                    <span>Spotify</span>
                </div>
                <div className="text-white/80 text-xs">
                    Listening on Web Player
                </div>
            </div>
        </div>
    );
}
