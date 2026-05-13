import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, X } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const projects = [
  {
    title: 'Cowrie SSH Honeypot Lab',
    shortDesc: 'SSH honeypot deployed on Ubuntu Server VM, integrated with Wazuh SIEM.',
    longDesc: 'A full attack-defend pipeline built by deploying a Cowrie SSH honeypot on an Ubuntu Server virtual machine. The honeypot logs attack data, which is securely forwarded to a Wazuh SIEM instance using custom Filebeat configurations. I wrote custom Wazuh decoders and rules to accurately detect, alert, and analyze the attacks originating from malicious actors.',
    tech: ['Wazuh', 'Cowrie', 'Ubuntu Server', 'SIEM', 'Bash'],
    github: 'https://github.com/parin070/Cowrie-Honeypot-Lab',
    permissions: '-rw-r--r--'
  },
  {
    title: 'Security Toolkit',
    shortDesc: 'Collection of basic networking and cryptography Python tools.',
    longDesc: 'A toolkit of custom Python scripts designed to build strong foundations in programming and cybersecurity. This includes a Caesar cipher tool for basic cryptography, an offline password strength checker, a multi-threaded port scanner for network enumeration, a magic-number file type identifier, a DDoS simulator capable of 155k+ packets/min, and an AES encrypter. Everything is thoroughly documented.',
    tech: ['Python', 'Wireshark', 'Networking', 'Cryptography', 'Sockets'],
    github: 'https://github.com/parin070/Basic-Scripts',
    permissions: '-rwxr-xr-x'
  },
  {
    title: 'Cybersecurity Writeups',
    shortDesc: 'Personal repository for detailed cybersecurity lab write-ups.',
    longDesc: 'The Vault is my personal write-up site built from scratch to document my journey in cybersecurity. It hosts detailed walkthroughs and documentation for HackTheBox machines, Security Blue Team (SBT) labs, OverTheWire Bandit challenges, and my own home-lab implementations. The site is built with pure HTML/CSS and is hosted statically on GitHub Pages.',
    tech: ['HTML/CSS', 'GitHub Pages', 'Markdown', 'Digital Forensics', 'OSINT'],
    link: 'https://parin070.github.io/Write-Ups/',
    permissions: 'drwxr-xr-x'
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Stop background scrolling when modal is open
  if (selectedProject) {
    const container = document.getElementById('terminal-scroll-container');
    if (container) container.style.overflow = 'hidden';
  } else {
    const container = document.getElementById('terminal-scroll-container');
    if (container) container.style.overflow = 'auto';
  }

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
              onClick={() => setSelectedProject(project)}
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
                <div className="glass-panel" style={{ overflow: 'hidden', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div>
                      <span style={{ color: 'var(--accent-purple)', fontSize: '1rem', marginRight: '1rem' }}>{project.permissions}</span>
                      <h3 style={{ display: 'inline-block', color: 'var(--text-primary)', fontSize: '1.8rem' }}>{project.title}</h3>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: 'var(--text-secondary)' }}>
                          <Code size={24} className="hover:text-accent-cyan transition-colors" />
                        </a>
                      )}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: 'var(--text-secondary)' }}>
                          <ExternalLink size={24} className="hover:text-accent-cyan transition-colors" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem', maxWidth: '800px' }}>
                    {project.shortDesc} <span style={{ color: 'var(--accent-green)' }}>[Click to view details]</span>
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

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel"
              style={{
                maxWidth: '800px',
                width: '100%',
                background: 'rgba(5, 10, 21, 0.95)',
                border: '1px solid var(--accent-cyan)',
                boxShadow: '0 0 50px rgba(0, 243, 255, 0.2)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>{selectedProject.title}</h3>
                <button 
                  onClick={() => setSelectedProject(null)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--accent-green)', cursor: 'pointer' }}
                >
                  <X size={32} />
                </button>
              </div>

              <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.5)', borderRadius: '8px', marginBottom: '2rem', border: '1px solid var(--card-border)' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.8' }}>
                  {selectedProject.longDesc}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '3rem' }}>
                {selectedProject.tech.map((t: string) => (
                  <span key={t} style={{ fontSize: '1rem', padding: '0.4rem 1rem', borderRadius: '4px', background: 'rgba(0, 243, 255, 0.1)', color: 'var(--accent-cyan)', border: '1px solid rgba(0, 243, 255, 0.2)' }}>
                    {t}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1.5rem' }}>
                {selectedProject.github && (
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.8rem 1.5rem', background: 'var(--accent-green)', color: '#000',
                      textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold'
                    }}
                  >
                    <Code size={20} /> View Source
                  </a>
                )}
                {selectedProject.link && (
                  <a 
                    href={selectedProject.link} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.8rem 1.5rem', background: 'transparent', color: 'var(--accent-cyan)',
                      border: '1px solid var(--accent-cyan)', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold'
                    }}
                  >
                    <ExternalLink size={20} /> Open Vault
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
