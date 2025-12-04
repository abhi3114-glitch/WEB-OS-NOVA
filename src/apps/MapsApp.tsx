import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Search, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapsApp() {
    const [searchQuery, setSearchQuery] = useState('');
    const [center, setCenter] = useState<[number, number]>([28.6139, 77.2090]); // New Delhi default
    const [map, setMap] = useState<any>(null);

    useEffect(() => {
        if (map) {
            map.setView(center, 13);
        }
    }, [center, map]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

    const getMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCenter([position.coords.latitude, position.coords.longitude]);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    alert('Could not get your location. Please allow location access.');
                }
            );
        }
    };

    return (
        <div className="h-full flex flex-col bg-gray-100">
            {/* Search Bar */}
            <div className="p-4 bg-white border-b z-10">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Search for a place..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button
                        type="button"
                        onClick={getMyLocation}
                        className="bg-[#FF006E] hover:bg-[#FF006E]/90"
                    >
                        <Navigation className="w-4 h-4 mr-2" />
                        My Location
                    </Button>
                </form>
            </div>

            {/* Map */}
            <div className="flex-1 relative">
                <MapContainer
                    center={center}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                    ref={setMap}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={center}>
                        <Popup>
                            <div className="text-center">
                                <MapPin className="w-5 h-5 mx-auto mb-1 text-[#FF006E]" />
                                <p className="font-semibold">Your Location</p>
                            </div>
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
}
