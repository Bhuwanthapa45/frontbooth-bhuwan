import React from 'react';
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight, RotateCw, X, Menu } from 'lucide-react';

const Toolbar = ({ 
  pageNumber, 
  numPages, 
  scale, 
  onPageChange, 
  onZoomIn, 
  onZoomOut, 
  onRotate, 
  onToggleSidebar, 
  onCloseFile 
}) => {
  
  const handlePageInput = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1 && val <= (numPages || 1)) {
      onPageChange(val - pageNumber); // Convert absolute to relative for the handler, or adjust handler
    }
  };

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <button className="toolbar-btn" onClick={onToggleSidebar} title="Toggle Sidebar">
          <Menu size={20} />
        </button>
        <div className="hide-mobile" style={{ fontWeight: 600, fontSize: '18px' }}>
          PDF Viewer
        </div>
      </div>

      <div className="toolbar-group">
        <button className="toolbar-btn" onClick={() => onPageChange(-1)} disabled={pageNumber <= 1}>
          <ChevronLeft size={20} />
        </button>
        <span style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
          Page 
          <input 
            className="page-input" 
            type="number" 
            value={pageNumber} 
            onChange={(e) => {
               const val = parseInt(e.target.value);
               if (!isNaN(val)) onPageChange(val - pageNumber);
            }} 
          />
          of {numPages || '--'}
        </span>
        <button className="toolbar-btn" onClick={() => onPageChange(1)} disabled={pageNumber >= numPages}>
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="toolbar-group">
        <button className="toolbar-btn" onClick={onZoomOut} title="Zoom Out"><ZoomOut size={20} /></button>
        <span className="hide-mobile" style={{ fontSize: '14px', width: '40px', textAlign: 'center' }}>
          {Math.round(scale * 100)}%
        </span>
        <button className="toolbar-btn" onClick={onZoomIn} title="Zoom In"><ZoomIn size={20} /></button>
        <button className="toolbar-btn hide-mobile" onClick={onRotate} title="Rotate"><RotateCw size={18} /></button>
        <button className="toolbar-btn hide-mobile" onClick={onCloseFile} title="Close File"><X size={20} /></button>
      </div>
    </div>
  );
};

export default Toolbar;
