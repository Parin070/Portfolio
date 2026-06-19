import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Window from './Window';

// Lazy load app components
const AboutMeApp = lazy(() => import('../apps/AboutMeApp'));
const TerminalApp = lazy(() => import('../apps/TerminalApp'));
const ProjectsApp = lazy(() => import('../apps/ProjectsApp'));
const ContactApp = lazy(() => import('../apps/ContactApp'));
const SkillsApp = lazy(() => import('../apps/SkillsApp'));
const SecretApp = lazy(() => import('../apps/SecretApp'));

export interface WindowState {
  id: string;
  title: string;
  defaultWidth: number;
  defaultHeight: number;
  defaultX: number;
  defaultY: number;
  minimized: boolean;
}

interface WindowManagerProps {
  windows: WindowState[];
  focusedId: string | null;
  zIndexMap: Record<string, number>;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
}

const appDefaults: Record<string, { title: string; width: number; height: number }> = {
  about: { title: 'About Me', width: 850, height: 550 },
  terminal: { title: 'Terminal — parin@portfolio', width: 750, height: 480 },
  projects: { title: 'Projects', width: 800, height: 550 },
  skills: { title: 'Skills', width: 700, height: 500 },
  contact: { title: 'Contact', width: 800, height: 520 },
  secret: { title: 'secret.txt', width: 450, height: 400 },
};

export function getWindowDefaults(id: string, windowIndex: number): WindowState {
  const defaults = appDefaults[id] || { title: id, width: 700, height: 450 };
  // Cascade position
  const offsetX = 60 + (windowIndex % 5) * 40;
  const offsetY = 30 + (windowIndex % 5) * 35;

  return {
    id,
    title: defaults.title,
    defaultWidth: defaults.width,
    defaultHeight: defaults.height,
    defaultX: offsetX,
    defaultY: offsetY,
    minimized: false,
  };
}

const AppContent = ({ id }: { id: string }) => {
  const loader = (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-muted)',
        fontSize: '14px',
      }}
    >
      Loading...
    </div>
  );

  switch (id) {
    case 'about':
      return (
        <Suspense fallback={loader}>
          <AboutMeApp />
        </Suspense>
      );
    case 'terminal':
      return (
        <Suspense fallback={loader}>
          <TerminalApp />
        </Suspense>
      );
    case 'projects':
      return (
        <Suspense fallback={loader}>
          <ProjectsApp />
        </Suspense>
      );
    case 'skills':
      return (
        <Suspense fallback={loader}>
          <SkillsApp />
        </Suspense>
      );
    case 'contact':
      return (
        <Suspense fallback={loader}>
          <ContactApp />
        </Suspense>
      );
    case 'secret':
      return (
        <Suspense fallback={loader}>
          <SecretApp />
        </Suspense>
      );
    default:
      return <div style={{ padding: '2rem' }}>Unknown app: {id}</div>;
  }
};

const WindowManager = ({
  windows,
  focusedId,
  zIndexMap,
  onClose,
  onMinimize,
  onFocus,
}: WindowManagerProps) => {
  return (
    <>
      <AnimatePresence>
        {windows
          .filter((w) => !w.minimized)
          .map((win) => (
            <Window
              key={win.id}
              id={win.id}
              title={win.title}
              defaultWidth={win.defaultWidth}
              defaultHeight={win.defaultHeight}
              defaultX={win.defaultX}
              defaultY={win.defaultY}
              isFocused={focusedId === win.id}
              zIndex={zIndexMap[win.id] || 10}
              onClose={() => onClose(win.id)}
              onMinimize={() => onMinimize(win.id)}
              onFocus={() => onFocus(win.id)}
            >
              <AppContent id={win.id} />
            </Window>
          ))}
      </AnimatePresence>
    </>
  );
};

export default WindowManager;
