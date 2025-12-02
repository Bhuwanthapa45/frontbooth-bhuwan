import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Search } from 'lucide-react';

// Styles
import './styles/App.css';

// Components
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import FileUpload from './components/FileUpload';

// Worker Setup (Required for react-pdf)
// Note: In Vite, you might need to copy the worker to public or use the CDN method below.
// Using CDN is often the easiest way to avoid build configuration headaches.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const App = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarTab, setSidebarTab] = useState('thumbs');

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset) => {
    setPageNumber(prev => Math.min(Math.max(1, prev + offset), numPages || 1));
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!file) return;
      if (e.key === 'ArrowRight') changePage(1);
      if (e.key === 'ArrowLeft') changePage(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [file, numPages]);

  if (!file) {
    return (
      <div className="app-container">
        <FileUpload onFileSelect={setFile} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Toolbar 
        pageNumber={pageNumber}
        numPages={numPages}
        scale={scale}
        onPageChange={changePage}
        onZoomIn={() => setScale(s => Math.min(s + 0.2, 3.0))}
        onZoomOut={() => setScale(s => Math.max(s - 0.2, 0.5))}
        onRotate={() => setRotation(r => (r + 90) % 360)}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onCloseFile={() => setFile(null)}
      />

      <div className="main-content">
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          file={file}
          numPages={numPages}
          currentPage={pageNumber}
          onPageClick={setPageNumber}
          activeTab={sidebarTab}
          setActiveTab={setSidebarTab}
        />

        <div className="pdf-viewer-container" onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => alert('Error loading PDF: ' + error.message)}
            loading={<div className="spinner"></div>}
            className="pdf-document"
          >
            <Page 
              pageNumber={pageNumber} 
              scale={scale} 
              rotate={rotation}
              className="pdf-page"
              renderTextLayer={true} 
              renderAnnotationLayer={true}
              loading={<div className="spinner"></div>}
            />
          </Document>
          
          <div style={{ 
            position: 'absolute', 
            bottom: '20px', 
            right: '20px', 
            background: 'rgba(0,0,0,0.7)', 
            padding: '8px 12px', 
            borderRadius: '4px', 
            fontSize: '12px',
            color: 'white',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Search size={14} />
            <span>Use Ctrl+F to search</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;