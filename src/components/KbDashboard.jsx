import React, { useState, useEffect } from 'react';
import { Database, RefreshCw, Upload, FileText, CheckCircle } from 'lucide-react';

export default function KbDashboard() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/kb/status');
      const data = await res.json();
      setStatus(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleRebuild = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/kb/rebuild', { method: 'POST' });
      const data = await res.json();
      setMessage(data.message);
      fetchStatus();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      await fetch('/api/kb/upload', {
        method: 'POST',
        body: formData,
      });
      setMessage(`Uploaded '${file.name}' to source repository.`);
      fetchStatus();
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ flex: 1, padding: '28px 36px', overflowY: 'auto', background: 'transparent' }}>
      <div style={{ maxWidth: '1050px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-display)' }}>
              <Database color="#38bdf8" size={28} /> Knowledge Base & RAG Index Manager
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '4px' }}>
              Universal file indexing engine (FAISS dense vector + BM25 sparse search). Supports .tdl, .txt, .md, .pdf, .docx, .xlsx.
            </p>
          </div>
          <button onClick={handleRebuild} className="btn-cta-primary" disabled={loading}>
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Rebuilding Index...' : 'Rebuild Index'}
          </button>
        </div>

        {message && (
          <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.35)', padding: '12px 16px', borderRadius: 'var(--radius-md)', color: '#34d399', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={16} /> {message}
          </div>
        )}

        {/* Upload Card */}
        <div className="glass-panel-elevated" style={{ padding: '30px', borderStyle: 'dashed', borderWidth: '2px', borderColor: 'rgba(56,189,248,0.35)', textAlign: 'center' }}>
          <Upload size={36} color="#38bdf8" style={{ margin: '0 auto 10px' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px', fontFamily: 'var(--font-display)' }}>
            Upload TDL Source File
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '16px' }}>
            Drag and drop or select files to add directly to the repository knowledge base
          </p>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <label htmlFor="fileInput" className="btn-cta-secondary" style={{ display: 'inline-flex', cursor: 'pointer' }}>
            {uploading ? 'Uploading...' : 'Browse File'}
          </label>
        </div>

        {/* File Table */}
        <div className="glass-panel-elevated" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '16px', fontFamily: 'var(--font-display)' }}>
            Indexed Repository Source Files ({status?.indexed_count || 0})
          </h3>
          {status?.indexed_files?.length === 0 ? (
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', textAlign: 'center', padding: '2.5rem 0' }}>
              No files indexed yet. Click 'Rebuild Index' above to vectorize all files in the source_files/ folder.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {status?.indexed_files?.map((f) => (
                <div
                  key={f.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={16} color="#38bdf8" />
                    <span style={{ fontSize: '0.88rem', color: '#f8fafc', fontWeight: 600 }}>{f.filename}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.8rem', color: '#94a3b8' }}>
                    <span>Type: {f.file_type}</span>
                    <span className="badge-status-pass">{f.total_chunks} Vector Chunks</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
