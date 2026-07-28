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
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#1D281F', display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-serif)' }}>
              <ShieldCheck color="#1D281F" size={32} /> Agent 3 AST & Hierarchy Inspector
            </h2>
            <p style={{ fontSize: '0.94rem', color: '#6B7A6D', marginTop: '4px', fontWeight: 600 }}>
              Inspect TDL code snippets for bracket matching, structural hierarchy rules (<code style={{ color: '#1D281F', fontFamily: 'var(--font-mono)', background: '#BFEA4B', padding: '2px 6px', borderRadius: '4px', border: '1px solid #1D281F' }}>Report -&gt; Form -&gt; Part -&gt; Line -&gt; Field</code>), and dangling references.
            </p>
          </div>
          <button onClick={handleValidate} className="btn-cause-lime" disabled={loading}>
            <Play size={16} /> Run Inspector
          </button>
        </div>

        {/* Input area */}
        <div className="cause-card" style={{ padding: '24px', background: '#F7F0E6' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 900, color: '#1D281F', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', display: 'block' }}>
            Paste TDL Code Snippet
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={12}
            className="cause-input"
            style={{
              width: '100%',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem',
              lineHeight: 1.6,
            }}
          />
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="cause-card" style={{ padding: '28px', background: '#F7F0E6' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', borderBottom: '2px solid #1D281F', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {analysis.valid ? <CheckCircle2 color="#1D281F" size={24} /> : <AlertCircle color="#C53A20" size={24} />}
                <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#1D281F', fontFamily: 'var(--font-serif)' }}>
                  Validation Status:{' '}
                  <span className={analysis.valid ? 'badge-cause-pass' : 'badge-cause-warn'}>
                    {analysis.status}
                  </span>
                </span>
              </div>
            </div>

            {/* Hierarchy Errors */}
            {analysis.hierarchy_errors.length > 0 && (
              <div style={{ marginBottom: '16px', background: '#C53A20', color: '#ffffff', border: '2px solid #1D281F', padding: '14px 18px', borderRadius: '12px', boxShadow: '3px 3px 0px #1D281F' }}>
                <h4 style={{ fontSize: '0.94rem', marginBottom: '6px', fontWeight: 900 }}>Hierarchy Violations:</h4>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', fontWeight: 600 }}>
                  {analysis.hierarchy_errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Dangling References */}
            {analysis.dangling_references.length > 0 && (
              <div style={{ marginBottom: '16px', background: '#F3E8DD', border: '2px solid #1D281F', padding: '14px 18px', borderRadius: '12px', boxShadow: '3px 3px 0px #1D281F' }}>
                <h4 style={{ color: '#1D281F', fontSize: '0.94rem', marginBottom: '6px', fontWeight: 900 }}>Dangling References:</h4>
                <ul style={{ paddingLeft: '1.2rem', color: '#1D281F', fontSize: '0.88rem', fontWeight: 600 }}>
                  {analysis.dangling_references.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Clean Code Output */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1D281F', color: '#BFEA4B', padding: '10px 16px', borderRadius: '16px 16px 0 0', border: '2px solid #1D281F', borderBottom: 'none' }}>
                <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800 }}>
                  <Code size={16} /> Sanitized TDL Output
                </span>
              </div>
              <pre className="cause-code-block" style={{ margin: 0 }}>{analysis.clean_code}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
