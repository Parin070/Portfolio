import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const Hero = () => {
  const sequence = [
    "./initialize",
    "bypassing mainframe security...",
    "establishing secure connection...",
    "access granted.",
    "welcome to the portfolio of Parin Arora."
  ];

  return (
    <section id="home" className="section-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', zIndex: 10 }}
      >
        <div style={{ fontSize: '1.4rem', color: 'var(--accent-green)' }}>
          {sequence.map((line, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.7, duration: 0.2 }}
              style={{ marginBottom: '0.5rem' }}
            >
              <span style={{ color: 'var(--accent-cyan)' }}>&gt;</span> {line}
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: sequence.length * 0.7, duration: 0.2 }}
          >
            <span style={{ color: 'var(--accent-cyan)' }}>&gt;</span> <span className="typing-cursor"></span>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: sequence.length * 0.7 + 0.3, duration: 1 }}
          style={{ marginTop: '3rem' }}
        >
          <h1 style={{ fontSize: '5rem', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: '1.1' }}>
            Parin Arora.
          </h1>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--text-secondary)' }}>
            Blue Team | SOC | Threat Hunter
          </h2>
          <p style={{ marginTop: '2rem', color: 'var(--text-secondary)', maxWidth: '700px', fontSize: '1.3rem', lineHeight: '1.8', marginBottom: '3rem' }}>
            Hunting threats, building tools, breaking things ethically. <br />
            Currently specializing in Digital Forensics and Incident Response.
          </p>
          
          <a 
            href="/Parin_Arora_CV.pdf" 
            download
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.8rem 1.5rem',
              color: 'var(--bg-color)',
              background: 'var(--accent-cyan)',
              borderRadius: '4px',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e: any) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--accent-cyan)';
              e.currentTarget.style.border = '1px solid var(--accent-cyan)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 243, 255, 0.4)';
            }}
            onMouseLeave={(e: any) => {
              e.currentTarget.style.background = 'var(--accent-cyan)';
              e.currentTarget.style.color = 'var(--bg-color)';
              e.currentTarget.style.border = '1px solid transparent';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Download size={20} />
            ./download_cv
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
