import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertTriangle } from 'lucide-react';

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Web3Forms requires the access key to be appended to the form data
    formData.append("access_key", "3e12c568-d853-4842-aba0-eb6328f9975d");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        form.reset();
        // Reset back to idle after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="section-container" style={{ paddingBottom: '100px' }}>
      <h2 className="section-title"><span style={{ color: 'var(--accent-green)', marginRight: '0.8rem', fontFamily: 'var(--font-mono)', fontSize: '1.5rem' }}>parin@root:~$</span> ./contact.sh</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '3rem',
        marginTop: '2rem'
      }}>
        
        {/* Left Column: Web3Forms Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel"
          style={{ padding: '2rem', position: 'relative' }}
        >
          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Initiate Secure Transmission</h3>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <input 
              type="text" 
              name="name" 
              placeholder="Name" 
              required 
              className="terminal-input"
              disabled={status === 'submitting'}
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Valid Email ID" 
              required 
              className="terminal-input"
              disabled={status === 'submitting'}
            />
            <input 
              type="text" 
              name="subject" 
              placeholder="Subject" 
              required 
              className="terminal-input"
              disabled={status === 'submitting'}
            />
            <textarea 
              name="message" 
              placeholder="Message Body" 
              rows={5} 
              required 
              className="terminal-input"
              style={{ resize: 'vertical' }}
              disabled={status === 'submitting'}
            />
            
            <button 
              type="submit" 
              className="btn"
              disabled={status === 'submitting'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.8rem',
                padding: '1rem',
                background: status === 'success' ? 'rgba(0, 255, 65, 0.2)' : 'rgba(0, 243, 255, 0.1)',
                border: `1px solid ${status === 'success' ? 'var(--accent-green)' : 'var(--accent-cyan)'}`,
                color: status === 'success' ? 'var(--accent-green)' : 'var(--accent-cyan)',
                borderRadius: '4px',
                fontSize: '1.1rem',
                cursor: status === 'submitting' ? 'wait' : 'pointer',
                transition: 'all 0.3s ease',
                marginTop: '0.5rem',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {status === 'idle' && <><Send size={20} /> Send Payload</>}
              {status === 'submitting' && 'Encrypting & Transmitting...'}
              {status === 'success' && <><CheckCircle size={20} /> Transmission Successful</>}
              {status === 'error' && <><AlertTriangle size={20} /> Connection Failed</>}
            </button>
          </form>
        </motion.div>

        {/* Right Column: Info Boxes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <motion.a
            href="https://github.com/Parin070"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel"
            style={{ 
              padding: '1.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1.5rem', 
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: 'var(--text-primary)' }}>
              <GithubIcon size={32} />
            </div>
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 'bold' }}>GitHub</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>View Repositories</p>
            </div>
          </motion.a>

          <motion.a
            href="https://linkedin.com/in/parinarora"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel"
            style={{ 
              padding: '1.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1.5rem', 
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            <div style={{ padding: '1rem', background: 'rgba(0, 119, 181, 0.2)', borderRadius: '8px', color: '#0077b5' }}>
              <LinkedinIcon size={32} />
            </div>
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 'bold' }}>LinkedIn</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>Connect Professionally</p>
            </div>
          </motion.a>

        </div>
      </div>
    </section>
  );
};

export default Contact;
