
import { motion } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const projects = [
  {
    title: 'cowrie-wazuh-homelab',
    desc: 'SSH honeypot deployed on Ubuntu Server VM, integrated with Wazuh SIEM, custom detection rules, full attack-defend pipeline.',
    tech: ['Wazuh', 'Cowrie', 'Ubuntu Server', 'SIEM'],
    github: 'https://github.com/parin070',
    permissions: '-rw-r--r--'
  },
  {
    title: 'python-security-scripts',
    desc: 'Caesar cipher, password checker, port scanner, file type identifier, DDoS simulator (155k+ pkt/min), encrypter. All with READMEs.',
    tech: ['Python', 'Wireshark', 'Networking'],
    github: 'https://github.com/parin070',
    permissions: '-rwxr-xr-x'
  },
  {
    title: 'vault',
    desc: 'Personal writeup site. CTF writeups, SBT lab docs, Cowrie honeypot lab documentation.',
    tech: ['HTML/CSS', 'GitHub Pages', 'Markdown'],
    link: 'https://parin070.github.io/Write-Ups/',
    permissions: 'drwxr-xr-x'
  }
];

const Projects = () => {
  return (
    <section id="projects" className="section-container">
      <h2 className="section-title"><span style={{ color: 'var(--accent-green)', marginRight: '0.8rem', fontFamily: 'var(--font-mono)', fontSize: '1.5rem' }}>parin@root:~$</span> cat ./projects.json</h2>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              style={{ position: 'relative' }}
            >
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.15}
                glareColor="var(--accent-cyan)"
                glarePosition="all"
                tiltMaxAngleX={5}
                tiltMaxAngleY={2}
                scale={1.02}
              >
                <div className="glass-panel" style={{ overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div>
                      <span style={{ color: 'var(--accent-purple)', fontSize: '1rem', marginRight: '1rem' }}>{project.permissions}</span>
                      <h3 style={{ display: 'inline-block', color: 'var(--text-primary)', fontSize: '1.8rem' }}>{project.title}</h3>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
                          <Code size={24} className="hover:text-accent-cyan transition-colors" />
                        </a>
                      )}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
                          <ExternalLink size={24} className="hover:text-accent-cyan transition-colors" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem', maxWidth: '800px' }}>
                    {project.desc}
                  </p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                    {project.tech.map(t => (
                      <span key={t} style={{ fontSize: '0.9rem', padding: '0.3rem 0.8rem', borderRadius: '4px', background: 'rgba(0, 243, 255, 0.1)', color: 'var(--accent-cyan)', border: '1px solid rgba(0, 243, 255, 0.2)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
