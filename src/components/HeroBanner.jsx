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
      {/* Hero Container Card */}
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
          TDL CODE GENERATION & SYNTAX VALIDATION ENGINE
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
              Build the code your <span className="serif-highlight">customization</span> grows in.
            </h1>

            <p style={{ color: '#1D281F', fontSize: '1.02rem', lineHeight: '1.65', maxWidth: '640px', fontWeight: 500, marginBottom: '28px' }}>
              Syntactically valid Tally Definition Language (TDL) code generation, backed by a local embedding model, definition boundary chunking, and automated AST syntax checking.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={onOpenAuth}
                className="btn-cause-lime"
                style={{ padding: '12px 26px', fontSize: '0.88rem' }}
              >
                SIGN UP / LOG IN <ArrowRight size={16} />
              </button>
              <button
                onClick={() => onSelectPrompt('Explain TDL Report definition structure')}
                className="btn-cause-paper"
                style={{ padding: '12px 26px', fontSize: '0.88rem' }}
              >
                EXPLORE MODULES
              </button>
            </div>
          </div>

          {/* Technical Neobrutalist TDL Artwork Motif */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '300px', background: '#BFEA4B', border: '3px solid #1D281F', borderRadius: '20px', padding: '20px', boxShadow: '6px 6px 0px #1D281F' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '2px solid #1D281F', paddingBottom: '8px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 900, color: '#1D281F' }}>[Report: CustomSales]</span>
                <span className="badge-cause-pass">PASS</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#1D281F', lineHeight: '1.7', fontWeight: 700 }}>
                <div>Form : CustomSalesForm</div>
                <div>Title : "Daily Sales Summary"</div>
                <div>Print : Yes</div>
                <div style={{ marginTop: '8px', color: '#C53A20' }}>[Form: CustomSalesForm]</div>
                <div>Parts : SalesTitlePart, SalesBodyPart</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Prompt Chips */}
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
