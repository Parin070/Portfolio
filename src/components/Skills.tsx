
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const skillsData = [
  { category: 'languages', items: ['Python', 'Java', 'C/C++', 'Bash'], color: '#ff5f56' },
  { category: 'tools', items: ['Wazuh', 'Wireshark', 'Nmap', 'Git', 'MySQL'], color: '#ffbd2e' },
  { category: 'concepts', items: ['Network Analysis', 'Log Analysis', 'OSINT', 'Incident Analysis', 'DFIR'], color: '#27c93f' },
  { category: 'os_db', items: ['Linux', 'Windows'], color: 'var(--accent-cyan)' },
  { category: 'labs', items: ['Cowrie Honeypot', 'Kali Linux'], color: 'var(--accent-purple)' },
];

const Skills = () => {
  return (
    <section id="skills" className="section-container">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">ls -l ./skills</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              style={{ cursor: 'pointer' }}
            >
              <Tilt 
                glareEnable={true} 
                glareMaxOpacity={0.3} 
                glareColor={skill.color} 
                glarePosition="all" 
                scale={1.05}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
              >
                <div className="glass-panel" style={{ height: '100%' }}>
                  <h3 style={{ color: skill.color, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.4rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>📁</span> {skill.category}/
                  </h3>
                  <ul style={{ listStyleType: 'none', fontSize: '1.1rem' }}>
                    {skill.items.map(item => (
                      <li key={item} style={{ marginBottom: '0.8rem', color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--accent-green)', marginRight: '0.8rem' }}>├─</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
