// ============================================================
// src/apps/TerminalApp.tsx — Interactive terminal emulator
// ============================================================

import { useState, useRef, useEffect, useCallback, type ReactNode, type KeyboardEvent, type FormEvent } from 'react';
import { bio, projects, skills, experience, contact } from '../data/portfolio';
import '../css/terminal.css';

// ── Types ────────────────────────────────────────────────────

interface OutputLine {
  id: number;
  content: ReactNode;
}

// ── Constants ────────────────────────────────────────────────

const PROMPT = 'parin@portfolio:~$ ';

const LS_FILES = ['about.txt', 'projects/', 'skills.json', 'resume.pdf', 'contact.sh'];

const NEOFETCH_ART = [
  '        ▄▄▄▄▄▄▄         ',
  '      ▄█████████▄       ',
  '    ▄███████████████▄    ',
  '   ████▀▀▀▀▀▀▀▀▀████   ',
  '  ████    ▄▄▄▄    ████  ',
  '  ███    ████▀▀    ███  ',
  '  ███    ████      ███  ',
  '  ████    ▀▀▀▀    ████  ',
  '   ████▄▄▄▄▄▄▄▄▄████   ',
  '    ▀███████████████▀    ',
  '      ▀█████████▀       ',
  '        ▀▀▀▀▀▀▀         ',
];

const NEOFETCH_INFO: [string, string][] = [
  ['OS', 'ParinOS v2.0'],
  ['Host', 'portfolio.vercel.app'],
  ['Kernel', 'React 19'],
  ['Shell', 'parin-sh'],
  ['Terminal', 'portfolio-term'],
  ['CPU', 'BITS Pilani CS'],
  ['Theme', 'Hacker Dark'],
];

// ── Helpers ──────────────────────────────────────────────────

let lineId = 0;
const nextId = () => ++lineId;

/** Wrap raw text in a span with optional color */
const colored = (text: string, color: string): ReactNode => (
  <span style={{ color }}>{text}</span>
);

/** Build a single OutputLine from ReactNode content */
const line = (content: ReactNode): OutputLine => ({ id: nextId(), content });

/** Build multiple OutputLines from an array */
const lines = (items: ReactNode[]): OutputLine[] => items.map((c) => line(c));

// ── Command Handlers ─────────────────────────────────────────

function cmdHelp(): OutputLine[] {
  const cmds: [string, string][] = [
    ['help', 'Show this help message'],
    ['about', 'Learn about me'],
    ['projects', 'List all projects'],
    ['projects <name>', 'Detailed project view'],
    ['experience', 'Work & leadership experience'],
    ['skills', 'Technical skills by category'],
    ['certs', 'Certifications & CTF platforms'],
    ['contact', 'GitHub & LinkedIn links'],
    ['whoami', 'Who are you?'],
    ['ls', 'List files in current directory'],
    ['cat resume.pdf', 'Download my resume'],
    ['neofetch', 'System information'],
    ['clear', 'Clear the terminal'],
  ];

  return [
    line(colored('┌─────────────────────────────────────────────────────┐', '#4a5568')),
    line(colored('│  Available Commands                                 │', '#00f3ff')),
    line(colored('├─────────────────────┬───────────────────────────────┤', '#4a5568')),
    ...cmds.map(([cmd, desc]) =>
      line(
        <span>
          <span style={{ color: '#4a5568' }}>│ </span>
          <span style={{ color: '#00ff41', display: 'inline-block', width: '19ch' }}>{cmd}</span>
          <span style={{ color: '#4a5568' }}> │ </span>
          <span style={{ color: '#e2e8f0' }}>{desc}</span>
        </span>,
      ),
    ),
    line(colored('└─────────────────────┴───────────────────────────────┘', '#4a5568')),
  ];
}

function cmdAbout(): OutputLine[] {
  return [
    line(''),
    line(
      <span>
        <span style={{ color: '#00f3ff', fontWeight: 700 }}>{bio.name}</span>
        <span style={{ color: '#4a5568' }}> — </span>
        <span style={{ color: '#ffbd2e' }}>{bio.tagline}</span>
      </span>,
    ),
    line(''),
    line(<span style={{ color: '#e2e8f0' }}>{bio.shortBio}</span>),
    line(''),
    line(
      <span>
        <span style={{ color: '#7b2cbf' }}>🎓 </span>
        <span style={{ color: '#e2e8f0' }}>
          {bio.degree} @ {bio.university} (Class of {bio.graduationYear})
        </span>
      </span>,
    ),
    line(
      <span>
        <span style={{ color: '#7b2cbf' }}>📊 </span>
        <span style={{ color: '#e2e8f0' }}>CGPA: {bio.cgpa}</span>
      </span>,
    ),
    line(
      <span>
        <span style={{ color: '#7b2cbf' }}>📍 </span>
        <span style={{ color: '#e2e8f0' }}>{bio.location}</span>
      </span>,
    ),
    line(
      <span>
        <span style={{ color: '#7b2cbf' }}>🛡️ </span>
        <span style={{ color: '#e2e8f0' }}>Focus: {bio.focusAreas.join(' · ')}</span>
      </span>,
    ),
    line(''),
  ];
}

function cmdProjects(arg?: string): OutputLine[] {
  if (!arg) {
    // list all projects
    return [
      line(''),
      line(colored('  Projects', '#00f3ff')),
      line(colored('  ────────', '#4a5568')),
      ...projects.map((p) =>
        line(
          <span>
            <span style={{ color: '#00ff41' }}>  ▸ {p.id}</span>
            <span style={{ color: '#4a5568' }}> — </span>
            <span style={{ color: '#e2e8f0' }}>{p.shortDesc}</span>
          </span>,
        ),
      ),
      line(''),
      line(colored('  Type "projects <name>" for details.', '#4a5568')),
      line(''),
    ];
  }

  // search by id or partial title
  const query = arg.toLowerCase();
  const match = projects.find(
    (p) => p.id.toLowerCase() === query || p.title.toLowerCase().includes(query),
  );

  if (!match) {
    return [line(colored(`  Project "${arg}" not found. Try "projects" to list all.`, '#ff5f56'))];
  }

  const out: OutputLine[] = [
    line(''),
    line(colored(`  ╔══ ${match.title} ══╗`, '#00f3ff')),
    line(''),
    line(<span style={{ color: '#e2e8f0' }}>  {match.longDesc}</span>),
    line(''),
    line(
      <span>
        <span style={{ color: '#ffbd2e' }}>  Tech: </span>
        <span style={{ color: '#e2e8f0' }}>{match.tech.join(' · ')}</span>
      </span>,
    ),
  ];

  if (match.github) {
    out.push(
      line(
        <span>
          <span style={{ color: '#7b2cbf' }}>  GitHub: </span>
          <span style={{ color: '#00f3ff' }}>{match.github}</span>
        </span>,
      ),
    );
  }
  if (match.link) {
    out.push(
      line(
        <span>
          <span style={{ color: '#7b2cbf' }}>  Link:   </span>
          <span style={{ color: '#00f3ff' }}>{match.link}</span>
        </span>,
      ),
    );
  }
  out.push(line(''));
  return out;
}

function cmdExperience(): OutputLine[] {
  const out: OutputLine[] = [line('')];
  for (const exp of experience) {
    out.push(
      line(
        <span>
          <span style={{ color: '#00f3ff', fontWeight: 700 }}> {exp.title}</span>
          <span style={{ color: '#4a5568' }}> @ </span>
          <span style={{ color: '#ffbd2e' }}>{exp.org}</span>
        </span>,
      ),
    );
    out.push(line(''));
    for (const bullet of exp.bullets) {
      out.push(
        line(
          <span>
            <span style={{ color: '#00ff41' }}>   ▸ </span>
            <span style={{ color: '#e2e8f0' }}>{bullet}</span>
          </span>,
        ),
      );
    }
    out.push(line(''));
  }
  return out;
}

function cmdSkills(): OutputLine[] {
  const out: OutputLine[] = [line('')];
  for (const cat of skills) {
    const label = cat.category.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    out.push(
      line(
        <span>
          <span style={{ color: cat.color, fontWeight: 700 }}>  [{label}]</span>
        </span>,
      ),
    );
    out.push(
      line(
        <span style={{ color: '#e2e8f0' }}>  {cat.items.join(' · ')}</span>,
      ),
    );
    out.push(line(''));
  }
  return out;
}

function cmdCerts(): OutputLine[] {
  return [
    line(''),
    line(colored('  Certifications', '#00f3ff')),
    line(colored('  ──────────────', '#4a5568')),
    ...bio.certs.map((c) =>
      line(
        <span>
          <span style={{ color: '#00ff41' }}>  ✔ </span>
          <span style={{ color: '#e2e8f0' }}>{c}</span>
        </span>,
      ),
    ),
    line(''),
    line(colored('  CTF Platforms', '#00f3ff')),
    line(colored('  ─────────────', '#4a5568')),
    line(
      <span style={{ color: '#ffbd2e' }}>  {bio.ctfPlatforms.join(' · ')}</span>,
    ),
    line(''),
  ];
}

function cmdContact(): OutputLine[] {
  return [
    line(''),
    line(
      <span>
        <span style={{ color: '#00ff41' }}>  GitHub   </span>
        <span style={{ color: '#00f3ff' }}>{contact.github.url}</span>
      </span>,
    ),
    line(
      <span>
        <span style={{ color: '#00ff41' }}>  LinkedIn </span>
        <span style={{ color: '#00f3ff' }}>{contact.linkedin.url}</span>
      </span>,
    ),
    line(''),
  ];
}

function cmdLs(): OutputLine[] {
  return [
    line(
      <span>
        {LS_FILES.map((f, i) => (
          <span key={f}>
            <span style={{ color: f.endsWith('/') ? '#00f3ff' : '#00ff41' }}>{f}</span>
            {i < LS_FILES.length - 1 ? '  ' : ''}
          </span>
        ))}
      </span>,
    ),
  ];
}

function cmdNeofetch(): OutputLine[] {
  const padded = NEOFETCH_ART.length > NEOFETCH_INFO.length
    ? NEOFETCH_ART.length
    : NEOFETCH_INFO.length;

  const rows: OutputLine[] = [];

  // Title row above info
  const headerLine = (
    <span>
      <span style={{ color: '#00f3ff' }}>{'                          '}</span>
      <span style={{ color: '#00f3ff', fontWeight: 700 }}>parin@portfolio</span>
    </span>
  );

  rows.push(line(''));

  for (let i = 0; i < padded; i++) {
    const artPart = i < NEOFETCH_ART.length ? NEOFETCH_ART[i] : ' '.repeat(25);
    const infoPart = (() => {
      if (i === 0) return headerLine;
      if (i === 1) {
        return <span style={{ color: '#4a5568' }}>{'                          ───────────────────'}</span>;
      }
      const infoIdx = i - 2;
      if (infoIdx >= 0 && infoIdx < NEOFETCH_INFO.length) {
        const [key, val] = NEOFETCH_INFO[infoIdx];
        return (
          <span>
            {'  '}
            <span style={{ color: '#00f3ff', fontWeight: 700 }}>{key}</span>
            <span style={{ color: '#4a5568' }}>: </span>
            <span style={{ color: '#e2e8f0' }}>{val}</span>
          </span>
        );
      }
      // color palette row
      if (infoIdx === NEOFETCH_INFO.length) {
        const palette = ['#ff5f56', '#ffbd2e', '#27c93f', '#00f3ff', '#7b2cbf', '#e2e8f0'];
        return (
          <span>
            {'  '}
            {palette.map((c) => (
              <span key={c} style={{ color: c }}>{'███'}</span>
            ))}
          </span>
        );
      }
      return null;
    })();

    rows.push(
      line(
        <span>
          <span style={{ color: '#7b2cbf' }}>{artPart}</span>
          {infoPart}
        </span>,
      ),
    );
  }

  rows.push(line(''));
  return rows;
}

function cmdCatResume(): OutputLine[] {
  // Trigger download
  const a = document.createElement('a');
  a.href = '/Parin_Arora_CV.pdf';
  a.download = 'Parin_Arora_CV.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  return [
    line(colored('  Downloading resume...', '#00ff41')),
  ];
}

// ── Welcome Message ──────────────────────────────────────────

const welcomeLines: OutputLine[] = lines([
  <span>
    <span style={{ color: '#00f3ff', fontWeight: 700 }}>Welcome to ParinOS v2.0</span>
    <span style={{ color: '#4a5568' }}> — </span>
    <span style={{ color: '#e2e8f0' }}>Type &quot;help&quot; to get started.</span>
  </span>,
  '',
]);

// ── Component ────────────────────────────────────────────────

const TerminalApp = () => {
  const [output, setOutput] = useState<OutputLine[]>(welcomeLines);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  // stash whatever was typed before the user started scrolling history
  const [draft, setDraft] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  // ── Execute Command ──────────────────────────────────────

  const execute = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      const promptLine: OutputLine = {
        id: nextId(),
        content: (
          <span>
            <span style={{ color: '#00ff41' }}>{PROMPT}</span>
            <span style={{ color: '#e2e8f0' }}>{trimmed}</span>
          </span>
        ),
      };

      if (!trimmed) {
        setOutput((prev) => [...prev, promptLine]);
        return;
      }

      // Parse command + args
      const parts = trimmed.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1).join(' ');

      let result: OutputLine[];

      switch (cmd) {
        case 'help':
          result = cmdHelp();
          break;
        case 'about':
          result = cmdAbout();
          break;
        case 'projects':
          result = cmdProjects(args || undefined);
          break;
        case 'experience':
          result = cmdExperience();
          break;
        case 'skills':
          result = cmdSkills();
          break;
        case 'certs':
          result = cmdCerts();
          break;
        case 'contact':
          result = cmdContact();
          break;
        case 'whoami':
          result = [line(colored('parin@portfolio', '#00f3ff'))];
          break;
        case 'clear':
          setOutput([]);
          return;
        case 'ls':
          result = cmdLs();
          break;
        case 'cat':
          if (args.toLowerCase() === 'resume.pdf') {
            result = cmdCatResume();
          } else {
            result = [line(colored(`  cat: ${args || '???'}: No such file or directory`, '#ff5f56'))];
          }
          break;
        case 'neofetch':
          result = cmdNeofetch();
          break;
        case 'sudo':
          result = [line(colored('  Nice try. This incident will be reported.', '#ff5f56'))];
          break;
        default:
          result = [
            line(
              <span>
                <span style={{ color: '#ff5f56' }}>Command not found: {cmd}</span>
                <span style={{ color: '#4a5568' }}>. Type &quot;help&quot; for available commands.</span>
              </span>,
            ),
          ];
      }

      setOutput((prev) => [...prev, promptLine, ...result]);
    },
    [],
  );

  // ── Form Submit ──────────────────────────────────────────

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const cmd = input;
      execute(cmd);

      // Update command history (skip empty & clear duplicate of last)
      if (cmd.trim()) {
        setHistory((prev) => {
          const next = [...prev];
          if (next[next.length - 1] !== cmd.trim()) {
            next.push(cmd.trim());
          }
          return next;
        });
      }
      setInput('');
      setHistoryIdx(-1);
      setDraft('');
    },
    [input, execute],
  );

  // ── Arrow Key History ────────────────────────────────────

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length === 0) return;

        // entering history from normal typing — save draft
        if (historyIdx === -1) {
          setDraft(input);
        }

        const newIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIdx === -1) return;

        if (historyIdx >= history.length - 1) {
          // back to draft
          setHistoryIdx(-1);
          setInput(draft);
        } else {
          const newIdx = historyIdx + 1;
          setHistoryIdx(newIdx);
          setInput(history[newIdx]);
        }
      }
    },
    [history, historyIdx, input, draft],
  );

  // ── Render ───────────────────────────────────────────────

  return (
    <div
      ref={containerRef}
      className="terminal-fallback"
      onClick={focusInput}
      style={{ cursor: 'text' }}
    >
      {/* Output history */}
      <div style={{ flex: '0 0 auto' }}>
        {output.map((l) => (
          <div key={l.id} className="output-line">
            {l.content}
          </div>
        ))}
      </div>

      {/* Input line */}
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', alignItems: 'center', flexShrink: 0, paddingTop: 2 }}
        autoComplete="off"
      >
        <span className="prompt">{PROMPT}</span>
        <input
          ref={inputRef}
          className="cmd-input"
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            // reset history index when user types manually
            if (historyIdx !== -1) {
              setHistoryIdx(-1);
            }
          }}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label="Terminal input"
        />
      </form>

      {/* Scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
};

export default TerminalApp;
