import React from 'react';
import { Cpu, Terminal, ShieldCheck, Database, BookOpen, Menu, Sparkles } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  selectedModel,
  setSelectedModel,
  onToggleMobileSidebar
}) {
  return (
    <header
      style={{
        background: 'rgba(11, 17, 31, 0.85)',
        backdropFilter: 'blur(32px) saturate(200%)',
        WebkitBackdropFilter: 'blur(32px) saturate(200%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.14)',
        padding: '14px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.65)',
        position: 'relative',
        zIndex: 20,
      }}
    >
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="btn-cta-secondary"
            style={{ padding: '8px 12px' }}
            title="Toggle Sidebar"
          >
            <Menu size={18} />
          </button>
        )}

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, letterSpacing: '1px', color: '#ffffff', display: 'flex', alignItems: 'center', fontFamily: 'var(--font-display)', lineHeight: 1.1 }}>
            <span style={{ background: 'linear-gradient(135deg, #ffffff 0%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>TDL QUANTUM</span>
            <span style={{ color: '#c084fc', border: '3px solid #c084fc', borderRadius: '50%', display: 'inline-block', width: '22px', height: '22px', lineHeight: '16px', textAlign: 'center', fontSize: '1rem', margin: '0 6px', boxShadow: '0 0 16px rgba(192, 132, 252, 0.9)', fontWeight: 900 }}>AI</span>
          </div>
          <div style={{ fontSize: '0.66rem', color: '#38bdf8', letterSpacing: '4px', fontWeight: 800, textTransform: 'uppercase', marginTop: '2px' }}>
            ENTERPRISE TDL STUDIO
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav
        style={{
          display: 'flex',
          gap: '8px',
          background: 'rgba(2, 4, 9, 0.75)',
          padding: '6px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(255, 255, 255, 0.10)',
        }}
      >
        <button
          onClick={() => setActiveTab('chat')}
          className={`nav-tab-pill ${activeTab === 'chat' ? 'active' : ''}`}
        >
          <Terminal size={15} /> Chat Workbench
        </button>
        <button
          onClick={() => setActiveTab('ast')}
          className={`nav-tab-pill ${activeTab === 'ast' ? 'active' : ''}`}
        >
          <ShieldCheck size={15} /> AST Inspector
        </button>
        <button
          onClick={() => setActiveTab('rules')}
          className={`nav-tab-pill ${activeTab === 'rules' ? 'active' : ''}`}
        >
          <BookOpen size={15} /> Rules Memory
        </button>
        <button
          onClick={() => setActiveTab('kb')}
          className={`nav-tab-pill ${activeTab === 'kb' ? 'active' : ''}`}
        >
          <Database size={15} /> Knowledge Base
        </button>
      </nav>

      {/* Right: Quantum Status Pill + Model Select */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.9)',
            color: '#38bdf8',
            padding: '7px 20px',
            borderRadius: 'var(--radius-full)',
            fontWeight: 800,
            fontSize: '0.8rem',
            boxShadow: 'inset 0 0 14px rgba(56, 189, 248, 0.2), 0 4px 18px rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            border: '1px solid rgba(56, 189, 248, 0.45)',
            letterSpacing: '0.6px',
            fontFamily: 'var(--font-display)',
          }}
        >
          <span
            style={{
              width: '9px',
              height: '9px',
              background: '#10b981',
              borderRadius: '50%',
              animation: 'pulseDot 2s infinite',
            }}
          />
          NEURAL AI STUDIO v4.1 ACTIVE
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={16} color="#38bdf8" />
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            style={{
              background: 'rgba(15, 23, 42, 0.95)',
              color: '#ffffff',
              border: '1px solid rgba(56, 189, 248, 0.45)',
              borderRadius: 'var(--radius-md)',
              padding: '0.48rem 0.9rem',
              fontSize: '0.82rem',
              fontWeight: 700,
              fontFamily: 'var(--font-sans)',
              outline: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
            }}
          >
            <option value="z-ai/glm-5.2">z-ai/glm-5.2 (NVIDIA NIM)</option>
            <option value="nvidia/nemotron-3-ultra-550b-a55b">nemotron-3-ultra (NVIDIA NIM)</option>
            <option value="meta/llama-3.1-70b-instruct">llama-3.1-70b (NVIDIA NIM)</option>
            <option value="meta/llama-3.3-70b-instruct">llama-3.3-70b (NVIDIA NIM)</option>
            <option value="minimaxai/minimax-m3">minimax-m3 (NVIDIA NIM)</option>
          </select>
        </div>
      </div>
    </header>
  );
}
