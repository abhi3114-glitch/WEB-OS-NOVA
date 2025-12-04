import { Button } from '@/components/ui/button';
import { Eye, Code, Save, FileDown } from 'lucide-react';
import { useState } from 'react';

export default function MarkdownEditorApp() {
    const [markdown, setMarkdown] = useState(`# Welcome to Markdown Editor

## Features
- Live preview
- Syntax highlighting
- Export to HTML

### Example Code
\`\`\`javascript
const hello = "World";
\`\`\`

**Bold text** and *italic text*

- List item 1
- List item 2
`);

    return (
        <div className="h-full flex bg-white">
            {/* Editor */}
            <div className="flex-1 flex flex-col border-r">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b">
                    <h3 className="font-semibold">Editor</h3>
                    <Button size="sm" variant="ghost">
                        <Save className="w-4 h-4 mr-1" />
                        Save
                    </Button>
                </div>
                <textarea
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    className="flex-1 p-4 font-mono text-sm resize-none focus:outline-none"
                />
            </div>

            {/* Preview */}
            <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b">
                    <h3 className="font-semibold">Preview</h3>
                    <Button size="sm" variant="ghost">
                        <FileDown className="w-4 h-4 mr-1" />
                        Export
                    </Button>
                </div>
                <div className="flex-1 p-6 overflow-y-auto prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: markdown.replace(/\n/g, '<br/>') }} />
                </div>
            </div>
        </div>
    );
}
