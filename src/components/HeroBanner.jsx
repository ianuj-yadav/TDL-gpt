import React from 'react';
import { Sparkles, Zap, Calculator, Brain } from 'lucide-react';

export default function HeroBanner({ onSelectPrompt }) {
  const promptTemplates = [
    {
      icon: <Sparkles size={16} color="#38bdf8" />,
      label: 'Generate Daily Sales Report TDL',
      prompt: 'Write a complete TDL code to create a custom Daily Sales Report with columns for Date, Party Name, Voucher Number, and Total Amount.'
    },
    {
      icon: <Zap size={16} color="#38bdf8" />,
      label: 'Add Gateway Switch & Screen',
      prompt: 'Show me how to add a custom button on the Gateway of Tally that opens a custom alteration screen.'
    },
    {
      icon: <Calculator size={16} color="#34d399" />,
      label: 'Code GST Calculation UDF',
      prompt: 'Write a TDL User Defined Function (UDF) to calculate GST tax amount given a taxable value and tax rate percentage.'
    },
    {
      icon: <Brain size={16} color="#fbbf24" />,
      label: 'Analyze TDL Collections & Filters',
      prompt: 'Explain TDL Collections with an example showing how to fetch and filter all Ledger Vouchers.'
    }
  ];

  return (
    <div className="animate-fade-in-up" style={{ marginBottom: '24px' }}>
      {/* Clean Technical Hero Header Card */}
      <div
        className="glass-panel-elevated"
        style={{
          position: 'relative',
          padding: '28px 36px',
          borderRadius: 'var(--radius-xl)',
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid var(--border-medium)',
          overflow: 'hidden',
          marginBottom: '18px',
        }}
      >
        <h1
          style={{
            fontSize: '2.2rem',
            fontWeight: 800,
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.5px',
            marginBottom: '8px',
            color: '#ffffff',
            lineHeight: 1.15,
          }}
        >
          TDL Quantum AI Studio
        </h1>

        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.94rem', lineHeight: '1.6', maxWidth: '820px' }}>
          Tally Definition Language (TDL) engineering workbench with RAG context retrieval, definition boundary chunking, and automated AST syntax checking.
        </p>
      </div>

      {/* Quick Action Chips Grid */}
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
            className="quantum-chip-button"
            onClick={() => onSelectPrompt(item.prompt)}
          >
            <span style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '8px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {item.icon}
            </span>
            <span style={{ flex: 1, lineHeight: '1.35', fontSize: '0.84rem' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
