import { useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { motion } from 'framer-motion';
import '../css/window.css';

interface WindowProps {
  id: string;
  title: string;
  defaultWidth: number;
  defaultHeight: number;
  defaultX: number;
  defaultY: number;
  isFocused: boolean;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

const Window = ({
  id,
  title,
  defaultWidth,
  defaultHeight,
  defaultX,
  defaultY,
  isFocused,
  zIndex,
  onClose,
  onMinimize,
  onFocus,
  children,
}: WindowProps) => {
  const rndRef = useRef<Rnd>(null);

  // Prevent focus on initial mount flicker
  useEffect(() => {
    onFocus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Rnd
      ref={rndRef}
      default={{
        x: defaultX,
        y: defaultY,
        width: defaultWidth,
        height: defaultHeight,
      }}
      minWidth={400}
      minHeight={300}
      bounds="parent"
      dragHandleClassName="window-titlebar"
      style={{ zIndex }}
      onMouseDown={onFocus}
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
    >
      <motion.div
        className={`os-window ${isFocused ? 'focused' : ''}`}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 30, mass: 0.8 }}
        style={{ width: '100%', height: '100%' }}
        data-window-id={id}
      >
        {/* Title Bar */}
        <div className="window-titlebar">
          <div className="traffic-lights">
            <button
              className="traffic-light close"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close window"
            >
              <svg viewBox="0 0 12 12" fill="none" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="3" x2="9" y2="9" />
                <line x1="9" y1="3" x2="3" y2="9" />
              </svg>
            </button>
            <button
              className="traffic-light minimize"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              aria-label="Minimize window"
            >
              <svg viewBox="0 0 12 12" fill="none" strokeWidth="2" strokeLinecap="round">
                <line x1="2" y1="6" x2="10" y2="6" />
              </svg>
            </button>
            <button
              className="traffic-light maximize"
              onClick={(e) => {
                e.stopPropagation();
                // Toggle maximize
                if (rndRef.current) {
                  const parent = rndRef.current.getSelfElement()?.parentElement;
                  if (parent) {
                    rndRef.current.updateSize({
                      width: parent.clientWidth - 20,
                      height: parent.clientHeight - 20,
                    });
                    rndRef.current.updatePosition({ x: 10, y: 10 });
                  }
                }
              }}
              aria-label="Maximize window"
            >
              <svg viewBox="0 0 12 12" fill="none" strokeWidth="1.5" strokeLinecap="round">
                <polyline points="3,8 3,3 8,3" />
                <polyline points="9,4 9,9 4,9" />
              </svg>
            </button>
          </div>
          <div className="window-title">{title}</div>
        </div>

        {/* Window Body */}
        <div className="window-body">{children}</div>
      </motion.div>
    </Rnd>
  );
};

export default Window;
