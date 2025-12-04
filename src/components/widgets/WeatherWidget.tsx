import { Cloud, CloudRain, Sun, Wind } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WeatherWidget() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl w-[320px]"
        >
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-white font-medium text-lg">San Francisco</h3>
                    <p className="text-white/60 text-sm">California, US</p>
                </div>
                <div className="bg-white/10 p-2 rounded-lg">
                    <Sun className="w-6 h-6 text-yellow-400" />
                </div>
            </div>

            <div className="flex items-end gap-2 mb-6">
                <span className="text-5xl font-bold text-white">72°</span>
                <span className="text-white/60 mb-2">Sunny</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center gap-1 bg-white/5 p-2 rounded-lg">
                    <Wind className="w-4 h-4 text-white/60" />
                    <span className="text-white text-xs">8 mph</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-white/5 p-2 rounded-lg">
                    <CloudRain className="w-4 h-4 text-white/60" />
                    <span className="text-white text-xs">0%</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-white/5 p-2 rounded-lg">
                    <Cloud className="w-4 h-4 text-white/60" />
                    <span className="text-white text-xs">12%</span>
                </div>
            </div>
        </motion.div>
    );
}
