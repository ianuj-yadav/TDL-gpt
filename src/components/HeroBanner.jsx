import React from 'react';
import { ArrowRight, Sparkles, Zap, Calculator, Brain } from 'lucide-react';

export default function HeroBanner({ onSelectPrompt, onOpenAuth }) {
  const promptTemplates = [
    {
      icon: <Sparkles size={16} color="#1D281F" />,
      label: 'Generate Daily Sales Report TDL',
      prompt: 'Write a complete TDL code to create a custom Daily Sales Report with columns for Date, Party Name, Voucher Number, and Total Amount.'
    },
    {
      icon: <Zap size={16} color="#1D281F" />,
      label: 'Add Gateway Switch & Screen',
      prompt: 'Show me how to add a custom button on the Gateway of Tally that opens a custom alteration screen.'
    },
    {
      icon: <Calculator size={16} color="#1D281F" />,
      label: 'Code GST Calculation UDF',
      prompt: 'Write a TDL User Defined Function (UDF) to calculate GST tax amount given a taxable value and tax rate percentage.'
    },
    {
      icon: <Brain size={16} color="#1D281F" />,
      label: 'Analyze TDL Collections & Filters',
      prompt: 'Explain TDL Collections with an example showing how to fetch and filter all Ledger Vouchers.'
    }
  ];

  return (
    <div className="animate-cause-pop" style={{ marginBottom: '28px' }}>
      {/* Hero Container Card with Doodle Art */}
      <div
        className="cause-card"
        style={{
          position: 'relative',
          padding: '42px 48px',
          background: '#F7F0E6',
          overflow: 'hidden',
          marginBottom: '20px',
        }}
      >
        {/* Top Eyebrow Tag */}
        <div style={{ display: 'inline-block', background: '#BFEA4B', border: '2px solid #1D281F', borderRadius: '9999px', padding: '6px 16px', fontSize: '0.76rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', boxShadow: '2px 2px 0px #1D281F' }}>
          NONPROFIT DIGITAL STUDIO & TDL AI WORKBENCH
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '30px', alignItems: 'center' }}>
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '3.1rem',
                fontWeight: 900,
                color: '#1D281F',
                lineHeight: 1.1,
                marginBottom: '16px',
                letterSpacing: '-1px',
              }}
            >
              Build the house your <span className="serif-highlight">mission</span> grows in.
            </h1>

            <p style={{ color: '#1D281F', fontSize: '1.02rem', lineHeight: '1.65', maxWidth: '640px', fontWeight: 500, marginBottom: '28px' }}>
              Websites, TDL code generation, AST syntax checking, and RAG knowledge systems — designed to work as one for growing mission-driven teams.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={onOpenAuth}
                className="btn-cause-lime"
                style={{ padding: '12px 26px', fontSize: '0.88rem' }}
              >
                WORK WITH US <ArrowRight size={16} />
              </button>
              <button
                onClick={() => onSelectPrompt('Explain TDL Report definition structure')}
                className="btn-cause-paper"
                style={{ padding: '12px 26px', fontSize: '0.88rem' }}
              >
                EXPLORE SERVICES
              </button>
            </div>
          </div>

          {/* Retro Doodle Artwork (House, Hill, Chicken motif from input_file_0.png) */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg viewBox="0 0 320 240" style={{ width: '100%', maxHeight: '220px' }}>
              {/* Clouds */}
              <path d="M 40 40 Q 50 25 65 35 Q 80 20 95 35 Q 110 30 115 45 Z" fill="#ffffff" stroke="#1D281F" strokeWidth="3" />
              <path d="M 210 30 Q 220 15 235 25 Q 250 10 265 25 Q 280 20 285 35 Z" fill="#ffffff" stroke="#1D281F" strokeWidth="3" />
              
              {/* Hill */}
              <path d="M 30 220 Q 160 110 300 220 Z" fill="#BFEA4B" stroke="#1D281F" strokeWidth="4" />

              {/* Doodle House */}
              <g transform="translate(140, 100)">
                {/* Roof */}
                <polygon points="30,0 0,35 60,35" fill="#34d399" stroke="#1D281F" strokeWidth="3.5" strokeLinejoin="round" />
                {/* Body */}
                <rect x="8" y="35" width="44" height="40" fill="#ffffff" stroke="#1D281F" strokeWidth="3.5" />
                {/* Door */}
                <rect x="16" y="52" width="12" height="23" fill="#BFEA4B" stroke="#1D281F" strokeWidth="2.5" />
                {/* Window */}
                <rect x="34" y="44" width="12" height="12" fill="#F7F0E6" stroke="#1D281F" strokeWidth="2.5" />
              </g>

              {/* Tree */}
              <g transform="translate(210, 115)">
                <rect x="12" y="30" width="8" height="30" fill="#C53A20" stroke="#1D281F" strokeWidth="3" />
                <circle cx="16" cy="20" r="18" fill="#34d399" stroke="#1D281F" strokeWidth="3" />
              </g>

              {/* Chicken Motif */}
              <g transform="translate(100, 170)">
                <ellipse cx="15" cy="15" rx="12" ry="10" fill="#ffffff" stroke="#1D281F" strokeWidth="3" />
                <path d="M 12 5 Q 15 0 18 5" fill="#C53A20" stroke="#1D281F" strokeWidth="2" />
                <polygon points="27,15 32,13 27,18" fill="#C53A20" stroke="#1D281F" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Quick Prompt Chips in Retro CauseHouse Card Style */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px',
        }}
      >
        {promptTemplates.map((item, idx) => (
          <button
            key={idx}
            className="cause-card cause-card-interactive"
            onClick={() => onSelectPrompt(item.prompt)}
            style={{
              padding: '14px 18px',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              background: '#F3E8DD',
            }}
          >
            <span style={{ background: '#BFEA4B', border: '2px solid #1D281F', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {item.icon}
            </span>
            <span style={{ flex: 1, lineHeight: '1.35', fontSize: '0.85rem', fontWeight: 800, color: '#1D281F' }}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
