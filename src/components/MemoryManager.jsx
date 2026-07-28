import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Trash2, ShieldAlert } from 'lucide-react';

export default function MemoryManager() {
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRules = async () => {
    try {
      const res = await fetch('/api/rules');
      const data = await res.json();
      setRules(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleAddRule = async (e) => {
    e.preventDefault();
    if (!newRule.trim()) return;
    setLoading(true);
    try {
      await fetch('/api/rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rule_text: newRule }),
      });
      setNewRule('');
      fetchRules();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRule = async (id) => {
    try {
      await fetch(`/api/rules/${id}`, { method: 'DELETE' });
      fetchRules();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ flex: 1, padding: '28px 36px', overflowY: 'auto', background: 'transparent' }}>
      <div style={{ maxWidth: '950px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Header */}
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#1D281F', display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-serif)' }}>
            <BookOpen color="#1D281F" size={32} /> Permanent Teaching Memory Rules
          </h2>
          <p style={{ fontSize: '0.94rem', color: '#6B7A6D', marginTop: '4px', fontWeight: 600 }}>
            Teach developer rules and overrides permanently. Rules defined here are automatically injected into AI prompts to prevent repeating domain corrections.
          </p>
        </div>

        {/* Add Rule Form */}
        <form onSubmit={handleAddRule} className="cause-card" style={{ padding: '24px', display: 'flex', gap: '14px', background: '#F3E8DD' }}>
          <input
            type="text"
            className="cause-input"
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
            placeholder="Add new rule, e.g., '[RULE: Always use UDF for GST registration numbers in Party Ledger]'"
            style={{ flex: 1, fontSize: '0.9rem' }}
          />
          <button type="submit" className="btn-cause-ink" disabled={loading || !newRule.trim()} style={{ padding: '12px 24px' }}>
            <Plus size={16} /> Add Rule
          </button>
        </form>

        {/* Rules List */}
        <div className="cause-card" style={{ padding: '28px', background: '#F7F0E6' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#1D281F', marginBottom: '18px', fontFamily: 'var(--font-serif)' }}>
            Active Developer Rules ({rules.length})
          </h3>
          {rules.length === 0 ? (
            <p style={{ fontSize: '0.9rem', color: '#6B7A6D', textAlign: 'center', padding: '2.5rem 0', fontWeight: 600 }}>
              No custom teaching rules active. Add a rule above to guide future TDL code generation.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {rules.map((r) => (
                <div
                  key={r.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    background: '#F3E8DD',
                    border: '2px solid #1D281F',
                    borderRadius: '12px',
                    boxShadow: '2px 2px 0px #1D281F',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ShieldAlert size={18} color="#1D281F" />
                    <span style={{ fontSize: '0.9rem', color: '#1D281F', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      {r.rule_text}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteRule(r.id)}
                    style={{ background: 'none', border: 'none', color: '#C53A20', cursor: 'pointer', padding: '4px' }}
                    title="Delete rule"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
