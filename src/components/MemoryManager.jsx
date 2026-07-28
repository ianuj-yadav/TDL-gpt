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
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-display)' }}>
            <BookOpen color="#c084fc" size={28} /> Permanent Teaching Memory Rules
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '4px' }}>
            Teach developer rules and overrides permanently. Rules defined here are automatically injected into AI prompts to prevent repeating domain corrections.
          </p>
        </div>

        {/* Add Rule Form */}
        <form onSubmit={handleAddRule} className="glass-panel-elevated" style={{ padding: '20px', display: 'flex', gap: '12px' }}>
          <input
            type="text"
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
            placeholder="Add new rule, e.g., '[RULE: Always use UDF for GST registration numbers in Party Ledger]'"
            style={{
              flex: 1,
              background: '#04060d',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              color: '#ffffff',
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
          <button type="submit" className="btn-cta-primary" disabled={loading || !newRule.trim()}>
            <Plus size={16} /> Add Rule
          </button>
        </form>

        {/* Rules List */}
        <div className="glass-panel-elevated" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '16px', fontFamily: 'var(--font-display)' }}>
            Active Developer Rules ({rules.length})
          </h3>
          {rules.length === 0 ? (
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', textAlign: 'center', padding: '2.5rem 0' }}>
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
                    justify: 'space-between',
                    padding: '14px 18px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ShieldAlert size={18} color="#38bdf8" />
                    <span style={{ fontSize: '0.9rem', color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                      {r.rule_text}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteRule(r.id)}
                    style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', opacity: 0.8 }}
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
