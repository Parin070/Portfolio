import React, { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';

export default function SecretApp() {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === 'cryptography') {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  if (unlocked) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%', 
        backgroundColor: '#0a0a0a', 
        color: '#00ff41', 
        fontFamily: 'var(--font-mono)', 
      }}>
        <Unlock size={48} style={{ marginBottom: 20 }} />
        <div style={{ fontSize: '10rem', textShadow: '0 0 30px rgba(0, 255, 65, 0.8)', fontWeight: 'bold' }}>
          67
        </div>
        <p style={{ marginTop: 20, color: 'var(--text-secondary)' }}>File decrypted successfully.</p>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: 40, 
      fontFamily: 'var(--font-mono)', 
      color: '#fff', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#0f1115' 
    }}>
      <Lock size={48} color="#ff5f56" style={{ marginBottom: 20 }} />
      <h2 style={{ marginBottom: 15, color: '#ff5f56', letterSpacing: '2px' }}>ENCRYPTED PAYLOAD</h2>
      <p style={{ marginBottom: 35, color: 'var(--text-secondary)', textAlign: 'center', maxWidth: 400, lineHeight: 1.6 }}>
        Password required to view contents.<br />
        <span style={{ color: 'var(--accent-yellow)', fontSize: '0.85rem' }}>
          Hint: The fourth tech skill listed on my Cybersecurity Writeups project [Check Projects]
        </span>
      </p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 15, width: 320 }}>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ 
            padding: '12px 16px', 
            background: 'rgba(0,0,0,0.5)', 
            border: error ? '1px solid #ff5f56' : '1px solid rgba(255,255,255,0.1)', 
            color: '#fff', 
            fontFamily: 'var(--font-mono)', 
            outline: 'none',
            borderRadius: 6,
            boxShadow: error ? '0 0 10px rgba(255, 95, 86, 0.2)' : 'none'
          }}
          placeholder="Enter decryption key..."
          autoFocus
        />
        <div style={{ height: 20 }}>
          {error && <div style={{ color: '#ff5f56', fontSize: '0.8rem', textAlign: 'center' }}>ACCESS DENIED: Password incorrect</div>}
        </div>
        <button 
          type="submit" 
          style={{ 
            padding: '12px', 
            background: 'rgba(0, 243, 255, 0.1)', 
            color: '#00f3ff', 
            border: '1px solid rgba(0, 243, 255, 0.4)', 
            cursor: 'pointer', 
            fontFamily: 'var(--font-mono)', 
            textTransform: 'uppercase',
            borderRadius: 6,
            fontWeight: 600,
            letterSpacing: '1px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0, 243, 255, 0.2)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0, 243, 255, 0.1)'}
        >
          Decrypt
        </button>
      </form>
    </div>
  );
}
