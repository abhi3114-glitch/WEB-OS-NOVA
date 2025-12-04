import { Cloud, CloudRain, Sun, Wind, Droplets, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface WeatherData {
    temp: number;
    feelsLike: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    location: string;
    icon: any;
}

export default function WeatherFullApp() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadDemoWeather();
    }, []);

    const loadDemoWeather = () => {
        setWeather({
            temp: 22,
            feelsLike: 24,
            condition: 'Partly Cloudy',
            humidity: 65,
            windSpeed: 12,
            location: 'Demo Location',
            icon: Cloud
        });
        setError(null);
    };

    const getWeather = async () => {
        try {
            setLoading(true);
            setError(null);

            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    timeout: 10000,
                    enableHighAccuracy: false
                });
            });

            const { latitude, longitude } = position.coords;
            const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

            if (!API_KEY) {
                throw new Error('API key not configured');
            }

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
            );

            if (!response.ok) {
                throw new Error('Weather data unavailable');
            }

            const data = await response.json();

            const getWeatherIcon = (condition: string) => {
                switch (condition.toLowerCase()) {
                    case 'clear':
                        return Sun;
                    case 'clouds':
                        return Cloud;
                    case 'rain':
                    case 'drizzle':
                        return CloudRain;
                    default:
                        return Cloud;
                }
            };

            setWeather({
                temp: Math.round(data.main.temp),
                feelsLike: Math.round(data.main.feels_like),
                condition: data.weather[0].main,
                humidity: data.main.humidity,
                windSpeed: Math.round(data.wind.speed * 3.6),
                location: data.name,
                icon: getWeatherIcon(data.weather[0].main)
            });
            setLoading(false);
        } catch (err: any) {
            console.error('Weather error:', err);
            setError('Could not fetch weather data. Showing demo data.');
            loadDemoWeather();
            setLoading(false);
        }
    };

    const forecast = [
        { day: 'Mon', high: 24, low: 18, icon: Sun },
        { day: 'Tue', high: 22, low: 16, icon: Cloud },
        { day: 'Wed', high: 20, low: 15, icon: CloudRain },
        { day: 'Thu', high: 21, low: 16, icon: Cloud },
        { day: 'Fri', high: 23, low: 17, icon: Sun },
    ];

    if (!weather) {
        return (
            <div className="h-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
                <div className="text-center text-white">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
                    <p>Loading weather...</p>
                </div>
            </div>
        );
    }

    const WeatherIcon = weather.icon;

    return (
        <div className="h-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-8 overflow-y-auto">
            {error && (
                <div className="max-w-4xl mx-auto mb-4 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-3 text-white text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}

            <div className="max-w-4xl mx-auto">
                <div className="text-white mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-xl opacity-90">
                            <MapPin className="w-5 h-5" />
                            <span>{weather.location}</span>
                        </div>
                        <Button
                            onClick={getWeather}
                            disabled={loading}
                            className="bg-white/20 hover:bg-white/30 text-white"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <MapPin className="w-4 h-4 mr-2" />}
                            Get Live Weather
                        </Button>
                    </div>
                    <div className="flex items-center gap-8 mb-6">
                        <div>
                            <div className="text-8xl font-bold">{weather.temp}°C</div>
                            <div className="text-xl opacity-80">Feels like {weather.feelsLike}°C</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <WeatherIcon className="w-24 h-24" />
                            <span className="text-2xl mt-2">{weather.condition}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-white">
                        <Wind className="w-8 h-8 mb-3" />
                        <div className="text-3xl font-bold">{weather.windSpeed} km/h</div>
                        <div className="text-sm opacity-80 mt-1">Wind Speed</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-white">
                        <Droplets className="w-8 h-8 mb-3" />
                        <div className="text-3xl font-bold">{weather.humidity}%</div>
                        <div className="text-sm opacity-80 mt-1">Humidity</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-white">
                        <Sun className="w-8 h-8 mb-3" />
                        <div className="text-3xl font-bold">UV 6</div>
                        <div className="text-sm opacity-80 mt-1">UV Index</div>
                    </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-white text-xl font-bold mb-4">5-Day Forecast</h3>
                    <div className="grid grid-cols-5 gap-4">
                        {forecast.map((item, i) => (
                            <div key={i} className="text-center text-white bg-white/10 rounded-lg p-4">
                                <div className="font-semibold mb-2">{item.day}</div>
                                <item.icon className="w-10 h-10 mx-auto mb-2" />
                                <div className="text-sm">
                                    <span className="font-bold">{item.high}°</span>
                                    <span className="opacity-60"> / {item.low}°</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 text-center text-white/60 text-sm">
                    <p>🌐 Live weather data powered by OpenWeatherMap</p>
                </div>
            </div>
        </div>
    );
}
