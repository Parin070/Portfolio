import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Terminal, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const container = document.getElementById('terminal-scroll-container');
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      setScrolled(target.scrollTop > 50);
    };
    
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const navLinks = ['Home', 'WhoAmI', 'Skills', 'Projects', 'Contact'];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(5, 10, 21, 0.8)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0, 243, 255, 0.2)' : 'none',
      transition: 'all 0.3s ease',
      padding: '1rem 2rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>
        <Terminal size={24} color="var(--accent-green)" />
        <span>parin@portfolio:~$</span>
      </div>
      
      {/* Desktop Nav */}
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }} className="desktop-nav">
        {navLinks.map((item) => (
          <li key={item}>
            <Link
              activeClass="active"
              to={item.toLowerCase()}
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
              containerId="terminal-scroll-container"
              onSetActive={() => setActiveSection(item.toLowerCase())}
              style={{
                color: activeSection === item.toLowerCase() ? 'var(--accent-green)' : 'var(--text-secondary)',
                textDecoration: 'none',
                cursor: 'pointer',
                fontSize: '1.1rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e: any) => e.target.style.color = 'var(--accent-cyan)'}
              onMouseLeave={(e: any) => {
                if (activeSection !== item.toLowerCase()) {
                  e.target.style.color = 'var(--text-secondary)';
                } else {
                  e.target.style.color = 'var(--accent-green)';
                }
              }}
            >
              ./{item.toLowerCase()}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Toggle */}
      <div className="mobile-toggle" style={{ display: 'none', cursor: 'pointer', color: 'var(--accent-cyan)' }} onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
