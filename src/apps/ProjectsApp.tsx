import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { projects, type Project } from '../data/portfolio';

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.12, ease: 'easeOut' },
  }),
};

const ProjectsApp = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  /* ─── Detail View ─── */
  if (selected) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="detail"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            padding: '1.5rem',
          }}
        >
          {/* Back button */}
          <button
            onClick={() => setSelected(null)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-cyan)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              marginBottom: '1.5rem',
              padding: '0.4rem 0',
            }}
          >
            <ArrowLeft size={18} /> Back to Projects
          </button>

          {/* Title */}
          <h2
            style={{
              fontSize: '1.75rem',
              color: 'var(--text-primary)',
              marginBottom: '1.25rem',
            }}
          >
            {selected.title}
          </h2>

          {/* Full description */}
          <div
            style={{
              padding: '1.25rem',
              background: 'rgba(0,0,0,0.45)',
              borderRadius: '8px',
              border: '1px solid var(--card-border)',
              marginBottom: '1.5rem',
            }}
          >
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                lineHeight: 1.75,
              }}
            >
              {selected.longDesc}
            </p>
          </div>

          {/* Tech tags */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.6rem',
              marginBottom: '2rem',
            }}
          >
            {selected.tech.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: '0.85rem',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '9999px',
                  background: 'rgba(0, 243, 255, 0.1)',
                  color: 'var(--accent-cyan)',
                  border: '1px solid rgba(0, 243, 255, 0.25)',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {selected.github && (
              <a
                href={selected.github}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.7rem 1.25rem',
                  background: 'rgba(0, 255, 65, 0.12)',
                  border: '1px solid var(--accent-green)',
                  color: 'var(--accent-green)',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                }}
              >
                <GithubIcon size={18} /> View Source
              </a>
            )}
            {selected.link && (
              <a
                href={selected.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.7rem 1.25rem',
                  background: 'rgba(0, 243, 255, 0.08)',
                  border: '1px solid var(--accent-cyan)',
                  color: 'var(--accent-cyan)',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                }}
              >
                <ExternalLink size={18} /> Live Demo
              </a>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  /* ─── Grid View ─── */
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants as any}
            className="glass-panel"
            onClick={() => setSelected(project)}
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              cursor: 'pointer',
              transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'rgba(0, 243, 255, 0.35)';
              el.style.boxShadow = '0 0 20px rgba(0, 243, 255, 0.08)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = '';
              el.style.boxShadow = '';
            }}
          >
            {/* Header: title + link icons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <h3
                style={{
                  fontSize: '1.15rem',
                  color: 'var(--text-primary)',
                  flex: 1,
                }}
              >
                {project.title}
              </h3>
              <div
                style={{ display: 'flex', gap: '0.6rem', flexShrink: 0 }}
              >
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{ color: 'var(--text-muted)' }}
                    title="Source Code"
                  >
                    <GithubIcon size={18} />
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{ color: 'var(--text-muted)' }}
                    title="Live Link"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* Short description */}
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                flex: 1,
              }}
            >
              {project.shortDesc}
            </p>

            {/* Tech pills */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.45rem',
              }}
            >
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px',
                    background: 'rgba(0, 243, 255, 0.1)',
                    color: 'var(--accent-cyan)',
                    border: '1px solid rgba(0, 243, 255, 0.2)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsApp;
