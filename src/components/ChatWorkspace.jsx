import React, { useState, useRef, useEffect } from 'react';
import { Send, Copy, Check, Download, Sparkles, AlertTriangle, CheckCircle, Code, ChevronDown, ChevronUp, Brain, FileText, User } from 'lucide-react';
import HeroBanner from './HeroBanner';

export default function ChatWorkspace({
  messages,
  onSendMessage,
  loading,
  showContext = true,
  autoValidate = true,
  autoTune = true
}) {
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [downloadedId, setDownloadedId] = useState(null);
  const [expandedThinking, setExpandedThinking] = useState({});
  const [expandedContext, setExpandedContext] = useState({});
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onSendMessage(input);
    setInput('');
  };

  const handleInputKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleSelectPrompt = (promptText) => {
    onSendMessage(promptText);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadTdlFile = (text, id) => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `custom_report_${id}.tdl`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadedId(id);
    setTimeout(() => setDownloadedId(null), 2000);
  };

  const toggleThinking = (id) => {
    setExpandedThinking((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleContext = (id) => {
    setExpandedContext((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ flex: 1, height: 'calc(100vh - 65px)', display: 'flex', flexDirection: 'column', background: 'transparent' }}>
      
      {/* Scrollable Chat Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px', display: 'flex', flexDirection: 'column' }}>
        
        {/* Spotlight Hero Banner & Holographic Chips */}
        <HeroBanner onSelectPrompt={handleSelectPrompt} />

        {messages.length === 0 ? (
          <div style={{ margin: '2.5rem auto', textAlign: 'center', maxWidth: '560px', color: '#94a3b8' }}>
            <div style={{ background: 'rgba(56, 189, 248, 0.12)', width: '68px', height: '68px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem', border: '1px solid rgba(56,189,248,0.35)', boxShadow: '0 0 25px rgba(56,189,248,0.2)' }}>
              <Sparkles size={34} color="#38bdf8" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
              TDL Quantum AI Workbench
            </h3>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.65', color: '#94a3b8' }}>
              Select a quick-prompt chip above or press <kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.78rem', color: '#38bdf8' }}>Ctrl+K</kbd> to focus input and start coding!
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem', marginTop: '1rem' }}>
            {messages.map((msg, idx) => {
              const msgId = msg.id || idx;
              const isUser = msg.role === 'user';

              return (
                <div
                  key={msgId}
                  className="animate-fade-in-up"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: isUser ? 'flex-end' : 'flex-start',
                    maxWidth: isUser ? '76%' : '88%',
                    width: isUser ? 'auto' : '100%',
                  }}
                >
                  <div
                    className="glass-panel-elevated"
                    style={{
                      padding: '1.3rem 1.6rem',
                      background: isUser
                        ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.65) 0%, rgba(13, 17, 26, 0.90) 100%)'
                        : 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(13, 17, 26, 0.90) 100%)',
                      border: isUser
                        ? '1px solid rgba(56, 189, 248, 0.40)'
                        : '1px solid rgba(168, 85, 247, 0.40)',
                      borderLeft: isUser
                        ? '4px solid #38bdf8'
                        : '4px solid #c084fc',
                      borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                    }}
                  >
                    {/* Header info for assistant */}
                    {!isUser ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.6rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#38bdf8', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                          <Sparkles size={15} /> Tier 3 RAG Quantum Engine
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {autoTune && (
                            <span style={{ background: 'rgba(168,85,247,0.15)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.35)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: 700 }}>
                              🧠 Adaptive Auto-Tune
                            </span>
                          )}
                          {autoValidate && msg.validation_status && (
                            <span className={msg.validation_status === 'PASS' ? 'badge-status-pass' : 'badge-status-warn'}>
                              AST: {msg.validation_status}
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 700 }}>
                        <User size={13} color="#38bdf8" /> User Command
                      </div>
                    )}

                    {/* Reasoning / Thinking Process */}
                    {msg.reasoning && (
                      <div style={{ background: 'rgba(3,7,18,0.5)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '12px' }}>
                        <div
                          style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 700, fontSize: '0.82rem', color: '#c084fc' }}
                          onClick={() => toggleThinking(msgId)}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Brain size={14} /> 💭 LLM Reasoning Process
                          </span>
                          {expandedThinking[msgId] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </div>
                        {expandedThinking[msgId] && (
                          <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(255,255,255,0.06)', fontStyle: 'italic', color: '#cbd5e1', fontSize: '0.84rem', lineHeight: '1.6' }}>
                            {msg.reasoning}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Message Text Content */}
                    <div style={{ fontSize: '0.94rem', color: '#f8fafc', whiteSpace: 'pre-wrap', lineHeight: '1.68' }}>
                      {msg.content}
                    </div>

                    {/* Retrieved KB Context Sources */}
                    {showContext && msg.context_files && msg.context_files.length > 0 && (
                      <div style={{ background: 'rgba(3,7,18,0.5)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginTop: '14px' }}>
                        <div
                          style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 700, fontSize: '0.82rem', color: '#38bdf8' }}
                          onClick={() => toggleContext(msgId)}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <FileText size={14} /> 📚 Retrieved KB Context ({msg.context_files.length} sources matched)
                          </span>
                          {expandedContext[msgId] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </div>
                        {expandedContext[msgId] && (
                          <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              {msg.context_files.map((fname, fidx) => (
                                <span key={fidx} style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.3)', padding: '3px 10px', borderRadius: 'var(--radius-sm)', fontSize: '0.76rem', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                                  📄 {fname}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* TDL AST Validation Status Bar */}
                    {autoValidate && msg.tdl_code && (
                      <div style={{ background: 'rgba(3,7,18,0.5)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-md)', padding: '8px 12px', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: msg.validation_status === 'PASS' ? '#34d399' : '#fbbf24' }}>
                        {msg.validation_status === 'PASS' ? <CheckCircle size={15} /> : <AlertTriangle size={15} />}
                        <span style={{ fontWeight: 700 }}>
                          {msg.validation_status === 'PASS'
                            ? '✅ TDL Syntax Check — Passed (Bracket/colon balance verified)'
                            : '⚠️ TDL Syntax Check — AST warnings detected'}
                        </span>
                      </div>
                    )}

                    {/* Generated TDL Code Block */}
                    {msg.tdl_code && (
                      <div style={{ marginTop: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#04060d', padding: '8px 14px', borderRadius: 'var(--radius-md) var(--radius-md) 0 0', border: '1px solid rgba(255,255,255,0.12)', borderBottom: 'none' }}>
                          <span style={{ fontSize: '0.78rem', color: '#10b981', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                            <Code size={14} /> TDL Output Code
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => downloadTdlFile(msg.tdl_code, msgId)}
                              className="btn-cta-secondary"
                              style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                              title="Download TDL source file"
                            >
                              {downloadedId === msgId ? <Check size={13} color="#10b981" /> : <Download size={13} />}
                              {downloadedId === msgId ? 'Downloaded!' : 'Download .tdl'}
                            </button>
                            <button
                              onClick={() => copyToClipboard(msg.tdl_code, msgId)}
                              className="btn-cta-secondary"
                              style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                              {copiedId === msgId ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                              {copiedId === msgId ? 'Copied!' : 'Copy Code'}
                            </button>
                          </div>
                        </div>
                        <pre className="quantum-code-block" style={{ borderRadius: '0 0 var(--radius-md) var(--radius-md)', margin: 0 }}>
                          {msg.tdl_code}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {loading && (
          <div style={{ alignSelf: 'flex-start', background: 'rgba(15, 23, 42, 0.85)', padding: '12px 20px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(56,189,248,0.35)', display: 'flex', alignItems: 'center', gap: '10px', color: '#38bdf8', fontSize: '0.86rem', marginTop: '16px', boxShadow: '0 0 20px rgba(56,189,248,0.2)' }}>
            <Sparkles size={18} className="animate-spin" /> Retrieving context & reasoning TDL hierarchy...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Sticky Command Bar Input */}
      <form onSubmit={handleSubmit} style={{ padding: '16px 28px', background: 'rgba(11, 15, 25, 0.95)', borderTop: '1px solid rgba(255,255,255,0.10)' }}>
        <div style={{ display: 'flex', gap: '12px', maxWidth: '1150px', margin: '0 auto', alignItems: 'center' }}>
          <input
            ref={inputRef}
            type="text"
            className="command-bar-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Ask a TDL code question (Ctrl+Enter to send, Ctrl+K to focus)..."
            disabled={loading}
          />
          <button
            type="submit"
            className="btn-cta-primary"
            disabled={loading || !input.trim()}
            style={{ padding: '0 24px', height: '48px', borderRadius: 'var(--radius-lg)' }}
          >
            <Send size={17} /> Send
          </button>
        </div>
      </form>
    </div>
  );
}
