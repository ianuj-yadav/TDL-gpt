import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User, LogOut, Code, Database, ShieldCheck, Cpu } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  selectedModel,
  setSelectedModel,
  user,
  onOpenAuth,
  onLogout
}) {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header
      style={{
        background: '#F7F0E6',
        borderBottom: '3px solid #1D281F',
        padding: '14px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 30,
      }}
    >
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div
          onClick={() => setActiveTab('chat')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
          }}
        >
          {/* CauseHouse Doodle Logo Mark */}
          <div
            style={{
              background: '#F3E8DD',
              border: '2px solid #1D281F',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
              boxShadow: '2px 2px 0px #1D281F',
            }}
          >
            🏡
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 900, color: '#1D281F', lineHeight: 1.0, letterSpacing: '-0.5px' }}>
              CauseHouse
            </div>
            <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#6B7A6D', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: '2px' }}>
              NONPROFIT DIGITAL STUDIO
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar Tabs */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#F3E8DD',
          padding: '6px 12px',
          borderRadius: 'var(--radius-pill)',
          border: '2px solid #1D281F',
          boxShadow: '2px 2px 0px #1D281F',
          position: 'relative',
        }}
      >
        <button
          onClick={() => setActiveTab('chat')}
          className={`nav-tab-cause ${activeTab === 'chat' ? 'active' : ''}`}
        >
          Workbench
        </button>

        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setServicesOpen(!servicesOpen)}
            className="nav-tab-cause"
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            Services {servicesOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {/* CauseHouse Featured Services Dropdown Drawer */}
          {servicesOpen && (
            <div
              className="animate-cause-pop"
              style={{
                position: 'absolute',
                top: 'calc(100% + 14px)',
                left: '-100px',
                width: '640px',
                background: '#BFEA4B',
                border: '3px solid #1D281F',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '8px 8px 0px #1D281F',
                zIndex: 100,
                display: 'grid',
                gridTemplateColumns: '1fr 1.6fr',
                gap: '20px',
              }}
            >
              <div>
                <div style={{ fontSize: '0.74rem', fontWeight: 900, uppercase: true, color: '#1D281F', letterSpacing: '1px', marginBottom: '8px' }}>
                  SERVICES
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 900, marginBottom: '14px', lineHeight: 1.1 }}>
                  View all services
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button onClick={() => { setActiveTab('chat'); setServicesOpen(false); }} style={{ background: 'none', border: 'none', textAlign: 'left', fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 900, color: '#1D281F', cursor: 'pointer' }}>
                    Web development →
                  </button>
                  <button onClick={() => { setActiveTab('ast'); setServicesOpen(false); }} style={{ background: 'none', border: 'none', textAlign: 'left', fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 900, color: '#1D281F', cursor: 'pointer' }}>
                    AST Validation →
                  </button>
                  <button onClick={() => { setActiveTab('rules'); setServicesOpen(false); }} style={{ background: 'none', border: 'none', textAlign: 'left', fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 900, color: '#1D281F', cursor: 'pointer' }}>
                    Rules Engine →
                  </button>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.74rem', fontWeight: 900, uppercase: true, color: '#1D281F', letterSpacing: '1px', marginBottom: '8px' }}>
                  FEATURED WORKFLOWS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <div style={{ background: '#F7F0E6', border: '2px solid #1D281F', borderRadius: '12px', padding: '10px', boxShadow: '2px 2px 0px #1D281F', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>💻</div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800 }}>TDL Web Design</div>
                  </div>
                  <div style={{ background: '#F7F0E6', border: '2px solid #1D281F', borderRadius: '12px', padding: '10px', boxShadow: '2px 2px 0px #1D281F', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>📊</div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800 }}>RAG Index</div>
                  </div>
                  <div style={{ background: '#F7F0E6', border: '2px solid #1D281F', borderRadius: '12px', padding: '10px', boxShadow: '2px 2px 0px #1D281F', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>⚡</div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800 }}>AST Check</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setActiveTab('ast')}
          className={`nav-tab-cause ${activeTab === 'ast' ? 'active' : ''}`}
        >
          AST Inspector
        </button>
        <button
          onClick={() => setActiveTab('rules')}
          className={`nav-tab-cause ${activeTab === 'rules' ? 'active' : ''}`}
        >
          Rules Memory
        </button>
        <button
          onClick={() => setActiveTab('kb')}
          className={`nav-tab-cause ${activeTab === 'kb' ? 'active' : ''}`}
        >
          Knowledge Base
        </button>
      </nav>

      {/* Right Controls: Model Select & Auth Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Model Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Cpu size={16} color="#1D281F" />
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            style={{
              background: '#F3E8DD',
              color: '#1D281F',
              border: '2px solid #1D281F',
              borderRadius: 'var(--radius-pill)',
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 800,
              outline: 'none',
              cursor: 'pointer',
              boxShadow: '2px 2px 0px #1D281F',
            }}
          >
            <option value="z-ai/glm-5.2">z-ai/glm-5.2 (NVIDIA NIM)</option>
            <option value="nvidia/nemotron-3-ultra-550b-a55b">nemotron-3-ultra (NVIDIA NIM)</option>
            <option value="meta/llama-3.1-70b-instruct">llama-3.1-70b (NVIDIA NIM)</option>
            <option value="meta/llama-3.3-70b-instruct">llama-3.3-70b (NVIDIA NIM)</option>
            <option value="minimaxai/minimax-m3">minimax-m3 (NVIDIA NIM)</option>
          </select>
        </div>

        {/* User Auth Pill or Work With Us Button */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                background: '#BFEA4B',
                border: '2px solid #1D281F',
                borderRadius: 'var(--radius-pill)',
                padding: '6px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '2px 2px 0px #1D281F',
                fontSize: '0.82rem',
                fontWeight: 800,
              }}
            >
              <div style={{ background: '#1D281F', color: '#BFEA4B', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem' }}>
                {user.avatar}
              </div>
              <span>{user.name}</span>
            </div>
            <button
              onClick={onLogout}
              className="btn-cause-paper"
              style={{ padding: '6px 12px', fontSize: '0.78rem' }}
              title="Sign Out"
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="btn-cause-lime"
          >
            WORK WITH US
          </button>
        )}
      </div>
    </header>
  );
}
