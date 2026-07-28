import React, { useState, useRef, useEffect } from 'react';
import { Send, Copy, Check, Download, Sparkles, AlertTriangle, CheckCircle, Code, ChevronDown, ChevronUp, Brain, FileText, User } from 'lucide-react';
import HeroBanner from './HeroBanner';

export default function ChatWorkspace({
  messages,
  onSendMessage,
  loading,
  showContext = true,
  autoValidate = true,
  autoTune = true,
  onOpenAuth
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
    <div style={{ flex: 1, height: 'calc(100vh - 75px)', display: 'flex', flexDirection: 'column', background: 'transparent' }}>
      
      {/* Scrollable Chat Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column' }}>
        
        {/* Spotlight Hero Banner & Holographic Chips */}
        <HeroBanner onSelectPrompt={handleSelectPrompt} onOpenAuth={onOpenAuth} />

        {messages.length === 0 ? (
          <div className="cause-card" style={{ margin: '2.5rem auto', textAlign: 'center', maxWidth: '580px', padding: '32px', background: '#F3E8DD' }}>
            <div style={{ background: '#BFEA4B', border: '2px solid #1D281F', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: '3px 3px 0px #1D281F', fontSize: '1.8rem' }}>
              🏡
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 900, color: '#1D281F', marginBottom: '0.5rem' }}>
              CauseHouse TDL AI Workbench
            </h3>
            <p style={{ fontSize: '0.94rem', lineHeight: '1.6', color: '#1D281F', fontWeight: 500 }}>
              Select a quick-prompt chip above or press <kbd style={{ background: '#BFEA4B', padding: '2px 8px', borderRadius: '6px', border: '2px solid #1D281F', fontSize: '0.78rem', fontWeight: 800 }}>Ctrl+K</kbd> to focus input and start coding!
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
            {messages.map((msg, idx) => {
              const msgId = msg.id || idx;
              const isUser = msg.role === 'user';

              return (
                <div
                  key={msgId}
                  className="animate-cause-pop"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: isUser ? 'flex-end' : 'flex-start',
                    maxWidth: isUser ? '76%' : '88%',
                    width: isUser ? 'auto' : '100%',
                  }}
                >
                  <div
                    className="cause-card"
                    style={{
                      padding: '1.4rem 1.8rem',
                      background: isUser ? '#F3E8DD' : '#ffffff',
                      borderLeft: isUser ? '6px solid #1D281F' : '6px solid #BFEA4B',
                      borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                      boxShadow: '4px 4px 0px #1D281F',
                    }}
                  >
                    {/* Header info for assistant */}
                    {!isUser ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem', borderBottom: '2px solid #1D281F', paddingBottom: '0.6rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: '#1D281F', fontWeight: 900, fontFamily: 'var(--font-serif)' }}>
                          <Sparkles size={16} /> CauseHouse RAG Engine
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {autoValidate && msg.validation_status && (
                            <span className={msg.validation_status === 'PASS' ? 'badge-cause-pass' : 'badge-cause-warn'}>
                              AST: {msg.validation_status}
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#6B7A6D', marginBottom: '0.5rem', fontWeight: 800, uppercase: true }}>
                        <User size={13} color="#1D281F" /> User Command
                      </div>
                    )}

                    {/* Message Text Content */}
                    <div style={{ fontSize: '0.96rem', color: '#1D281F', whiteSpace: 'pre-wrap', lineHeight: '1.65', fontWeight: 500 }}>
                      {msg.content}
                    </div>

                    {/* TDL AST Validation Status Bar */}
                    {autoValidate && msg.tdl_code && (
                      <div style={{ background: '#F7F0E6', border: '2px solid #1D281F', borderRadius: '12px', padding: '10px 14px', marginTop: '14px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: '#1D281F', boxShadow: '2px 2px 0px #1D281F' }}>
                        {msg.validation_status === 'PASS' ? <CheckCircle size={16} color="#1D281F" /> : <AlertTriangle size={16} color="#C53A20" />}
                        <span style={{ fontWeight: 800 }}>
                          {msg.validation_status === 'PASS'
                            ? '✅ TDL Syntax Check — Passed (Bracket/colon balance verified)'
                            : '⚠️ TDL Syntax Check — AST warnings detected'}
                        </span>
                      </div>
                    )}

                    {/* Generated TDL Code Block */}
                    {msg.tdl_code && (
                      <div style={{ marginTop: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1D281F', color: '#F7F0E6', padding: '10px 16px', borderRadius: '16px 16px 0 0', border: '2px solid #1D281F', borderBottom: 'none' }}>
                          <span style={{ fontSize: '0.8rem', color: '#BFEA4B', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800 }}>
                            <Code size={15} /> TDL Output Code
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => downloadTdlFile(msg.tdl_code, msgId)}
                              className="btn-cause-paper"
                              style={{ padding: '4px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                              title="Download TDL source file"
                            >
                              {downloadedId === msgId ? <Check size={13} color="#1D281F" /> : <Download size={13} />}
                              {downloadedId === msgId ? 'Downloaded!' : 'Download .tdl'}
                            </button>
                            <button
                              onClick={() => copyToClipboard(msg.tdl_code, msgId)}
                              className="btn-cause-lime"
                              style={{ padding: '4px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                              {copiedId === msgId ? <Check size={13} color="#1D281F" /> : <Copy size={13} />}
                              {copiedId === msgId ? 'Copied!' : 'Copy Code'}
                            </button>
                          </div>
                        </div>
                        <pre className="cause-code-block" style={{ margin: 0 }}>
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
          <div className="cause-card" style={{ alignSelf: 'flex-start', background: '#BFEA4B', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '10px', color: '#1D281F', fontSize: '0.88rem', fontWeight: 800, marginTop: '16px' }}>
            <Sparkles size={18} className="animate-spin" /> CauseHouse AI reasoning TDL hierarchy...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Sticky Command Bar Input */}
      <form onSubmit={handleSubmit} style={{ padding: '18px 32px', background: '#F7F0E6', borderTop: '3px solid #1D281F' }}>
        <div style={{ display: 'flex', gap: '14px', maxWidth: '1150px', margin: '0 auto', alignItems: 'center' }}>
          <input
            ref={inputRef}
            type="text"
            className="cause-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Ask a TDL code question (Ctrl+Enter to send, Ctrl+K to focus)..."
            disabled={loading}
            style={{ padding: '14px 20px', fontSize: '0.94rem' }}
          />
          <button
            type="submit"
            className="btn-cause-lime"
            disabled={loading || !input.trim()}
            style={{ padding: '0 28px', height: '52px', borderRadius: 'var(--radius-pill)', fontSize: '0.9rem' }}
          >
            <Send size={18} /> Send
          </button>
        </div>
      </form>
    </div>
  );
}
