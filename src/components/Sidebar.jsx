import React, { useState } from 'react';
import {
  Plus, MessageSquare, Trash2, Key, HardDrive, RefreshCw, Zap,
  ChevronDown, ChevronUp, Upload, Sliders, CheckCircle2, XCircle, AlertCircle, Sparkles, SlidersHorizontal
} from 'lucide-react';

export default function Sidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onCreateSession,
  onDeleteSession,
  apiKey,
  setApiKey,
  apiKeyValid,
  onConnectApiKey,
  onClearApiKey,
  kbStatus,
  onReloadKb,
  onRebuildKb,
  permanentRules,
  onAddRule,
  onDeleteRule,
  onUploadFiles,
  modelParams,
  setModelParams,
  onQuickPrompt,
  onClearHistory,
  isOpenOnMobile
}) {
  const [sidebarTab, setSidebarTab] = useState('sessions'); // 'sessions' | 'controls'

  // Form states
  const [tempApiKey, setTempApiKey] = useState(apiKey || '');
  const [newRuleText, setNewRuleText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [persistUpload, setPersistUpload] = useState(false);

  // Accordion open/close states
  const [roadmapOpen, setRoadmapOpen] = useState(false);
  const [teachOpen, setTeachOpen] = useState(true);
  const [filesOpen, setFilesOpen] = useState(true);
  const [paramsOpen, setParamsOpen] = useState(true);

  const handleConnectKey = (e) => {
    e.preventDefault();
    if (tempApiKey.trim()) {
      onConnectApiKey(tempApiKey.trim());
    }
  };

  const handleSaveRule = (e) => {
    e.preventDefault();
    if (newRuleText.trim()) {
      onAddRule(newRuleText.trim());
      setNewRuleText('');
    }
  };

  const handleProcessFiles = () => {
    if (selectedFiles.length > 0) {
      onUploadFiles(selectedFiles, persistUpload);
      setSelectedFiles([]);
    }
  };

  return (
    <aside
      style={{
        width: '320px',
        background: 'rgba(11, 15, 25, 0.88)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.10)',
        height: 'calc(100vh - 65px)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 15,
        transition: 'transform 0.3s ease',
      }}
    >
      {/* Sidebar Top View Switcher */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(3,7,18,0.4)' }}>
        <button
          onClick={() => setSidebarTab('sessions')}
          style={{
            flex: 1,
            padding: '11px',
            background: sidebarTab === 'sessions' ? 'rgba(255,255,255,0.06)' : 'transparent',
            border: 'none',
            borderBottom: sidebarTab === 'sessions' ? '2px solid #38bdf8' : '2px solid transparent',
            color: sidebarTab === 'sessions' ? '#ffffff' : '#94a3b8',
            fontSize: '0.82rem',
            fontWeight: 700,
            fontFamily: 'var(--font-sans)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
          }}
        >
          <MessageSquare size={14} /> Workspaces ({sessions.length})
        </button>
        <button
          onClick={() => setSidebarTab('controls')}
          style={{
            flex: 1,
            padding: '11px',
            background: sidebarTab === 'controls' ? 'rgba(255,255,255,0.06)' : 'transparent',
            border: 'none',
            borderBottom: sidebarTab === 'controls' ? '2px solid #38bdf8' : '2px solid transparent',
            color: sidebarTab === 'controls' ? '#ffffff' : '#94a3b8',
            fontSize: '0.82rem',
            fontWeight: 700,
            fontFamily: 'var(--font-sans)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
          }}
        >
          <SlidersHorizontal size={14} /> Studio Controls
        </button>
      </div>

      {/* BODY CONTENT */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>

        {/* WORKSPACES TAB */}
        {sidebarTab === 'sessions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={onCreateSession}
              className="btn-cta-primary"
              style={{ width: '100%', padding: '0.7rem' }}
            >
              <Plus size={16} /> New Workspace Session
            </button>

            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '6px' }}>
              Active Sessions
            </div>

            {sessions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#94a3b8', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ background: 'rgba(56,189,248,0.1)', width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                  <Sparkles size={20} color="#38bdf8" />
                </div>
                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>No Active Sessions</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Click above to create your first TDL AI workspace!</div>
              </div>
            ) : (
              sessions.map((sess) => {
                const isActive = sess.id === activeSessionId;
                return (
                  <div
                    key={sess.id}
                    onClick={() => onSelectSession(sess.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'space-between',
                      padding: '11px 13px',
                      borderRadius: 'var(--radius-md)',
                      background: isActive ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.14) 0%, rgba(168, 85, 247, 0.08) 100%)' : 'rgba(255,255,255,0.02)',
                      border: isActive ? '1px solid rgba(56, 189, 248, 0.45)' : '1px solid rgba(255,255,255,0.06)',
                      boxShadow: isActive ? '0 0 20px rgba(56, 189, 248, 0.15)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                      <MessageSquare size={15} color={isActive ? '#38bdf8' : '#94a3b8'} />
                      <span style={{ fontSize: '0.83rem', color: isActive ? '#ffffff' : '#cbd5e1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: isActive ? 700 : 500 }}>
                        {sess.title || 'Untitled Session'}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSession(sess.id);
                      }}
                      style={{ background: 'none', border: 'none', color: '#f87171', opacity: 0.7, cursor: 'pointer', padding: '2px' }}
                      title="Delete session"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* STUDIO CONTROLS TAB */}
        {sidebarTab === 'controls' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {/* 1. API Connection */}
            <div className="glass-panel-studio" style={{ padding: '14px' }}>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#ffffff', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-display)' }}>
                <Key size={15} color="#38bdf8" /> API Connection
              </div>

              {apiKeyValid === true && (
                <div className="badge-status-pass" style={{ marginBottom: '10px', width: '100%', display: 'flex', justifyContent: 'center', gap: '6px' }}>
                  <CheckCircle2 size={13} /> API Connected
                </div>
              )}
              {apiKeyValid === false && (
                <div className="badge-status-warn" style={{ color: '#f87171', borderColor: 'rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', marginBottom: '10px', width: '100%', display: 'flex', justifyContent: 'center', gap: '6px' }}>
                  <XCircle size={13} /> API Key Invalid
                </div>
              )}
              {apiKeyValid === null && (
                <div className="badge-status-warn" style={{ marginBottom: '10px', width: '100%', display: 'flex', justifyContent: 'center', gap: '6px' }}>
                  <AlertCircle size={13} /> Verifying Key...
                </div>
              )}

              <form onSubmit={handleConnectKey}>
                <input
                  type="password"
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder="nvapi-..."
                  style={{ width: '100%', marginBottom: '10px', fontSize: '0.8rem' }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="submit" className="btn-cta-primary" style={{ flex: 1, padding: '7px', fontSize: '0.78rem' }}>
                    🔌 Connect
                  </button>
                  <button type="button" onClick={() => { setTempApiKey(''); onClearApiKey(); }} className="btn-cta-secondary" style={{ flex: 1, padding: '7px', fontSize: '0.78rem' }}>
                    🗑️ Clear
                  </button>
                </div>
              </form>
            </div>

            {/* 2. System Status & KB Control */}
            <div className="glass-panel-studio" style={{ padding: '14px' }}>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#ffffff', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-display)' }}>
                <HardDrive size={15} color="#c084fc" /> System Status & KB
              </div>

              <div className="badge-status-pass" style={{ marginBottom: '12px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                🟢 Vector KB Online (FAISS + BM25)
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px', textAlign: 'center' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-display)' }}>{kbStatus?.indexed_count || 1420}</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Indexed Chunks</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#c084fc', fontFamily: 'var(--font-display)' }}>{kbStatus?.source_folder_files || 699}</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Source Files</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={onReloadKb} className="btn-cta-secondary" style={{ flex: 1, padding: '7px', fontSize: '0.78rem' }}>
                  <RefreshCw size={13} /> Reload KB
                </button>
                <button onClick={onRebuildKb} className="btn-cta-primary" style={{ flex: 1, padding: '7px', fontSize: '0.78rem' }}>
                  <Zap size={13} /> Rebuild KB
                </button>
              </div>
            </div>

            {/* 3. Quantum AI Roadmap Accordion */}
            <div className="glass-panel-studio" style={{ overflow: 'hidden' }}>
              <div
                style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 600, fontSize: '0.84rem', color: '#cbd5e1' }}
                onClick={() => setRoadmapOpen(!roadmapOpen)}
              >
                <span>💡 Quantum AI Studio Ideas</span>
                {roadmapOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
              {roadmapOpen && (
                <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.5' }}>
                  <p style={{ marginBottom: '6px' }}>• <strong>Tier 3 RRF RAG</strong>: FAISS dense vectors + BM25 lexical tokens.</p>
                  <p style={{ marginBottom: '6px' }}>• <strong>AST Hierarchy Check</strong>: Validates <code>Report -&gt; Form -&gt; Part -&gt; Line -&gt; Field</code>.</p>
                  <p>• <strong>Permanent Memory</strong>: Remembers user rules forever.</p>
                </div>
              )}
            </div>

            {/* 4. Permanent Teaching Rules Memory */}
            <div className="glass-panel-studio" style={{ overflow: 'hidden' }}>
              <div
                style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 600, fontSize: '0.84rem', color: '#cbd5e1' }}
                onClick={() => setTeachOpen(!teachOpen)}
              >
                <span>🧠 Teach AI Permanent Rules</span>
                {teachOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
              {teachOpen && (
                <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <form onSubmit={handleSaveRule} style={{ marginBottom: '10px' }}>
                    <input
                      type="text"
                      value={newRuleText}
                      onChange={(e) => setNewRuleText(e.target.value)}
                      placeholder="e.g. Always use CUST_ prefix"
                      style={{ width: '100%', marginBottom: '8px', fontSize: '0.78rem' }}
                    />
                    <button type="submit" className="btn-cta-primary" style={{ width: '100%', padding: '6px', fontSize: '0.78rem' }}>
                      💾 Save Rule Forever
                    </button>
                  </form>

                  {permanentRules && permanentRules.length > 0 && (
                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>Saved Rules:</div>
                      {permanentRules.map((r, i) => (
                        <div key={r.id || i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '5px 10px', borderRadius: 'var(--radius-sm)', marginBottom: '4px', fontSize: '0.76rem' }}>
                          <span style={{ color: '#cbd5e1' }}>• {r.rule_text}</span>
                          {r.id && (
                            <button onClick={() => onDeleteRule(r.id)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}>
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 5. Add Files / Upload to Chat */}
            <div className="glass-panel-studio" style={{ overflow: 'hidden' }}>
              <div
                style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 600, fontSize: '0.84rem', color: '#cbd5e1' }}
                onClick={() => setFilesOpen(!filesOpen)}
              >
                <span>📎 Add Files to Chat</span>
                {filesOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
              {filesOpen && (
                <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
                    style={{ width: '100%', marginBottom: '10px', fontSize: '0.76rem' }}
                  />
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#94a3b8', marginBottom: '10px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={persistUpload}
                      onChange={(e) => setPersistUpload(e.target.checked)}
                    />
                    💾 Save permanently to KB
                  </label>
                  <button
                    onClick={handleProcessFiles}
                    disabled={selectedFiles.length === 0}
                    className="btn-cta-primary"
                    style={{ width: '100%', padding: '7px', fontSize: '0.78rem' }}
                  >
                    <Upload size={14} /> Embed {selectedFiles.length} File(s)
                  </button>
                </div>
              )}
            </div>

            {/* 6. Model Hyperparameters */}
            <div className="glass-panel-studio" style={{ overflow: 'hidden' }}>
              <div
                style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 600, fontSize: '0.84rem', color: '#cbd5e1' }}
                onClick={() => setParamsOpen(!paramsOpen)}
              >
                <span>⚙️ Model Hyperparameters</span>
                {paramsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
              {paramsOpen && (
                <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: '#cbd5e1', marginBottom: '4px' }}>
                      <span>Temperature</span>
                      <span style={{ color: '#38bdf8', fontWeight: 700 }}>{modelParams.temperature}</span>
                    </div>
                    <input
                      type="range"
                      min="0.0"
                      max="1.5"
                      step="0.1"
                      value={modelParams.temperature}
                      onChange={(e) => setModelParams({ ...modelParams, temperature: parseFloat(e.target.value) })}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: '#cbd5e1', marginBottom: '4px' }}>
                      <span>Top-P</span>
                      <span style={{ color: '#38bdf8', fontWeight: 700 }}>{modelParams.topP}</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={modelParams.topP}
                      onChange={(e) => setModelParams({ ...modelParams, topP: parseFloat(e.target.value) })}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: '#cbd5e1', marginBottom: '4px' }}>
                      <span>Max Tokens</span>
                      <span style={{ color: '#38bdf8', fontWeight: 700 }}>{modelParams.maxTokens}</span>
                    </div>
                    <input
                      type="range"
                      min="1024"
                      max="16384"
                      step="1024"
                      value={modelParams.maxTokens}
                      onChange={(e) => setModelParams({ ...modelParams, maxTokens: parseInt(e.target.value) })}
                      style={{ width: '100%' }}
                    />
                  </div>

                  {/* Toggles */}
                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.76rem', color: '#cbd5e1', cursor: 'pointer' }}>
                    <span>⚡ Real-time Streaming</span>
                    <input
                      type="checkbox"
                      checked={modelParams.stream}
                      onChange={(e) => setModelParams({ ...modelParams, stream: e.target.checked })}
                    />
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.76rem', color: '#cbd5e1', cursor: 'pointer' }}>
                    <span>📚 Show Retrieved Context</span>
                    <input
                      type="checkbox"
                      checked={modelParams.showContext}
                      onChange={(e) => setModelParams({ ...modelParams, showContext: e.target.checked })}
                    />
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.76rem', color: '#cbd5e1', cursor: 'pointer' }}>
                    <span>✅ Auto-check TDL Syntax</span>
                    <input
                      type="checkbox"
                      checked={modelParams.autoValidate}
                      onChange={(e) => setModelParams({ ...modelParams, autoValidate: e.target.checked })}
                    />
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.76rem', color: '#cbd5e1', cursor: 'pointer' }}>
                    <span>🧠 Adaptive Auto-Tuning</span>
                    <input
                      type="checkbox"
                      checked={modelParams.autoTune}
                      onChange={(e) => setModelParams({ ...modelParams, autoTune: e.target.checked })}
                    />
                  </label>
                </div>
              )}
            </div>

            {/* 7. Clear History */}
            <button
              onClick={onClearHistory}
              className="btn-cta-secondary"
              style={{ width: '100%', padding: '10px', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.08)' }}
            >
              🗑️ Clear Conversation History
            </button>

          </div>
        )}

      </div>
    </aside>
  );
}
