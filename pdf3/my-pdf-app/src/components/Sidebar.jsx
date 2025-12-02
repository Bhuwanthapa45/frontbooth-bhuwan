import React from 'react';
import { Document, Page, Outline } from 'react-pdf'; // Imported Document
import { Maximize, Menu, X } from 'lucide-react';

const Sidebar = ({ 
  file, 
  numPages, 
  currentPage, 
  onPageClick, 
  isOpen, 
  onClose,
  activeTab,
  setActiveTab 
}) => {
  return (
    <div className={`sidebar ${!isOpen ? 'closed' : ''}`}>
      <div className="sidebar-header">
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className={`toolbar-btn ${activeTab === 'thumbs' ? 'active' : ''}`}
            onClick={() => setActiveTab('thumbs')}
            title="Thumbnails"
          >
            <Maximize size={18} />
          </button>
          <button 
            className={`toolbar-btn ${activeTab === 'outline' ? 'active' : ''}`}
            onClick={() => setActiveTab('outline')}
            title="Outline"
          >
            <Menu size={18} />
          </button>
        </div>
        <button className="toolbar-btn" onClick={onClose}><X size={18} /></button>
      </div>

      <div className="sidebar-content">
        {/* We must wrap Sidebar content in Document to allow Page/Outline to work */}
        <Document file={file} loading={<div style={{padding: 10}}>Loading sidebar...</div>}>
            {activeTab === 'thumbs' ? (
            Array.from(new Array(numPages || 0), (el, index) => (
                <div 
                key={`thumb_${index + 1}`}
                className={`thumbnail-container ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => onPageClick(index + 1)}
                >
                <div style={{ pointerEvents: 'none', height: '150px', overflow: 'hidden', background: 'white', display: 'flex', justifyContent: 'center' }}>
                    <Page 
                    pageNumber={index + 1} 
                    width={180} 
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    loading={<div className="spinner" style={{marginTop: 50}}/>}
                    />
                </div>
                <div className="thumbnail-label">Page {index + 1}</div>
                </div>
            ))
            ) : (
            <div style={{ padding: '0 10px' }}>
                <Outline onItemClick={({ pageNumber }) => onPageClick(pageNumber)} />
            </div>
            )}
        </Document>
      </div>
    </div>
  );
};

export default Sidebar;
