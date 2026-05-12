
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section-container" style={{ minHeight: '80vh' }}>
      <h2 className="section-title">ping -c 4 parin</h2>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Get In Touch
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
            My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a 
              href="mailto:parin.arora33@gmail.com"
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                color: 'var(--accent-green)',
                background: 'transparent',
                border: '1px solid var(--accent-green)',
                borderRadius: '4px',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e: any) => {
                e.target.style.background = 'rgba(0, 255, 65, 0.1)';
                e.target.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.3)';
              }}
              onMouseLeave={(e: any) => {
                e.target.style.background = 'transparent';
                e.target.style.boxShadow = 'none';
              }}
            >
              ./send_email.sh
            </a>

            <a 
              href="/Parin_Arora_CV.pdf"
              download
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                color: 'var(--accent-cyan)',
                background: 'transparent',
                border: '1px solid var(--accent-cyan)',
                borderRadius: '4px',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e: any) => {
                e.currentTarget.style.background = 'rgba(0, 243, 255, 0.1)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 243, 255, 0.3)';
              }}
              onMouseLeave={(e: any) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Download size={20} />
              ./download_cv.sh
            </a>
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            <a href="https://github.com/parin070" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} onMouseEnter={e => (e.target as any).style.color = 'var(--accent-cyan)'} onMouseLeave={e => (e.target as any).style.color = 'var(--text-secondary)'}>GitHub</a>
            <a href="https://www.linkedin.com/in/parinarora/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} onMouseEnter={e => (e.target as any).style.color = 'var(--accent-cyan)'} onMouseLeave={e => (e.target as any).style.color = 'var(--text-secondary)'}>LinkedIn</a>
            <a href="tel:+9710502703207" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} onMouseEnter={e => (e.target as any).style.color = 'var(--accent-cyan)'} onMouseLeave={e => (e.target as any).style.color = 'var(--text-secondary)'}>Phone</a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
