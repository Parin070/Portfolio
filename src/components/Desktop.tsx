import React from 'react';
import Wallpaper from './Wallpaper';
import Dock, { dockApps } from './Dock';
import { FileLock2 } from 'lucide-react';
import WindowManager, { type WindowState, getWindowDefaults } from './WindowManager';

interface DesktopProps {
  windows: WindowState[];
  focusedId: string | null;
  zIndexMap: Record<string, number>;
  onLaunchApp: (id: string) => void;
  onCloseWindow: (id: string) => void;
  onMinimizeWindow: (id: string) => void;
  onFocusWindow: (id: string) => void;
}

const Desktop = ({
  windows,
  focusedId,
  zIndexMap,
  onLaunchApp,
  onCloseWindow,
  onMinimizeWindow,
  onFocusWindow,
}: DesktopProps) => {
  const openWindowIds = windows.map((w) => w.id);

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Wallpaper />
      <WindowManager
        windows={windows}
        focusedId={focusedId}
        zIndexMap={zIndexMap}
        onClose={onCloseWindow}
        onMinimize={onMinimizeWindow}
        onFocus={onFocusWindow}
      />

      {/* Desktop Icons Grid */}
      <div
        style={{
          position: 'absolute',
          top: 30,
          left: 30,
          display: 'flex',
          flexFlow: 'column wrap',
          gap: 30,
          maxHeight: 'calc(100vh - 150px)',
          zIndex: 1, // lower z-index so windows (zIndex 10+) open on top
        }}
      >
        {dockApps.filter(app => app.action === 'window').map((app) => (
          <button
            key={app.id}
            onClick={() => onLaunchApp(app.id)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              width: 100,
              padding: '12px 5px',
              borderRadius: 12,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <div style={{
              width: 64,
              height: 64,
              background: '#151923', /* solid background */
              border: '1px solid rgba(0, 243, 255, 0.3)',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-cyan)',
              boxShadow: '0 6px 16px rgba(0,0,0,0.4)',
              transition: 'all var(--transition-fast)',
            }}>
              {React.cloneElement(app.icon as React.ReactElement<any>, { size: 32 })}
            </div>
            <span style={{
              fontSize: '12px',
              fontWeight: 500,
              textShadow: '0 1px 3px rgba(0,0,0,0.8)',
              fontFamily: 'var(--font-sans)',
            }}>
              {app.label}
            </span>
          </button>
        ))}
      </div>

      {/* Secret File Icon (Right side) */}
      <button
        onClick={() => onLaunchApp('secret')}
        style={{
          position: 'absolute',
          top: 30,
          right: 30,
          background: 'transparent',
          border: 'none',
          color: 'var(--text-primary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          width: 100,
          padding: '12px 5px',
          borderRadius: 12,
          cursor: 'pointer',
          transition: 'all var(--transition-fast)',
          zIndex: 1,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <div style={{
          width: 64,
          height: 64,
          background: '#151923',
          border: '1px solid rgba(255, 95, 86, 0.3)',
          borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ff5f56',
          boxShadow: '0 6px 16px rgba(0,0,0,0.4)',
          transition: 'all var(--transition-fast)',
        }}>
          <FileLock2 size={32} />
        </div>
        <span style={{
          fontSize: '12px',
          fontWeight: 500,
          textShadow: '0 1px 3px rgba(0,0,0,0.8)',
          fontFamily: 'var(--font-sans)',
        }}>
          secret.txt
        </span>
      </button>

      <Dock openWindows={openWindowIds} onLaunchApp={onLaunchApp} />
    </div>
  );
};

export { getWindowDefaults };
export default Desktop;
