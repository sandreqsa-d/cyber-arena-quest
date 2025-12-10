import React, { useState, useRef, useEffect } from 'react';
import { TerminalChallenge } from '@/data/quizData';

interface TerminalProps {
  challenge: TerminalChallenge;
  onFlagFound: () => void;
}

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success';
  content: string;
}

const Terminal: React.FC<TerminalProps> = ({ challenge, onFlagFound }) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: '╔══════════════════════════════════════════════════════════════╗' },
    { type: 'output', content: '║           CYBER QUEST VIRTUAL MACHINE v2.0                   ║' },
    { type: 'output', content: '║                   Welcome, Hacker!                           ║' },
    { type: 'output', content: '╚══════════════════════════════════════════════════════════════╝' },
    { type: 'output', content: '' },
    { type: 'output', content: `Mission: ${challenge.description}` },
    { type: 'output', content: '' },
    { type: 'output', content: 'Objectives:' },
    ...challenge.objectives.map(obj => ({ type: 'output' as const, content: `  • ${obj}` })),
    { type: 'output', content: '' },
    { type: 'output', content: 'Type "help" for available commands.' },
    { type: 'output', content: '' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [flagFound, setFlagFound] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [
      { type: 'input', content: `hacker@cyberquest:~$ ${cmd}` }
    ];

    if (trimmedCmd === '') {
      setLines(prev => [...prev, ...newLines]);
      return;
    }

    if (trimmedCmd === 'clear' || trimmedCmd === 'cls') {
      setLines([
        { type: 'output', content: 'Terminal cleared. Type "help" for commands.' }
      ]);
      return;
    }

    if (trimmedCmd === 'hint') {
      const randomHint = challenge.hints[Math.floor(Math.random() * challenge.hints.length)];
      newLines.push({ type: 'output', content: `💡 Hint: ${randomHint}` });
      setLines(prev => [...prev, ...newLines]);
      return;
    }

    // Check for matching command
    let commandFound = false;
    for (const [command, response] of Object.entries(challenge.commands)) {
      if (trimmedCmd === command.toLowerCase() || cmd === command) {
        commandFound = true;
        const responseLines = response.split('\n').map(line => {
          if (line.includes(challenge.flagToFind)) {
            if (!flagFound) {
              setFlagFound(true);
              onFlagFound();
            }
            return { type: 'success' as const, content: line };
          }
          return { type: 'output' as const, content: line };
        });
        newLines.push(...responseLines);
        break;
      }
    }

    if (!commandFound) {
      newLines.push({ type: 'error', content: `bash: ${cmd}: command not found or invalid arguments` });
      newLines.push({ type: 'output', content: 'Type "help" for available commands or "hint" for a hint.' });
    }

    setLines(prev => [...prev, ...newLines]);
    setHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      className="bg-terminal-bg rounded-lg border border-primary/30 overflow-hidden box-glow-green"
      onClick={focusInput}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-primary/20">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive" />
          <div className="w-3 h-3 rounded-full bg-accent" />
          <div className="w-3 h-3 rounded-full bg-primary" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">cyberquest-vm — bash</span>
        {flagFound && (
          <span className="ml-auto text-xs text-primary animate-pulse">🚩 FLAG CAPTURED!</span>
        )}
      </div>

      {/* Terminal Body */}
      <div 
        ref={terminalRef}
        className="h-80 overflow-y-auto p-4 font-mono text-sm terminal-scanline"
      >
        {lines.map((line, index) => (
          <div 
            key={index} 
            className={`
              ${line.type === 'input' ? 'text-primary' : ''}
              ${line.type === 'output' ? 'text-terminal-text' : ''}
              ${line.type === 'error' ? 'text-destructive' : ''}
              ${line.type === 'success' ? 'text-primary text-glow-green font-bold' : ''}
              whitespace-pre-wrap break-all leading-relaxed
            `}
          >
            {line.content}
          </div>
        ))}
        
        {/* Input Line */}
        <div className="flex items-center text-primary">
          <span>hacker@cyberquest:~$ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-foreground caret-primary"
            autoFocus
            spellCheck={false}
          />
          <span className="w-2 h-5 bg-primary animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
