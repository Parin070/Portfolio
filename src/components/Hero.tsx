import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const sequence = [
    "./initialize",
    "bypassing mainframe security...",
    "establishing secure connection...",
    "access granted.",
    "welcome to the portfolio of Parin Arora."
  ];

  useEffect(() => {
    if (textIndex < sequence.length) {
      const timer = setTimeout(() => {
        setTextIndex(prev => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [textIndex]);

  return (
    <section id="home" className="section-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
      >
        <div style={{ fontSize: '1.4rem', color: 'var(--accent-green)' }}>
          {sequence.slice(0, textIndex).map((line, i) => (
            <div key={i} style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--accent-cyan)' }}>&gt;</span> {line}
            </div>
          ))}
          {textIndex < sequence.length && (
            <div>
              <span style={{ color: 'var(--accent-cyan)' }}>&gt;</span> <span className="typing-cursor"></span>
            </div>
          )}
        </div>

        {textIndex >= sequence.length && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2, duration: 1 }}
            style={{ marginTop: '3rem' }}
          >
            <h1 style={{ fontSize: '5rem', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: '1.1' }}>
              Parin Arora.
            </h1>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-secondary)' }}>
              Blue Team | SOC | Threat Hunter
            </h2>
            <p style={{ marginTop: '2rem', color: 'var(--text-secondary)', maxWidth: '700px', fontSize: '1.3rem', lineHeight: '1.8' }}>
              Hunting threats, building tools, breaking things ethically. <br />
              Currently specializing in Digital Forensics and Incident Response.
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Hero;
