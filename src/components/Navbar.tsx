import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Terminal, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      <div style={{ display: 'flex', gap: '2rem' }} className="desktop-nav">
        {navLinks.map((item) => (
          <Link
            key={item}
            to={item.toLowerCase()}
            smooth={true}
            duration={500}
            style={{ cursor: 'pointer', color: 'var(--text-secondary)', transition: 'color 0.2s' }}
            activeStyle={{ color: 'var(--accent-green)' }}
            spy={true}
            onMouseEnter={(e: any) => e.target.style.color = 'var(--accent-cyan)'}
            onMouseLeave={(e: any) => e.target.style.color = 'var(--text-secondary)'}
          >
            --{item.toLowerCase()}
          </Link>
        ))}
      </div>

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
