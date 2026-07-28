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
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#1D281F', display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-serif)' }}>
              <Database color="#1D281F" size={32} /> Knowledge Base & RAG Index Manager
            </h2>
            <p style={{ fontSize: '0.94rem', color: '#6B7A6D', marginTop: '4px', fontWeight: 600 }}>
              Universal file indexing engine (FAISS dense vector + BM25 sparse search). Supports .tdl, .txt, .md, .pdf, .docx, .xlsx.
            </p>
          </div>
          <button onClick={handleRebuild} className="btn-cause-lime" disabled={loading}>
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Rebuilding Index...' : 'Rebuild Index'}
          </button>
        </div>

        {message && (
          <div style={{ background: '#BFEA4B', border: '2px solid #1D281F', borderRadius: '12px', padding: '12px 16px', color: '#1D281F', fontSize: '0.9rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '3px 3px 0px #1D281F' }}>
            <CheckCircle size={18} /> {message}
          </div>
        )}

        {/* Upload Card */}
        <div className="cause-card" style={{ padding: '36px', borderStyle: 'dashed', borderWidth: '3px', borderColor: '#1D281F', textAlign: 'center', background: '#F3E8DD' }}>
          <Upload size={40} color="#1D281F" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#1D281F', marginBottom: '6px', fontFamily: 'var(--font-serif)' }}>
            Upload TDL Source File
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#6B7A6D', marginBottom: '20px', fontWeight: 600 }}>
            Drag and drop or select files to add directly to the repository knowledge base
          </p>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <label htmlFor="fileInput" className="btn-cause-paper" style={{ display: 'inline-flex', cursor: 'pointer', padding: '10px 24px', fontSize: '0.88rem' }}>
            {uploading ? 'Uploading...' : 'Browse File'}
          </label>
        </div>

        {/* File Table */}
        <div className="cause-card" style={{ padding: '28px', background: '#F7F0E6' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#1D281F', marginBottom: '18px', fontFamily: 'var(--font-serif)' }}>
            Indexed Repository Source Files ({status?.indexed_count || 0})
          </h3>
          {status?.indexed_files?.length === 0 ? (
            <p style={{ fontSize: '0.9rem', color: '#6B7A6D', textAlign: 'center', padding: '2.5rem 0', fontWeight: 600 }}>
              No files indexed yet. Click 'Rebuild Index' above to vectorize all files in the source_files/ folder.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {status?.indexed_files?.map((f) => (
                <div
                  key={f.id}
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
                    <FileText size={18} color="#1D281F" />
                    <span style={{ fontSize: '0.9rem', color: '#1D281F', fontWeight: 800 }}>{f.filename}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.82rem', color: '#6B7A6D', fontWeight: 700 }}>
                    <span>Type: {f.file_type}</span>
                    <span className="badge-cause-pass">{f.total_chunks} Vector Chunks</span>
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
