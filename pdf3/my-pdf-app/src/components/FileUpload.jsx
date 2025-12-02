import React, { useRef } from 'react';
import { Upload, FileText } from 'lucide-react';

const FileUpload = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    } else {
      alert('Please select a valid PDF file.');
    }
  };

  return (
    <div className="upload-screen">
      <div style={{ maxWidth: '400px', padding: '40px', background: 'var(--bg-panel)', borderRadius: '12px' }}>
        <FileText size={64} style={{ marginBottom: '20px', color: 'var(--accent)' }} />
        <h2>PDF Viewer Pro</h2>
        <p>A secure, modular, and production-ready PDF viewer built with React.</p>
        
        <input 
          type="file" 
          accept="application/pdf" 
          onChange={handleFileChange} 
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        
        <button 
          className="upload-btn" 
          onClick={() => fileInputRef.current.click()}
        >
          <Upload size={20} />
          Select PDF Document
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
