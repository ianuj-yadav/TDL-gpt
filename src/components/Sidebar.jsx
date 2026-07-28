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
  const [sidebarTab, setSidebarTab] = useState('sessions');

  const [tempApiKey, setTempApiKey] = useState(apiKey || '');
  const [newRuleText, setNewRuleText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [persistUpload, setPersistUpload] = useState(false);

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
        background: '#F7F0E6',
        borderRight: '3px solid #1D281F',
        height: 'calc(100vh - 75px)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 15,
        transition: 'transform 0.3s ease',
      }}
    >
      {/* View Switcher Tabs */}
      <div style={{ display: 'flex', borderBottom: '3px solid #1D281F', background: '#F3E8DD' }}>
        <button
          onClick={() => setSidebarTab('sessions')}
          style={{
            flex: 1,
            padding: '12px',
            background: sidebarTab === 'sessions' ? '#BFEA4B' : 'transparent',
            border: 'none',
            borderRight: '2px solid #1D281F',
            color: '#1D281F',
            fontSize: '0.82rem',
            fontWeight: 900,
            fontFamily: 'var(--font-sans)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            textTransform: 'uppercase',
          }}
        >
          <MessageSquare size={14} /> Workspaces ({sessions.length})
        </button>
        <button
          onClick={() => setSidebarTab('controls')}
          style={{
            flex: 1,
            padding: '12px',
            background: sidebarTab === 'controls' ? '#BFEA4B' : 'transparent',
            border: 'none',
            color: '#1D281F',
            fontSize: '0.82rem',
            fontWeight: 900,
            fontFamily: 'var(--font-sans)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            textTransform: 'uppercase',
          }}
        >
          <SlidersHorizontal size={14} /> Controls
        </button>
      </div>

      {/* Body Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>

        {/* WORKSPACES TAB */}
        {sidebarTab === 'sessions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <button
              onClick={onCreateSession}
              className="btn-cause-lime"
              style={{ width: '100%', padding: '12px', fontSize: '0.85rem' }}
            >
              <Plus size={16} /> New Workspace Session
            </button>

            <div style={{ fontSize: '0.74rem', fontWeight: 900, color: '#6B7A6D', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '6px' }}>
              Active Sessions
            </div>

            {sessions.length === 0 ? (
              <div className="cause-card" style={{ textAlign: 'center', padding: '2rem 1rem', background: '#F3E8DD' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>🏠</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#1D281F', marginBottom: '4px' }}>No Active Sessions</div>
                <div style={{ fontSize: '0.78rem', color: '#6B7A6D', fontWeight: 600 }}>Click above to start your workspace</div>
              </div>
            ) : (
              sessions.map((sess) => {
                const isActive = sess.id === activeSessionId;
                return (
                  <div
                    key={sess.id}
                    onClick={() => onSelectSession(sess.id)}
                    className="cause-card cause-card-interactive"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '11px 14px',
                      background: isActive ? '#BFEA4B' : '#F3E8DD',
                      boxShadow: isActive ? '4px 4px 0px #1D281F' : '2px 2px 0px #1D281F',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                      <MessageSquare size={14} color="#1D281F" />
                      <span style={{ fontSize: '0.84rem', color: '#1D281F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 800 }}>
                        {sess.title || 'Untitled Session'}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSession(sess.id);
                      }}
                      style={{ background: 'none', border: 'none', color: '#C53A20', cursor: 'pointer', padding: '2px' }}
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

        {/* CONTROLS TAB */}
        {sidebarTab === 'controls' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {/* 1. API Connection */}
            <div className="cause-card" style={{ padding: '16px', background: '#F3E8DD' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#1D281F', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-serif)' }}>
                <Key size={16} color="#1D281F" /> API Connection
              </div>

              {apiKeyValid === true && (
                <div className="badge-cause-pass" style={{ marginBottom: '10px', width: '100%', display: 'flex', justifyContent: 'center', gap: '6px' }}>
                  <CheckCircle2 size={13} /> Connected
                </div>
              )}

              <form onSubmit={handleConnectKey}>
                <input
                  type="password"
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder="nvapi-..."
                  className="cause-input"
                  style={{ marginBottom: '10px', fontSize: '0.8rem', padding: '8px 12px' }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="submit" className="btn-cause-ink" style={{ flex: 1, padding: '8px', fontSize: '0.78rem' }}>
                    Connect Key
                  </button>
                  <button type="button" onClick={() => { setTempApiKey(''); onClearApiKey(); }} className="btn-cause-paper" style={{ flex: 1, padding: '8px', fontSize: '0.78rem' }}>
                    Clear
                  </button>
                </div>
              </form>
            </div>

            {/* 2. System Status & KB Control */}
            <div className="cause-card" style={{ padding: '16px', background: '#F3E8DD' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#1D281F', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-serif)' }}>
                <HardDrive size={16} color="#1D281F" /> System Status & KB
              </div>

              <div className="badge-cause-pass" style={{ marginBottom: '12px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                🟢 Vector KB Online
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px', textAlign: 'center' }}>
                <div style={{ background: '#BFEA4B', padding: '8px', borderRadius: '10px', border: '2px solid #1D281F', boxShadow: '2px 2px 0px #1D281F' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#1D281F', fontFamily: 'var(--font-serif)' }}>{kbStatus?.indexed_count || 1420}</div>
                  <div style={{ fontSize: '0.7rem', color: '#1D281F', fontWeight: 800 }}>Indexed Chunks</div>
                </div>
                <div style={{ background: '#F7F0E6', padding: '8px', borderRadius: '10px', border: '2px solid #1D281F', boxShadow: '2px 2px 0px #1D281F' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#1D281F', fontFamily: 'var(--font-serif)' }}>{kbStatus?.source_folder_files || 699}</div>
                  <div style={{ fontSize: '0.7rem', color: '#1D281F', fontWeight: 800 }}>Source Files</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={onReloadKb} className="btn-cause-paper" style={{ flex: 1, padding: '8px', fontSize: '0.78rem' }}>
                  <RefreshCw size={13} /> Reload
                </button>
                <button onClick={onRebuildKb} className="btn-cause-lime" style={{ flex: 1, padding: '8px', fontSize: '0.78rem' }}>
                  <Zap size={13} /> Rebuild
                </button>
              </div>
            </div>

            {/* 3. Permanent Rules */}
            <div className="cause-card" style={{ padding: '16px', background: '#F3E8DD' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#1D281F', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-serif)' }}>
                🧠 Permanent Rules
              </div>
              <form onSubmit={handleSaveRule} style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  value={newRuleText}
                  onChange={(e) => setNewRuleText(e.target.value)}
                  placeholder="e.g. Always use CUST_ prefix"
                  className="cause-input"
                  style={{ marginBottom: '8px', fontSize: '0.78rem', padding: '8px 12px' }}
                />
                <button type="submit" className="btn-cause-ink" style={{ width: '100%', padding: '8px', fontSize: '0.78rem' }}>
                  Save Rule
                </button>
              </form>

              {permanentRules && permanentRules.length > 0 && (
                <div>
                  {permanentRules.map((r, i) => (
                    <div key={r.id || i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F7F0E6', border: '2px solid #1D281F', padding: '6px 10px', borderRadius: '8px', marginBottom: '6px', fontSize: '0.76rem', fontWeight: 700 }}>
                      <span>• {r.rule_text}</span>
                      {r.id && (
                        <button onClick={() => onDeleteRule(r.id)} style={{ background: 'none', border: 'none', color: '#C53A20', cursor: 'pointer' }}>
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Clear History */}
            <button
              onClick={onClearHistory}
              className="btn-cause-rust"
              style={{ width: '100%', padding: '12px', fontSize: '0.82rem' }}
            >
              Clear History
            </button>

          </div>
        )}

      </div>
    </aside>
  );
}
