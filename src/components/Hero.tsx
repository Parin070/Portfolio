import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';

const Hero = () => {
  const [showInit, setShowInit] = useState(true);

  const sequence = [
    "./initialize",
    "bypassing mainframe security...",
    "establishing secure connection...",
    "access granted."
  ];

  useEffect(() => {
    const totalTime = (sequence.length * 700) + 1500;
    const timer = setTimeout(() => {
      setShowInit(false);
    }, totalTime);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="section-container" style={{ minHeight: '80vh' }}>
      
      <AnimatePresence>
        {showInit && (
          <motion.div 
            initial={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '2rem' }}
          >
            <div style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
              {sequence.map((line, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.7, duration: 0.2 }}
                  style={{ marginBottom: '0.5rem' }}
                >
                  <span style={{ color: 'var(--accent-green)', marginRight: '0.8rem' }}>parin@root:~$</span> <span style={{ color: 'var(--text-primary)' }}>{line}</span>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: sequence.length * 0.7, duration: 0.2 }}
              >
                <span style={{ color: 'var(--accent-green)', marginRight: '0.8rem' }}>parin@root:~$</span> <span className="typing-cursor"></span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: showInit ? 0 : 1, y: showInit ? 20 : 0 }} 
        transition={{ duration: 1 }}
        style={{ 
          marginTop: showInit ? '2rem' : '0',
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '4rem', 
          alignItems: 'center',
          pointerEvents: showInit ? 'none' : 'auto'
        }}
      >
        <div>
          <h1 style={{ fontSize: '5rem', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: '1.1' }}>
            Parin Arora.
          </h1>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--text-secondary)' }}>
            Blue Team | SOC | Threat Hunter
          </h2>
          <p style={{ marginTop: '2rem', color: 'var(--text-secondary)', maxWidth: '700px', fontSize: '1.3rem', lineHeight: '1.8' }}>
            Hunting threats, building tools, breaking things ethically. <br />
            Focusing on Blue Team, Digital Forensics, and Incident Response.
          </p>
        </div>
        
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifySelf: 'center' }}>
          <div style={{ position: 'relative', display: 'flex' }}>
            <div style={{ 
              position: 'absolute', top: -10, left: -10, right: -10, bottom: -10, 
              background: 'linear-gradient(45deg, var(--accent-cyan), transparent)', 
              borderRadius: '12px', zIndex: -1, filter: 'blur(10px)', opacity: 0.5 
            }}></div>
            <img 
              src="/profile.png" 
              alt="Parin Arora" 
              style={{
                width: '100%',
                maxWidth: '350px',
                aspectRatio: '1/1',
                objectFit: 'cover',
                borderRadius: '12px',
                border: '2px solid var(--accent-cyan)',
                boxShadow: '0 0 30px rgba(0, 243, 255, 0.2)',
                filter: 'grayscale(30%)'
              }}
            />
          </div>
          
          <a 
            href="/Parin_Arora_CV.pdf" 
            download="Parin_Arora_CV.pdf"
            className="btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.8rem',
              textDecoration: 'none',
              padding: '1rem 2rem',
              background: 'rgba(0, 255, 65, 0.1)',
              border: '1px solid var(--accent-green)',
              color: 'var(--accent-green)',
              borderRadius: '4px',
              fontSize: '1.2rem',
              transition: 'all 0.3s ease',
              marginTop: '2.5rem',
              width: '100%',
              maxWidth: '350px'
            }}
          >
            <Download size={24} />
            Download Resume
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
