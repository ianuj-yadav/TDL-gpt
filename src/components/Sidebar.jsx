import React, { useState } from 'react';
import {
  Plus, MessageSquare, Trash2, Key, HardDrive, RefreshCw, Zap,
  ChevronDown, ChevronUp, Upload, SlidersHorizontal, CheckCircle2, XCircle, AlertCircle
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
        width: '310px',
        background: 'rgba(11, 15, 25, 0.95)',
        borderRight: '1px solid var(--border-subtle)',
        height: 'calc(100vh - 65px)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 15,
        transition: 'transform 0.3s ease',
      }}
    >
      {/* Sidebar Top View Switcher */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(3, 7, 18, 0.6)' }}>
        <button
          onClick={() => setSidebarTab('sessions')}
          style={{
            flex: 1,
            padding: '11px',
            background: sidebarTab === 'sessions' ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
            border: 'none',
            borderBottom: sidebarTab === 'sessions' ? '2px solid #38bdf8' : '2px solid transparent',
            color: sidebarTab === 'sessions' ? '#ffffff' : 'var(--color-text-secondary)',
            fontSize: '0.82rem',
            fontWeight: 600,
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
            background: sidebarTab === 'controls' ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
            border: 'none',
            borderBottom: sidebarTab === 'controls' ? '2px solid #38bdf8' : '2px solid transparent',
            color: sidebarTab === 'controls' ? '#ffffff' : 'var(--color-text-secondary)',
            fontSize: '0.82rem',
            fontWeight: 600,
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

            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '6px' }}>
              Active Sessions
            </div>

            {sessions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--color-text-muted)', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>No Active Sessions</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Click above to start a session</div>
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
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      background: isActive ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                      border: isActive ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                      <MessageSquare size={14} color={isActive ? '#38bdf8' : 'var(--color-text-secondary)'} />
                      <span style={{ fontSize: '0.82rem', color: isActive ? '#ffffff' : 'var(--color-text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: isActive ? 700 : 500 }}>
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
            <div className="glass-panel" style={{ padding: '14px' }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#ffffff', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-display)' }}>
                <Key size={15} color="#38bdf8" /> API Connection
              </div>

              {apiKeyValid === true && (
                <div className="badge-status-pass" style={{ marginBottom: '10px', width: '100%', display: 'flex', justifyContent: 'center', gap: '6px' }}>
                  <CheckCircle2 size={13} /> API Connected
                </div>
              )}
              {apiKeyValid === false && (
                <div className="badge-status-warn" style={{ color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.1)', marginBottom: '10px', width: '100%', display: 'flex', justifyContent: 'center', gap: '6px' }}>
                  <XCircle size={13} /> Key Invalid
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
                  style={{ width: '100%', marginBottom: '10px', fontSize: '0.8rem', background: 'rgba(3, 7, 18, 0.8)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '6px 10px', color: '#ffffff' }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="submit" className="btn-cta-primary" style={{ flex: 1, padding: '7px', fontSize: '0.78rem' }}>
                    Connect Key
                  </button>
                  <button type="button" onClick={() => { setTempApiKey(''); onClearApiKey(); }} className="btn-cta-secondary" style={{ flex: 1, padding: '7px', fontSize: '0.78rem' }}>
                    Clear
                  </button>
                </div>
              </form>
            </div>

            {/* 2. System Status & KB Control */}
            <div className="glass-panel" style={{ padding: '14px' }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#ffffff', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-display)' }}>
                <HardDrive size={15} color="#34d399" /> System Status & KB
              </div>

              <div className="badge-status-pass" style={{ marginBottom: '12px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                Vector KB Online
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px', textAlign: 'center' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#38bdf8', fontFamily: 'var(--font-display)' }}>{kbStatus?.indexed_count || 1420}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Indexed Chunks</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#34d399', fontFamily: 'var(--font-display)' }}>{kbStatus?.source_folder_files || 699}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Source Files</div>
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

            {/* 3. Permanent Teaching Rules Memory */}
            <div className="glass-panel" style={{ overflow: 'hidden' }}>
              <div
                style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 600, fontSize: '0.84rem', color: 'var(--color-text-secondary)' }}
                onClick={() => setTeachOpen(!teachOpen)}
              >
                <span>Permanent Teaching Rules</span>
                {teachOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
              {teachOpen && (
                <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border-subtle)' }}>
                  <form onSubmit={handleSaveRule} style={{ marginBottom: '10px' }}>
                    <input
                      type="text"
                      value={newRuleText}
                      onChange={(e) => setNewRuleText(e.target.value)}
                      placeholder="e.g. Always use CUST_ prefix"
                      style={{ width: '100%', marginBottom: '8px', fontSize: '0.78rem', background: 'rgba(3, 7, 18, 0.8)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '6px 10px', color: '#ffffff' }}
                    />
                    <button type="submit" className="btn-cta-primary" style={{ width: '100%', padding: '6px', fontSize: '0.78rem' }}>
                      Save Rule
                    </button>
                  </form>

                  {permanentRules && permanentRules.length > 0 && (
                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '6px' }}>Active Rules:</div>
                      {permanentRules.map((r, i) => (
                        <div key={r.id || i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '5px 10px', borderRadius: 'var(--radius-sm)', marginBottom: '4px', fontSize: '0.76rem' }}>
                          <span style={{ color: 'var(--color-text-secondary)' }}>• {r.rule_text}</span>
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

            {/* 4. Add Files to KB */}
            <div className="glass-panel" style={{ overflow: 'hidden' }}>
              <div
                style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 600, fontSize: '0.84rem', color: 'var(--color-text-secondary)' }}
                onClick={() => setFilesOpen(!filesOpen)}
              >
                <span>Add Files to KB</span>
                {filesOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
              {filesOpen && (
                <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border-subtle)' }}>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
                    style={{ width: '100%', marginBottom: '10px', fontSize: '0.76rem' }}
                  />
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: 'var(--color-text-muted)', marginBottom: '10px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={persistUpload}
                      onChange={(e) => setPersistUpload(e.target.checked)}
                    />
                    Save permanently to KB
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

            {/* 5. Clear History */}
            <button
              onClick={onClearHistory}
              className="btn-cta-secondary"
              style={{ width: '100%', padding: '10px', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.08)' }}
            >
              Clear Conversation History
            </button>

          </div>
        )}

      </div>
    </aside>
  );
}
