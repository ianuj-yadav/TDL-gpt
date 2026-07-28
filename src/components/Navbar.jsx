import React from 'react';
import { Cpu, Terminal, ShieldCheck, Database, BookOpen, Menu } from 'lucide-react';

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
        background: 'rgba(11, 17, 31, 0.90)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '12px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
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
          <div style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '0.5px', color: '#ffffff', display: 'flex', alignItems: 'center', fontFamily: 'var(--font-display)', lineHeight: 1.1 }}>
            <span>TDL QUANTUM</span>
            <span style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: 800, background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '2px 8px', borderRadius: 'var(--radius-sm)', marginLeft: '8px' }}>
              AI
            </span>
          </div>
          <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', marginTop: '2px' }}>
            ENTERPRISE TDL STUDIO
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav
        style={{
          display: 'flex',
          gap: '6px',
          background: 'rgba(2, 4, 9, 0.8)',
          padding: '4px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <button
          onClick={() => setActiveTab('chat')}
          className={`nav-tab-pill ${activeTab === 'chat' ? 'active' : ''}`}
        >
          <Terminal size={15} /> Workbench
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

      {/* Right: Engine Status Pill + Model Select */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.9)',
            color: 'var(--color-text-secondary)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            fontWeight: 600,
            fontSize: '0.78rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid var(--border-subtle)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              background: '#34d399',
              borderRadius: '50%',
              animation: 'pulseDot 2s infinite',
            }}
          />
          Engine v2.0 Active
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={16} color="#38bdf8" />
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            style={{
              background: 'rgba(15, 23, 42, 0.95)',
              color: '#ffffff',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              padding: '0.45rem 0.85rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              outline: 'none',
              cursor: 'pointer',
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
