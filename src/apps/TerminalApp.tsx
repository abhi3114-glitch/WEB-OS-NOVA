import { useEffect, useRef, useState } from 'react';
import { Terminal as XTerm } from 'xterm';
import 'xterm/css/xterm.css';
import { db } from '@/utils/db';

export default function TerminalApp() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const [currentPath, setCurrentPath] = useState('/');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentCommand, setCurrentCommand] = useState('');

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerm({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'JetBrains Mono, monospace',
      theme: {
        background: '#0A0A0A',
        foreground: '#FFFFFF',
        cursor: '#FF006E',
        black: '#0A0A0A',
        red: '#FF006E',
        green: '#00F5FF',
        yellow: '#FFD700',
        blue: '#00F5FF',
        magenta: '#FF006E',
        cyan: '#00F5FF',
        white: '#FFFFFF',
      },
    });

    term.open(terminalRef.current);
    xtermRef.current = term;

    // Welcome message
    term.writeln('\x1b[1;35mWebOS Nova Terminal v1.0\x1b[0m');
    term.writeln('\x1b[36mType "help" for available commands\x1b[0m');
    term.writeln('');
    writePrompt(term);

    let buffer = '';

    term.onData((data) => {
      const code = data.charCodeAt(0);

      // Handle Enter
      if (code === 13) {
        term.writeln('');
        if (buffer.trim()) {
          executeCommand(term, buffer.trim());
          setCommandHistory((prev) => [...prev, buffer.trim()]);
          setHistoryIndex(-1);
        }
        buffer = '';
        writePrompt(term);
      }
      // Handle Backspace
      else if (code === 127) {
        if (buffer.length > 0) {
          buffer = buffer.slice(0, -1);
          term.write('\b \b');
        }
      }
      // Handle Arrow Up (command history)
      else if (code === 27 && data === '\x1b[A') {
        // Arrow Up
        if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          const cmd = commandHistory[commandHistory.length - 1 - newIndex];
          // Clear current line
          term.write('\r\x1b[K');
          writePrompt(term);
          term.write(cmd);
          buffer = cmd;
        }
      }
      // Handle regular characters
      else if (code >= 32 && code <= 126) {
        buffer += data;
        term.write(data);
      }
    });

    return () => {
      term.dispose();
    };
  }, []);

  const writePrompt = (term: XTerm) => {
    term.write('\x1b[1;32muser@webos\x1b[0m:\x1b[1;34m' + currentPath + '\x1b[0m$ ');
  };

  const executeCommand = async (term: XTerm, command: string) => {
    const parts = command.split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
        term.writeln('\x1b[1;36mAvailable Commands:\x1b[0m');
        term.writeln('  help       - Show this help message');
        term.writeln('  ls         - List files in current directory');
        term.writeln('  cd         - Change directory');
        term.writeln('  cat        - Display file contents');
        term.writeln('  clear      - Clear terminal screen');
        term.writeln('  echo       - Print text to terminal');
        term.writeln('  date       - Show current date and time');
        term.writeln('  whoami     - Display current user');
        break;

      case 'ls':
        try {
          const files = await db.files.where('parentId').equals(null).toArray();
          files.forEach((file) => {
            const icon = file.type === 'folder' ? '📁' : '📄';
            const color = file.type === 'folder' ? '\x1b[1;34m' : '\x1b[0m';
            term.writeln(`${icon} ${color}${file.name}\x1b[0m`);
          });
        } catch (error) {
          term.writeln('\x1b[31mError reading files\x1b[0m');
        }
        break;

      case 'clear':
        term.clear();
        break;

      case 'echo':
        term.writeln(args.join(' '));
        break;

      case 'date':
        term.writeln(new Date().toString());
        break;

      case 'whoami':
        term.writeln('user');
        break;

      case 'cat':
        if (args.length === 0) {
          term.writeln('\x1b[31mUsage: cat <filename>\x1b[0m');
        } else {
          try {
            const files = await db.files.where('name').equals(args[0]).toArray();
            if (files.length > 0 && files[0].content) {
              term.writeln(files[0].content);
            } else {
              term.writeln('\x1b[31mFile not found\x1b[0m');
            }
          } catch (error) {
            term.writeln('\x1b[31mError reading file\x1b[0m');
          }
        }
        break;

      default:
        term.writeln(`\x1b[31mCommand not found: ${cmd}\x1b[0m`);
        term.writeln('Type "help" for available commands');
    }
  };

  return (
    <div className="h-full w-full bg-[#0A0A0A] p-4">
      <div ref={terminalRef} className="h-full w-full" />
    </div>
  );
}