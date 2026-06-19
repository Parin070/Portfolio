import { useState } from 'react';
import { motion } from 'framer-motion';
import { Folder } from 'lucide-react';
import { skills } from '../data/portfolio';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function SkillsApp() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '1.5rem',
        overflowY: 'auto',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Terminal-style header */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.9rem',
          color: 'var(--accent-green)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{ color: 'var(--accent-cyan)' }}>parin@portfolio</span>
        <span style={{ color: 'var(--text-muted)' }}>:</span>
        <span style={{ color: 'var(--accent-purple)' }}>~</span>
        <span style={{ color: 'var(--text-muted)' }}>$</span>
        <span style={{ color: 'var(--text-primary)' }}>ls -la ./skills/</span>
      </div>

      {/* Skills grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {skills.map((cat, idx) => {
          const isHovered = hoveredIdx === idx;

          return (
            <motion.div
              key={cat.category}
              variants={cardVariants as any}
              className="glass-panel"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                padding: '1.25rem',
                borderColor: isHovered ? cat.color : undefined,
                boxShadow: isHovered
                  ? `0 0 18px ${cat.color}33, 0 0 4px ${cat.color}22`
                  : 'none',
                transition:
                  'border-color var(--transition-normal), box-shadow var(--transition-normal)',
              }}
            >
              {/* Card header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  marginBottom: '1rem',
                }}
              >
                <Folder
                  size={18}
                  style={{ color: cat.color, flexShrink: 0 }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    color: cat.color,
                    fontWeight: 500,
                  }}
                >
                  {cat.category}/
                </span>
              </div>

              {/* Tree listing */}
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  lineHeight: 1.9,
                }}
              >
                {cat.items.map((item, i) => {
                  const isLast = i === cat.items.length - 1;
                  const prefix = isLast ? '└─' : '├─';

                  return (
                    <li
                      key={item}
                      style={{
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <span style={{ color: 'var(--text-muted)', userSelect: 'none' }}>
                        {prefix}
                      </span>
                      <span style={{ color: 'var(--text-primary)' }}>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
