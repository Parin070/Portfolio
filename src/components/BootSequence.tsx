import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../css/boot.css';

const bootLines = [
  '[OK] Loading kernel modules...',
  '[OK] Mounting filesystem...',
  '[OK] Starting network services...',
  '[OK] Initializing security protocols...',
  '[OK] Loading portfolio modules...',
  '[OK] Starting desktop environment...',
];

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [phase, setPhase] = useState<'idle' | 'flicker' | 'boot' | 'zoom'>('idle');
  const [visibleLines, setVisibleLines] = useState(0);

  const skipToDesktop = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // Auto-boot sequence
  useEffect(() => {
    if (phase === 'idle') {
      // Wait for initial laptop zoom-in animation, then automatically start
      const timer = setTimeout(() => {
        setPhase('flicker');
        setTimeout(() => {
          setPhase('boot');
        }, 600);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Boot text sequencing
  useEffect(() => {
    if (phase !== 'boot') return;

    if (visibleLines < bootLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines((v) => v + 1);
      }, 120);
      return () => clearTimeout(timer);
    } else {
      // All lines shown, start zoom
      const timer = setTimeout(() => {
        setPhase('zoom');
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [phase, visibleLines]);

  // Zoom complete → transition to desktop
  useEffect(() => {
    if (phase !== 'zoom') return;
    const timer = setTimeout(onComplete, 1200); // Wait for zoom-in animation to finish
    return () => clearTimeout(timer);
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="boot-scene"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={skipToDesktop}
      >
        {/* 3D Laptop */}
        <motion.div 
          className="laptop"
          initial={{ scale: 0.6, y: 50, rotateX: 5, opacity: 0 }}
          animate={
            phase === 'zoom' 
              ? { scale: 8, y: 200, opacity: 0 } 
              : { scale: 1, y: 0, rotateX: 0, opacity: 1 }
          }
          transition={
            phase === 'zoom' 
              ? { duration: 1.2, ease: "circIn" }
              : { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
          }
        >
          {/* Screen / Lid */}
          <div className="laptop-lid">
            <div className="laptop-screen">
              <div className={`laptop-screen-inner ${phase === 'flicker' || phase === 'boot' || phase === 'zoom' ? 'screen-flicker' : ''}`}>
                {(phase === 'boot' || phase === 'zoom') && (
                  <>
                    {bootLines.slice(0, visibleLines).map((line, i) => (
                      <div
                        key={i}
                        className="boot-line"
                        style={{ animationDelay: `${i * 0.05}s` }}
                      >
                        {line}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Keyboard / Base */}
          <div className="laptop-bottom">
            <div className="laptop-keys"></div>
            <div className="laptop-trackpad"></div>
            <button
              className={`power-btn ${phase !== 'idle' ? 'active' : ''}`}
              aria-label="Power on indicator"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2v8" />
                <path d="M18.36 6.64A9 9 0 1 1 5.64 6.64" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Skip hint */}
        <motion.div 
          className="skip-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          click anywhere to skip
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BootSequence;
