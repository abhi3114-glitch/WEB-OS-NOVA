import { Cpu, HardDrive, Activity, Zap } from 'lucide-react';

export default function SystemMonitorApp() {
    const stats = {
        cpu: 45,
        memory: 62,
        disk: 38,
        network: 28,
    };

    return (
        <div className="h-full bg-gradient-to-br from-gray-900 to-black text-white p-8 overflow-y-auto">
            <h2 className="text-3xl font-bold mb-8">System Monitor</h2>

            <div className="grid grid-cols-2 gap-6 mb-8">
                {/* CPU */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Cpu className="w-6 h-6 text-blue-400" />
                            <h3 className="text-xl font-bold">CPU Usage</h3>
                        </div>
                        <span className="text-3xl font-bold">{stats.cpu}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                        <div
                            className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all"
                            style={{ width: `${stats.cpu}%` }}
                        />
                    </div>
                </div>

                {/* Memory */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <HardDrive className="w-6 h-6 text-green-400" />
                            <h3 className="text-xl font-bold">Memory</h3>
                        </div>
                        <span className="text-3xl font-bold">{stats.memory}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                        <div
                            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all"
                            style={{ width: `${stats.memory}%` }}
                        />
                    </div>
                </div>

                {/* Disk */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Activity className="w-6 h-6 text-purple-400" />
                            <h3 className="text-xl font-bold">Disk Usage</h3>
                        </div>
                        <span className="text-3xl font-bold">{stats.disk}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                        <div
                            className="bg-gradient-to-r from-purple-400 to-purple-600 h-3 rounded-full transition-all"
                            style={{ width: `${stats.disk}%` }}
                        />
                    </div>
                </div>

                {/* Network */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Zap className="w-6 h-6 text-yellow-400" />
                            <h3 className="text-xl font-bold">Network</h3>
                        </div>
                        <span className="text-3xl font-bold">{stats.network}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                        <div
                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all"
                            style={{ width: `${stats.network}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Processes */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Top Processes</h3>
                <div className="space-y-3">
                    {['Chrome', 'VS Code', 'Terminal', 'File Explorer'].map((process, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <span>{process}</span>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-400">{Math.floor(Math.random() * 1000)} MB</span>
                                <span className="text-sm text-gray-400">{Math.floor(Math.random() * 50)}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
