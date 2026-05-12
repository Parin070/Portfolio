import { motion } from 'framer-motion';

const WhoAmI = () => {
  return (
    <section id="whoami" className="section-container">
      <h2 className="section-title">neofetch</h2>
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        
        <div className="glass-panel" style={{ position: 'relative', padding: '0' }}>
          {/* Terminal Window Decoration */}
          <div style={{ padding: '1rem', background: 'rgba(0, 0, 0, 0.5)', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(0, 243, 255, 0.1)' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
            <span style={{ marginLeft: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>parin@bits-dubai:~</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(150px, 1fr) 2fr', gap: '3rem', padding: '3rem', alignItems: 'center' }}>
            {/* Avatar Column */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img 
                src="/avatar.png" 
                alt="Parin Avatar" 
                style={{ 
                  width: '100%', 
                  maxWidth: '250px',
                  borderRadius: '10px', 
                  border: '2px solid var(--accent-cyan)',
                  filter: 'grayscale(50%)',
                  boxShadow: '0 0 30px rgba(0, 243, 255, 0.2)'
                }} 
              />
            </div>

            {/* Stats Column */}
            <div style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', marginBottom: '0.8rem' }}>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>name</span>
                <span>Parin Arora</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', marginBottom: '0.8rem' }}>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>university</span>
                <span>BITS Pilani Dubai Campus</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', marginBottom: '0.8rem' }}>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>degree</span>
                <span>B.E. Computer Science | Class of 2028</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', marginBottom: '0.8rem' }}>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>cgpa</span>
                <span>9.46</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', marginBottom: '0.8rem' }}>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>role</span>
                <span>Technical Executive @ Linux User Group (LUG)</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', marginBottom: '0.8rem' }}>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>certs</span>
                <span>Google Cybersecurity Certificate</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', marginBottom: '0.8rem' }}>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>ctf</span>
                <span>HTB, THM, Exploit3rs, picoCTF</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', marginBottom: '0.8rem', borderTop: '1px dashed var(--text-secondary)', paddingTop: '0.8rem' }}>
                <span style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>focus</span>
                <span style={{ color: 'var(--accent-green)' }}>Blue Team | SOC | DFIR | Threat Hunting</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          #whoami .glass-panel > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhoAmI;
