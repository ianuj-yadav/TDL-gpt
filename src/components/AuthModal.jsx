import React, { useState } from 'react';
import { X, Lock, Mail, User, ArrowRight, CheckCircle2, Shield } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    if (mode === 'register' && !fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const userObj = {
        name: mode === 'register' ? fullName.trim() : email.split('@')[0],
        email: email.trim(),
        avatar: mode === 'register' ? fullName[0].toUpperCase() : email[0].toUpperCase(),
      };
      localStorage.setItem('causehouse_user', JSON.stringify(userObj));
      onAuthSuccess(userObj);
      onClose();
    }, 600);
  };

  const handleSocialLogin = (provider) => {
    const userObj = {
      name: `${provider} Developer`,
      email: `dev@${provider.toLowerCase()}.com`,
      avatar: provider[0],
    };
    localStorage.setItem('causehouse_user', JSON.stringify(userObj));
    onAuthSuccess(userObj);
    onClose();
  };

  return (
    <div className="cause-modal-backdrop" onClick={onClose}>
      <div
        className="animate-cause-pop"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '920px',
          background: '#F7F0E6',
          border: '3px solid #1D281F',
          borderRadius: '24px',
          boxShadow: '8px 8px 0px #1D281F',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: '#BFEA4B',
            border: '2px solid #1D281F',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '2px 2px 0px #1D281F',
            zIndex: 10,
          }}
        >
          <X size={20} color="#1D281F" />
        </button>

        {/* Left Form Column */}
        <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          {/* Logo Mark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <div style={{ background: '#BFEA4B', border: '2px solid #1D281F', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
              🏠
            </div>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 900 }}>
              CauseHouse
            </span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 900, marginBottom: '6px', lineHeight: 1.1 }}>
            {mode === 'login' ? 'Get started!' : 'Join CauseHouse!'}
          </h2>
          <p style={{ color: '#6B7A6D', fontSize: '0.9rem', marginBottom: '24px', fontWeight: 600 }}>
            {mode === 'login' ? (
              <>
                New to CauseHouse?{' '}
                <button
                  onClick={() => setMode('register')}
                  style={{ background: 'none', border: 'none', color: '#1D281F', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Create Account
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setMode('login')}
                  style={{ background: 'none', border: 'none', color: '#1D281F', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Sign In
                </button>
              </>
            )}
          </p>

          {error && (
            <div style={{ background: '#C53A20', color: '#ffffff', border: '2px solid #1D281F', borderRadius: '10px', padding: '10px 14px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '16px', boxShadow: '2px 2px 0px #1D281F' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {mode === 'register' && (
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 800, uppercase: true, color: '#1D281F', marginBottom: '4px', display: 'block' }}>
                  FULL NAME
                </label>
                <input
                  type="text"
                  className="cause-input"
                  placeholder="e.g. Anuj Yadav"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 800, uppercase: true, color: '#1D281F', marginBottom: '4px', display: 'block' }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                className="cause-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 800, uppercase: true, color: '#1D281F', marginBottom: '4px', display: 'block' }}>
                PASSWORD
              </label>
              <input
                type="password"
                className="cause-input"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn-cause-ink"
              disabled={loading}
              style={{ width: '100%', padding: '14px', marginTop: '6px', fontSize: '0.9rem' }}
            >
              {loading ? (
                'Authenticating...'
              ) : mode === 'login' ? (
                <>Log in <ArrowRight size={16} /></>
              ) : (
                <>Create Account <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0', color: '#6B7A6D', fontSize: '0.8rem', fontWeight: 700 }}>
            <div style={{ flex: 1, height: '2px', background: '#1D281F' }} />
            <span>OR</span>
            <div style={{ flex: 1, height: '2px', background: '#1D281F' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="btn-cause-paper"
              style={{ width: '100%', padding: '10px', fontSize: '0.82rem', justifyContent: 'center' }}
            >
              🌐 Continue with Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('GitHub')}
              className="btn-cause-paper"
              style={{ width: '100%', padding: '10px', fontSize: '0.82rem', justifyContent: 'center' }}
            >
              🐙 Continue with GitHub
            </button>
          </div>
        </div>

        {/* Right Artwork Banner Column */}
        <div
          style={{
            background: '#BFEA4B',
            borderLeft: '3px solid #1D281F',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            minHeight: '400px',
          }}
        >
          <div style={{ background: '#1D281F', color: '#BFEA4B', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.76rem', fontWeight: 800, width: 'fit-content', boxShadow: '2px 2px 0px #1D281F' }}>
            <Shield size={14} /> SECURE AGENTIC PLATFORM
          </div>

          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 900, color: '#1D281F', lineHeight: 1.1, marginBottom: '14px' }}>
              More Than Just A Creative Workbench.
            </h3>
            <p style={{ color: '#1D281F', fontSize: '0.94rem', fontWeight: 600, lineHeight: 1.5, maxWidth: '340px' }}>
              Build the house your mission grows in with TDL definition boundary retrieval and automated AST syntax checking.
            </p>
          </div>

          <div style={{ background: '#F7F0E6', border: '2px solid #1D281F', borderRadius: '16px', padding: '14px', boxShadow: '4px 4px 0px #1D281F', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#BFEA4B', border: '2px solid #1D281F', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
              🏡
            </div>
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#1D281F' }}>Clarity beats volume.</div>
              <div style={{ fontSize: '0.74rem', color: '#6B7A6D', fontWeight: 600 }}>Systems that hold. Work that shows.</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
