import React from 'react';
import { Sparkles, Zap, Calculator, Brain } from 'lucide-react';

export default function HeroBanner({ onSelectPrompt }) {
  const promptTemplates = [
    {
      icon: <Sparkles size={16} color="#38bdf8" />,
      bg: 'rgba(56, 189, 248, 0.15)',
      label: 'Generate Daily Sales Report TDL',
      prompt: 'Write a complete TDL code to create a custom Daily Sales Report with columns for Date, Party Name, Voucher Number, and Total Amount.'
    },
    {
      icon: <Zap size={16} color="#c084fc" />,
      bg: 'rgba(192, 132, 252, 0.15)',
      label: 'Add Gateway Switch & Screen',
      prompt: 'Show me how to add a custom button on the Gateway of Tally that opens a custom alteration screen.'
    },
    {
      icon: <Calculator size={16} color="#10b981" />,
      bg: 'rgba(16, 185, 129, 0.15)',
      label: 'Code GST Calculation UDF',
      prompt: 'Write a TDL User Defined Function (UDF) to calculate GST tax amount given a taxable value and tax rate percentage.'
    },
    {
      icon: <Brain size={16} color="#f43f5e" />,
      bg: 'rgba(244, 63, 94, 0.15)',
      label: 'Analyze TDL Collections & Filters',
      prompt: 'Explain TDL Collections with an example showing how to fetch and filter all Ledger Vouchers.'
    }
  ];

  return (
    <div className="animate-fade-in-up" style={{ marginBottom: '24px' }}>
      {/* Spotlight Hero Card */}
      <div
        className="glass-panel-elevated"
        style={{
          position: 'relative',
          padding: '36px 42px',
          borderRadius: 'var(--radius-xl)',
          background: `
            radial-gradient(circle at 85% 15%, rgba(56, 189, 248, 0.18), transparent 55%),
            radial-gradient(circle at 15% 85%, rgba(192, 132, 252, 0.18), transparent 55%),
            rgba(11, 17, 31, 0.85)
          `,
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.75)',
          overflow: 'hidden',
          marginBottom: '20px',
        }}
      >
        {/* Multi-Color Gradient Bar */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, height: '3px',
            background: 'linear-gradient(90deg, #38bdf8, #c084fc, #f43f5e)',
          }}
        />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)', padding: '6px 18px', borderRadius: 'var(--radius-full)', fontSize: '0.76rem', fontWeight: 800, letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '16px', boxShadow: '0 0 20px rgba(56, 189, 248, 0.25)' }}>
          <Sparkles size={14} /> TDL RAG WITH DEFINITION-AWARE RETRIEVAL & SYNTAX VALIDATION
        </div>

        <h1
          style={{
            fontSize: '2.6rem',
            fontWeight: 900,
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.5px',
            marginBottom: '12px',
            background: 'linear-gradient(135deg, #ffffff 0%, #38bdf8 35%, #c084fc 70%, #f43f5e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.15,
          }}
        >
          TDL Quantum AI Studio
        </h1>

        <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.68', maxWidth: '920px', fontWeight: 400 }}>
          Retrieval-augmented Tally Definition Language (TDL) code generation, backed by a local embedding model, a definition-boundary-chunked knowledge base, and automated AST syntax checking.
        </p>
      </div>

      {/* Quick Prompt Suggestion Chips Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '14px',
        }}
      >
        {promptTemplates.map((item, idx) => (
          <button
            key={idx}
            className="quantum-chip-button"
            onClick={() => onSelectPrompt(item.prompt)}
          >
            <span style={{ background: item.bg, padding: '8px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {item.icon}
            </span>
            <span style={{ flex: 1, lineHeight: '1.35', fontSize: '0.86rem' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
