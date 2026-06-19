import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  GraduationCap,
  Wrench,
  Briefcase,
  Award,
  Folder,
  FolderCode,
} from 'lucide-react';
import { bio, skills, experience, projects } from '../data/portfolio';

// ── Types ────────────────────────────────────────────────────
type TabId = 'bio' | 'education' | 'skills' | 'experience' | 'certs' | 'projects';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

// ── Tab definitions ──────────────────────────────────────────
const TABS: Tab[] = [
  { id: 'bio', label: 'Bio', icon: <User size={16} /> },
  { id: 'education', label: 'Education', icon: <GraduationCap size={16} /> },
  { id: 'skills', label: 'Skills', icon: <Wrench size={16} /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase size={16} /> },
  { id: 'projects', label: 'Projects', icon: <FolderCode size={16} /> },
  { id: 'certs', label: 'Certs', icon: <Award size={16} /> },
];

// ── Shared animation variant ─────────────────────────────────
const panelVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15, ease: 'easeIn' } },
};

// ── Inline‑style helpers ─────────────────────────────────────
const mono = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: 'var(--font-mono)',
  ...extra,
});

const fieldRow = (
  label: string,
  value: string,
  accent = 'var(--accent-cyan)',
): React.ReactNode => (
  <div style={{ display: 'flex', gap: 12, lineHeight: 1.85, fontSize: '0.85rem' }}>
    <span style={{ ...mono(), color: accent, minWidth: 160, flexShrink: 0 }}>
      {label}
    </span>
    <span style={{ color: 'var(--text-primary)' }}>{value}</span>
  </div>
);

// ── Tab content components ───────────────────────────────────

function BioTab() {
  return (
    <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
      {/* Avatar */}
      <div
        style={{
          width: 130,
          height: 130,
          borderRadius: 8,
          overflow: 'hidden',
          border: '2px solid var(--accent-cyan)',
          boxShadow: '0 0 24px rgba(0,243,255,0.12)',
          flexShrink: 0,
        }}
      >
        <img
          src="/avatar.png"
          alt={bio.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Neofetch fields */}
      <div style={{ flex: 1, minWidth: 240 }}>
        <div
          style={{
            ...mono(),
            fontSize: '1.1rem',
            color: 'var(--accent-green)',
            marginBottom: 4,
          }}
        >
          {bio.name}@portfolio
        </div>
        <div
          style={{
            width: '100%',
            height: 1,
            background: 'var(--card-border)',
            marginBottom: 10,
          }}
        />

        {fieldRow('Tagline', bio.tagline)}
        {fieldRow('Location', bio.location)}
        {fieldRow('University', bio.university)}
        {fieldRow('Degree', bio.degree)}
        {fieldRow('Role', bio.role)}
        {fieldRow('Focus Areas', bio.focusAreas.join(' · '))}

        <div
          style={{
            marginTop: 14,
            padding: '10px 14px',
            background: 'rgba(0,255,65,0.04)',
            border: '1px solid rgba(0,255,65,0.12)',
            borderRadius: 6,
            ...mono({ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7 }),
          }}
        >
          <span style={{ color: 'var(--accent-green)' }}>$ whoami</span>
          <br />
          {bio.shortBio}
        </div>
      </div>
    </div>
  );
}

function EducationTab() {
  const rows: [string, string][] = [
    ['University', bio.university],
    ['Degree', bio.degree],
    ['CGPA', bio.cgpa],
    ['Expected Grad', String(bio.graduationYear)],
    ['Location', bio.location],
  ];

  return (
    <div>
      <SectionHeader text="education.log" />
      <div
        style={{
          background: 'rgba(0,0,0,0.3)',
          borderRadius: 8,
          border: '1px solid var(--card-border)',
          padding: '18px 22px',
        }}
      >
        {rows.map(([label, value]) => (
          <div key={label}>{fieldRow(label, value)}</div>
        ))}
      </div>
    </div>
  );
}

function SkillsTab() {
  return (
    <div>
      <SectionHeader text="skills.tree" />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 14,
        }}
      >
        {skills.map((cat) => (
          <div
            key={cat.category}
            style={{
              background: 'rgba(0,0,0,0.3)',
              borderRadius: 8,
              border: '1px solid var(--card-border)',
              padding: '14px 16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 10,
                ...mono({ fontSize: '0.85rem', color: cat.color }),
              }}
            >
              <Folder size={14} />
              {cat.category.replace('_', '/')}
            </div>

            {cat.items.map((item, i) => {
              const isLast = i === cat.items.length - 1;
              return (
                <div
                  key={item}
                  style={{
                    ...mono({
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      paddingLeft: 8,
                      lineHeight: 1.9,
                    }),
                  }}
                >
                  <span style={{ color: 'var(--text-muted)', marginRight: 6 }}>
                    {isLast ? '└─' : '├─'}
                  </span>
                  {item}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceTab() {
  return (
    <div>
      <SectionHeader text="experience.log" />
      {experience.map((exp) => (
        <div
          key={exp.org}
          style={{
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 8,
            border: '1px solid var(--card-border)',
            padding: '18px 22px',
            marginBottom: 14,
          }}
        >
          <div
            style={{
              ...mono({ fontSize: '0.92rem', color: 'var(--accent-cyan)' }),
              marginBottom: 2,
            }}
          >
            {exp.title}
          </div>
          <div
            style={{
              ...mono({ fontSize: '0.8rem', color: 'var(--text-muted)' }),
              marginBottom: 12,
            }}
          >
            @ {exp.org}
          </div>

          {exp.bullets.map((b, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 10,
                marginBottom: 8,
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}
            >
              <span style={{ color: 'var(--accent-green)', flexShrink: 0, ...mono() }}>
                ▸
              </span>
              <span>{b}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function CertsTab() {
  return (
    <div>
      <SectionHeader text="certs.verified" />

      {/* Certifications */}
      <div
        style={{
          background: 'rgba(0,0,0,0.3)',
          borderRadius: 8,
          border: '1px solid var(--card-border)',
          padding: '18px 22px',
          marginBottom: 16,
        }}
      >
        <div
          style={{
            ...mono({ fontSize: '0.82rem', color: 'var(--accent-yellow)', marginBottom: 10 }),
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Award size={14} />
          Certifications
        </div>
        {bio.certs.map((c) => (
          <div key={c} style={{ display: 'flex', gap: 10, marginBottom: 4 }}>
            <span style={{ ...mono({ color: 'var(--accent-green)', fontSize: '0.82rem' }) }}>
              ✓
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{c}</span>
          </div>
        ))}
      </div>

      {/* CTF platforms */}
      <div
        style={{
          background: 'rgba(0,0,0,0.3)',
          borderRadius: 8,
          border: '1px solid var(--card-border)',
          padding: '18px 22px',
        }}
      >
        <div
          style={{
            ...mono({ fontSize: '0.82rem', color: 'var(--accent-purple)', marginBottom: 10 }),
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Folder size={14} />
          CTF Platforms
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {bio.ctfPlatforms.map((p) => (
            <span
              key={p}
              style={{
                ...mono({ fontSize: '0.78rem' }),
                padding: '4px 12px',
                borderRadius: 4,
                background: 'rgba(123,44,191,0.12)',
                border: '1px solid rgba(123,44,191,0.3)',
                color: 'var(--text-primary)',
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ ...mono({ fontSize: '1.2rem', color: 'var(--accent-cyan)' }) }}>
        ~/projects/
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {projects.map((proj) => (
          <div key={proj.id} className="glass-panel" style={{ padding: 20 }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span>{proj.title}</span>
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 12 }}>
              {proj.shortDesc}
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {proj.tech.map((tag: string) => (
                <span 
                  key={tag} 
                  style={{ 
                    ...mono({ fontSize: '0.7rem' }),
                    padding: '2px 8px', 
                    background: 'rgba(0, 243, 255, 0.1)', 
                    color: 'var(--accent-cyan)',
                    borderRadius: 4
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Small reusable pieces ────────────────────────────────────
function SectionHeader({ text }: { text: string }) {
  return (
    <div
      style={{
        ...mono({ fontSize: '0.78rem', color: 'var(--text-muted)' }),
        marginBottom: 14,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <span style={{ color: 'var(--accent-green)' }}>▶</span>
      ~/{text}
    </div>
  );
}

// ── Tab→component map ────────────────────────────────────────
const TAB_CONTENT: Record<TabId, () => React.ReactNode> = {
  bio: BioTab,
  education: EducationTab,
  skills: SkillsTab,
  experience: ExperienceTab,
  certs: CertsTab,
  projects: ProjectsTab,
};

// ── Main component ───────────────────────────────────────────
export default function AboutMeApp() {
  const [activeTab, setActiveTab] = useState<TabId>('bio');
  const ActiveContent = TAB_CONTENT[activeTab];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: 'var(--bg-color)',
        fontFamily: 'var(--font-sans)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Scanline overlay ─────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 10,
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)',
        }}
      />

      {/* ── Left sidebar ─────────────────────────────────── */}
      <nav
        style={{
          width: 180,
          flexShrink: 0,
          borderRight: '1px solid var(--card-border)',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 0',
          background: 'rgba(0,0,0,0.2)',
        }}
      >
        <div
          style={{
            ...mono({
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              padding: '0 16px',
              marginBottom: 12,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }),
          }}
        >
          intel / recon
        </div>

        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 16px',
                background: isActive ? 'rgba(0,243,255,0.06)' : 'transparent',
                border: 'none',
                borderLeft: isActive
                  ? '3px solid var(--accent-cyan)'
                  : '3px solid transparent',
                color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                ...mono({ fontSize: '0.82rem' }),
                textAlign: 'left',
                transition: 'all 150ms ease',
                width: '100%',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(0,243,255,0.03)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}

        {/* Bottom status badge */}
        <div style={{ marginTop: 'auto', padding: '12px 16px' }}>
          <div
            style={{
              ...mono({ fontSize: '0.68rem', color: 'var(--accent-green)' }),
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--accent-green)',
                boxShadow: '0 0 6px var(--accent-green)',
              }}
            />
            ONLINE
          </div>
        </div>
      </nav>

      {/* ── Right content pane ────────────────────────────── */}
      <main
        style={{
          flex: 1,
          overflow: 'auto',
          padding: 28,
          position: 'relative',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={panelVariants as any}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ActiveContent />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
