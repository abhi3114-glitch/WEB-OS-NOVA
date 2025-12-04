import { useState } from 'react';
import { Play, Save, FileText, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CodeEditorApp() {
    const [code, setCode] = useState(
        `// Welcome to Code Editor
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`
    );

    return (
        <div className="h-full flex flex-col bg-[#1E1E1E]">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#2D2D2D] border-b border-gray-700">
                <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">script.js</span>
                    <span className="text-gray-500 text-xs">●</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" className="text-gray-300 hover:bg-gray-700">
                        <Play className="w-4 h-4 mr-1" />
                        Run
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-300 hover:bg-gray-700">
                        <Save className="w-4 h-4 mr-1" />
                        Save
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-300 hover:bg-gray-700">
                        <Settings className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Editor */}
            <div className="flex-1 flex">
                {/* Line numbers */}
                <div className="bg-[#1E1E1E] text-gray-500 text-right pr-4 py-4" style={{ minWidth: '50px' }}>
                    {code.split('\n').map((_, i) => (
                        <div key={i} className="leading-6 font-mono text-sm">{i + 1}</div>
                    ))}
                </div>

                {/* Code area */}
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-1 bg-[#1E1E1E] text-gray-200 font-mono text-sm p-4 outline-none resize-none"
                    style={{ tabSize: 2 }}
                    placeholder="Start coding..."
                />
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-4 py-1 bg-[#007ACC] text-white text-xs">
                <span>UTF-8</span>
                <span>JavaScript</span>
                <span>Ln {code.split('\n').length}, Col 0</span>
            </div>
        </div>
    );
}
