import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import BootSequence from './components/BootSequence';
import Desktop, { getWindowDefaults } from './components/Desktop';
import Cursor from './components/Cursor';
import type { WindowState } from './components/WindowManager';

type Phase = 'boot' | 'desktop';

function App() {
  // Check if boot was already shown this session
  const alreadyBooted = sessionStorage.getItem('portfolio-booted') === 'true';

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [phase, setPhase] = useState<Phase>(
    alreadyBooted || prefersReducedMotion ? 'desktop' : 'boot'
  );

  // Window management state
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [zIndexCounter, setZIndexCounter] = useState(10);
  const [zIndexMap, setZIndexMap] = useState<Record<string, number>>({});
  const [windowCounter, setWindowCounter] = useState(0);

  const handleBootComplete = useCallback(() => {
    sessionStorage.setItem('portfolio-booted', 'true');
    setPhase('desktop');
  }, []);

  const handleLaunchApp = useCallback(
    (id: string) => {
      // If already open, focus it (and restore if minimized)
      const existing = windows.find((w) => w.id === id);
      if (existing) {
        setWindows((prev) =>
          prev.map((w) => (w.id === id ? { ...w, minimized: false } : w))
        );
        setFocusedId(id);
        setZIndexCounter((c) => c + 1);
        setZIndexMap((prev) => ({ ...prev, [id]: zIndexCounter + 1 }));
        return;
      }

      // Open new window
      const win = getWindowDefaults(id, windowCounter);
      setWindowCounter((c) => c + 1);
      setWindows((prev) => [...prev, win]);
      setFocusedId(id);
      setZIndexCounter((c) => c + 1);
      setZIndexMap((prev) => ({ ...prev, [id]: zIndexCounter + 1 }));
    },
    [windows, windowCounter, zIndexCounter]
  );

  const handleCloseWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setFocusedId((prev) => (prev === id ? null : prev));
  }, []);

  const handleMinimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
    setFocusedId((prev) => (prev === id ? null : prev));
  }, []);

  const handleFocusWindow = useCallback(
    (id: string) => {
      setFocusedId(id);
      setZIndexCounter((c) => c + 1);
      setZIndexMap((prev) => ({ ...prev, [id]: zIndexCounter + 1 }));
    },
    [zIndexCounter]
  );

  // Keyboard shortcut: Escape closes focused window
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && focusedId) {
        handleCloseWindow(focusedId);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedId, handleCloseWindow]);

  return (
    <>
      {/* SEO: Hidden static content for crawlers */}
      <noscript>
        <div>
          <h1>Parin Arora — Cybersecurity Portfolio</h1>
          <p>
            Blue Team | SOC | Threat Hunter. B.E. Computer Science, BITS Pilani
            Dubai. Hunting threats, building tools, breaking things ethically.
          </p>
        </div>
      </noscript>

      <Cursor />

      <AnimatePresence mode="wait">
        {phase === 'boot' && (
          <BootSequence key="boot" onComplete={handleBootComplete} />
        )}
      </AnimatePresence>

      {phase === 'desktop' && (
        <Desktop
          windows={windows}
          focusedId={focusedId}
          zIndexMap={zIndexMap}
          onLaunchApp={handleLaunchApp}
          onCloseWindow={handleCloseWindow}
          onMinimizeWindow={handleMinimizeWindow}
          onFocusWindow={handleFocusWindow}
        />
      )}
    </>
  );
}

export default App;
