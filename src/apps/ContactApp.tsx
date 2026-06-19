import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { contact } from '../data/portfolio';

/* ─── Inline SVG brand icons ─── */
const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactApp = () => {
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', contact.web3formsKey);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const isDisabled = status === 'submitting';

  /* ─── Button label by status ─── */
  const buttonContent = (() => {
    switch (status) {
      case 'idle':
        return (
          <>
            <Send size={18} /> Send Payload
          </>
        );
      case 'submitting':
        return 'Encrypting & Transmitting…';
      case 'success':
        return (
          <>
            <CheckCircle size={18} /> Transmission Successful
          </>
        );
      case 'error':
        return (
          <>
            <AlertTriangle size={18} /> Connection Failed
          </>
        );
    }
  })();

  const buttonBorder =
    status === 'success'
      ? 'var(--accent-green)'
      : status === 'error'
        ? 'var(--accent-red)'
        : 'var(--accent-cyan)';

  const buttonColor =
    status === 'success'
      ? 'var(--accent-green)'
      : status === 'error'
        ? 'var(--accent-red)'
        : 'var(--accent-cyan)';

  const buttonBg =
    status === 'success'
      ? 'rgba(0, 255, 65, 0.12)'
      : status === 'error'
        ? 'rgba(255, 95, 86, 0.12)'
        : 'rgba(0, 243, 255, 0.08)';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}
      >
        {/* ──── Left Column: Contact Form ──── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel"
          style={{ padding: '1.75rem' }}
        >
          <h3
            style={{
              color: 'var(--text-primary)',
              fontSize: '1.25rem',
              marginBottom: '1.25rem',
            }}
          >
            Initiate Secure Transmission
          </h3>

          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="terminal-input"
              disabled={isDisabled}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="terminal-input"
              disabled={isDisabled}
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              className="terminal-input"
              disabled={isDisabled}
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={5}
              required
              className="terminal-input"
              style={{ resize: 'vertical' }}
              disabled={isDisabled}
            />

            <button
              type="submit"
              disabled={isDisabled}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                padding: '0.85rem 1rem',
                background: buttonBg,
                border: `1px solid ${buttonBorder}`,
                color: buttonColor,
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.95rem',
                marginTop: '0.25rem',
                transition: 'all 0.3s ease',
              }}
            >
              {buttonContent}
            </button>
          </form>
        </motion.div>

        {/* ──── Right Column: Social Info Boxes ──── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          {/* GitHub */}
          <motion.a
            href={contact.github.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel"
            style={{
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              textDecoration: 'none',
              transition: 'border-color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '';
            }}
          >
            <div
              style={{
                padding: '0.85rem',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <GithubIcon size={28} />
            </div>
            <div>
              <h4
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                }}
              >
                GitHub
              </h4>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  marginTop: '0.15rem',
                }}
              >
                View Repositories
              </p>
            </div>
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            href={contact.linkedin.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel"
            style={{
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              textDecoration: 'none',
              transition: 'border-color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                'rgba(0, 119, 181, 0.4)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '';
            }}
          >
            <div
              style={{
                padding: '0.85rem',
                background: 'rgba(0, 119, 181, 0.15)',
                borderRadius: '8px',
                color: '#0077b5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LinkedinIcon size={28} />
            </div>
            <div>
              <h4
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                }}
              >
                LinkedIn
              </h4>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  marginTop: '0.15rem',
                }}
              >
                Connect Professionally
              </p>
            </div>
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default ContactApp;
