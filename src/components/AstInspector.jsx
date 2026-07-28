import React, { useState } from 'react';
import { ShieldCheck, Play, AlertCircle, CheckCircle2, Code } from 'lucide-react';

export default function AstInspector() {
  const [code, setCode] = useState(`[Report: CustomSalesReport]
  Form: CustomSalesForm

[Form: CustomSalesForm]
  Part: CustomSalesPart

[Part: CustomSalesPart]
  Line: CustomSalesLine

[Line: CustomSalesLine]
  Field: CustomSalesField

[Field: CustomSalesField]
  Set as: "Standard TDL Enterprise Field"
  Width: 20`);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleValidate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setAnalysis(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ flex: 1, padding: '28px 36px', overflowY: 'auto', background: 'transparent' }}>
      <div style={{ maxWidth: '1050px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-display)' }}>
              <ShieldCheck color="#10b981" size={28} /> Agent 3 AST & Hierarchy Inspector
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '4px' }}>
              Inspect TDL code snippets for bracket matching, structural hierarchy rules (<code style={{ color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>Report -&gt; Form -&gt; Part -&gt; Line -&gt; Field</code>), and dangling references.
            </p>
          </div>
          <button onClick={handleValidate} className="btn-cta-primary" disabled={loading}>
            <Play size={16} /> Run Inspector
          </button>
        </div>

        {/* Input area */}
        <div className="glass-panel-elevated" style={{ padding: '20px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', display: 'block' }}>
            Paste TDL Code Snippet
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={12}
            style={{
              width: '100%',
              background: '#04060d',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem',
              outline: 'none',
              lineHeight: 1.6,
            }}
          />
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="glass-panel-elevated" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {analysis.valid ? <CheckCircle2 color="#34d399" size={22} /> : <AlertCircle color="#f87171" size={22} />}
                <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
                  Validation Status:{' '}
                  <span className={analysis.valid ? 'badge-status-pass' : 'badge-status-warn'}>
                    {analysis.status}
                  </span>
                </span>
              </div>
            </div>

            {/* Hierarchy Errors */}
            {analysis.hierarchy_errors.length > 0 && (
              <div style={{ marginBottom: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.35)', padding: '12px 16px', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ color: '#f87171', fontSize: '0.9rem', marginBottom: '6px', fontWeight: 700 }}>Hierarchy Violations:</h4>
                <ul style={{ paddingLeft: '1.2rem', color: '#fca5a5', fontSize: '0.85rem' }}>
                  {analysis.hierarchy_errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Dangling References */}
            {analysis.dangling_references.length > 0 && (
              <div style={{ marginBottom: '16px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.35)', padding: '12px 16px', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ color: '#fbbf24', fontSize: '0.9rem', marginBottom: '6px', fontWeight: 700 }}>Dangling References:</h4>
                <ul style={{ paddingLeft: '1.2rem', color: '#fde68a', fontSize: '0.85rem' }}>
                  {analysis.dangling_references.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Clean Code Output */}
            <div>
              <h4 style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Code size={14} color="#10b981" /> Sanitized TDL Output:
              </h4>
              <pre className="quantum-code-block">{analysis.clean_code}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
