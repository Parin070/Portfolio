import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Terminal,
  FolderCode,
  Wrench,
  Mail,
  FileDown,
} from 'lucide-react';
import '../css/dock.css';

export interface DockApp {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: 'window' | 'download';
}

export const dockApps: DockApp[] = [
  { id: 'about', label: 'About Me', icon: <User />, action: 'window' },
  { id: 'terminal', label: 'Terminal', icon: <Terminal />, action: 'window' },
  { id: 'projects', label: 'Projects', icon: <FolderCode />, action: 'window' },
  { id: 'skills', label: 'Skills', icon: <Wrench />, action: 'window' },
  { id: 'contact', label: 'Contact', icon: <Mail />, action: 'window' },
  { id: 'resume', label: 'Resume', icon: <FileDown />, action: 'download' },
];

interface DockProps {
  openWindows: string[];
  onLaunchApp: (id: string) => void;
}

const MAX_SCALE = 1.5;
const AFFECT_DISTANCE = 120;

const Dock = ({ openWindows, onLaunchApp }: DockProps) => {
  const dockRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [bouncingId, setBouncingId] = useState<string | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMouseX(e.clientX);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseX(null);
    setHoveredId(null);
  }, []);

  const handleClick = (app: DockApp) => {
    if (app.action === 'download') {
      const a = document.createElement('a');
      a.href = '/Parin_Arora_CV.pdf';
      a.download = 'Parin_Arora_CV.pdf';
      a.click();
      return;
    }

    // Bounce animation
    setBouncingId(app.id);
    setTimeout(() => setBouncingId(null), 600);

    onLaunchApp(app.id);
  };

  const getScale = (index: number): number => {
    if (mouseX === null || !dockRef.current) return 1;

    const icons = dockRef.current.querySelectorAll('.dock-icon');
    const icon = icons[index] as HTMLElement;
    if (!icon) return 1;

    const rect = icon.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2;
    const distance = Math.abs(mouseX - iconCenterX);

    if (distance > AFFECT_DISTANCE) return 1;

    const scale = 1 + (MAX_SCALE - 1) * (1 - distance / AFFECT_DISTANCE);
    return scale;
  };

  return (
    <div className="dock-container">
      <div
        ref={dockRef}
        className="dock-bar"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {dockApps.map((app, index) => {
          const scale = getScale(index);
          const isOpen = openWindows.includes(app.id);

          return (
            <div
              key={app.id}
              className="dock-icon-wrapper"
              onMouseEnter={() => setHoveredId(app.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {hoveredId === app.id && (
                  <motion.div
                    className="dock-tooltip"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                  >
                    {app.label}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className={`dock-icon ${bouncingId === app.id ? 'bouncing' : ''}`}
                onClick={() => handleClick(app)}
                animate={{ scale }}
                transition={{ type: 'spring', stiffness: 400, damping: 25, mass: 0.5 }}
                style={{ transformOrigin: 'bottom center' }}
              >
                {app.icon}
              </motion.div>

              <div className={`dock-indicator ${isOpen ? 'active' : ''}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dock;
