import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ChatWorkspace from './components/ChatWorkspace';
import AstInspector from './components/AstInspector';
import MemoryManager from './components/MemoryManager';
import KbDashboard from './components/KbDashboard';
import AuthModal from './components/AuthModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedModel, setSelectedModel] = useState('z-ai/glm-5.2');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // User Auth State
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('causehouse_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user:', e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('causehouse_user');
    setUser(null);
  };

  // API & System state
  const [apiKey, setApiKey] = useState('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');
  const [apiKeyValid, setApiKeyValid] = useState(true);
  const [kbStatus, setKbStatus] = useState({ indexed_count: 1420, source_folder_files: 699 });
  const [permanentRules, setPermanentRules] = useState([]);

  // Model Parameters
  const [modelParams, setModelParams] = useState({
    temperature: 0.4,
    topP: 0.9,
    maxTokens: 8192,
    maxContext: 8,
    stream: true,
    showContext: true,
    autoValidate: true,
    autoTune: true,
  });

  // Chat sessions state
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch initial data
  const fetchSessions = async () => {
    try {
      const res = await fetch('/api/chat/sessions');
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
        if (data.length > 0 && !activeSessionId) {
          setActiveSessionId(data[0].id);
        }
      }
    } catch (e) {
      console.error('Failed to fetch sessions:', e);
    }
  };

  const fetchKbStatus = async () => {
    try {
      const res = await fetch('/api/kb/status');
      if (res.ok) {
        const data = await res.json();
        setKbStatus(data);
      }
    } catch (e) {
      console.error('Failed to fetch KB status:', e);
    }
  };

  const fetchRules = async () => {
    try {
      const res = await fetch('/api/rules');
      if (res.ok) {
        const data = await res.json();
        setPermanentRules(data);
      }
    } catch (e) {
      console.error('Failed to fetch rules:', e);
    }
  };

  const fetchMessages = async (sessionId) => {
    if (!sessionId) return;
    try {
      const res = await fetch(`/api/chat/sessions/${sessionId}/messages`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (e) {
      console.error('Failed to fetch messages:', e);
    }
  };

  useEffect(() => {
    fetchSessions();
    fetchKbStatus();
    fetchRules();
  }, []);

  useEffect(() => {
    if (activeSessionId) {
      fetchMessages(activeSessionId);
    }
  }, [activeSessionId]);

  const handleCreateSession = async () => {
    try {
      const res = await fetch('/api/chat/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New TDL Workspace Session', model_name: selectedModel }),
      });
      if (res.ok) {
        const newSession = await res.json();
        setSessions([newSession, ...sessions]);
        setActiveSessionId(newSession.id);
        setMessages([]);
      }
    } catch (e) {
      console.error('Failed to create session:', e);
    }
  };

  const handleDeleteSession = async (id) => {
    try {
      await fetch(`/api/chat/sessions/${id}`, { method: 'DELETE' });
      const updated = sessions.filter((s) => s.id !== id);
      setSessions(updated);
      if (activeSessionId === id) {
        setActiveSessionId(updated.length > 0 ? updated[0].id : null);
        setMessages([]);
      }
    } catch (e) {
      console.error('Failed to delete session:', e);
    }
  };

  const handleSendMessage = async (msgText) => {
    if (!msgText.trim()) return;

    let currentSessionId = activeSessionId;
    if (!currentSessionId) {
      try {
        const res = await fetch('/api/chat/sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: msgText.slice(0, 35) + '...', model_name: selectedModel }),
        });
        if (res.ok) {
          const newSession = await res.json();
          currentSessionId = newSession.id;
          setActiveSessionId(currentSessionId);
          setSessions([newSession, ...sessions]);
        }
      } catch (e) {
        console.error('Failed to create initial session:', e);
        return;
      }
    }

    const tempUserMsg = {
      id: Date.now(),
      session_id: currentSessionId,
      role: 'user',
      content: msgText,
    };
    setMessages((prev) => [...prev, tempUserMsg]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: currentSessionId,
          message: msgText,
          model_name: selectedModel,
          api_key: apiKey || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const botMsg = await res.json();
      await fetchMessages(currentSessionId);
      await fetchSessions();
    } catch (e) {
      console.error('Failed to send message:', e);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          session_id: currentSessionId,
          role: 'assistant',
          content: `⚠️ Failed to get response from AI backend: ${e.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // API Key handlers
  const handleConnectApiKey = (key) => {
    setApiKey(key);
    setApiKeyValid(true);
  };

  const handleClearApiKey = () => {
    setApiKey('');
    setApiKeyValid(false);
  };

  // KB handlers
  const handleReloadKb = () => {
    fetchKbStatus();
  };

  const handleRebuildKb = async () => {
    try {
      const res = await fetch('/api/kb/rebuild', { method: 'POST' });
      if (res.ok) {
        await res.json();
        fetchKbStatus();
      }
    } catch (e) {
      console.error('Failed to rebuild KB:', e);
    }
  };

  // Permanent rules handlers
  const handleAddRule = async (ruleText) => {
    try {
      const res = await fetch('/api/rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rule_text: ruleText, rule_type: 'custom' }),
      });
      if (res.ok) {
        const newRule = await res.json();
        setPermanentRules([newRule, ...permanentRules]);
      }
    } catch (e) {
      console.error('Failed to add rule:', e);
    }
  };

  const handleDeleteRule = async (id) => {
    try {
      await fetch(`/api/rules/${id}`, { method: 'DELETE' });
      setPermanentRules(permanentRules.filter((r) => r.id !== id));
    } catch (e) {
      console.error('Failed to delete rule:', e);
    }
  };

  // File upload handler
  const handleUploadFiles = async (files, persist) => {
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        await fetch('/api/kb/upload', {
          method: 'POST',
          body: formData,
        });
      } catch (e) {
        console.error('Failed to upload file:', e);
      }
    }
    fetchKbStatus();
  };

  const handleClearHistory = () => {
    if (activeSessionId) {
      handleDeleteSession(activeSessionId);
    }
  };

  return (
    <div className="app-layout">
      {/* Top CauseHouse Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* Sidebar */}
        <Sidebar
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSelectSession={(id) => {
            setActiveSessionId(id);
            setMobileSidebarOpen(false);
          }}
          onCreateSession={handleCreateSession}
          onDeleteSession={handleDeleteSession}
          apiKey={apiKey}
          setApiKey={setApiKey}
          apiKeyValid={apiKeyValid}
          onConnectApiKey={handleConnectApiKey}
          onClearApiKey={handleClearApiKey}
          kbStatus={kbStatus}
          onReloadKb={handleReloadKb}
          onRebuildKb={handleRebuildKb}
          permanentRules={permanentRules}
          onAddRule={handleAddRule}
          onDeleteRule={handleDeleteRule}
          onUploadFiles={handleUploadFiles}
          modelParams={modelParams}
          setModelParams={setModelParams}
          onQuickPrompt={handleSendMessage}
          onClearHistory={handleClearHistory}
          isOpenOnMobile={mobileSidebarOpen}
        />

        {/* Main Workspaces */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {activeTab === 'chat' && (
            <ChatWorkspace
              messages={messages}
              onSendMessage={handleSendMessage}
              loading={loading}
              showContext={modelParams.showContext}
              autoValidate={modelParams.autoValidate}
              autoTune={modelParams.autoTune}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          )}
          {activeTab === 'ast' && <AstInspector />}
          {activeTab === 'rules' && <MemoryManager />}
          {activeTab === 'kb' && <KbDashboard />}
        </div>
      </div>

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(u) => setUser(u)}
      />
    </div>
  );
}
