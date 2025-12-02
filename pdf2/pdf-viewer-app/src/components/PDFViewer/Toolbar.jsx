import React from 'react';
import { useZoom } from '@embedpdf/plugin-zoom/react';
import { useViewportCapability } from '@embedpdf/plugin-viewport/react'; // 1. New Import
import { 
  ZoomIn, 
  ZoomOut, 
  ArrowUpToLine,   // New Icon
  ArrowDownToLine  // New Icon
} from 'lucide-react';

export const Toolbar = () => {
  // Access Zoom State
  const { provides: zoomProvides, state: zoomState } = useZoom();
  
  // 2. Access Viewport Capabilities (for scrolling)
  const { provides: viewport } = useViewportCapability();

  if (!zoomProvides) return null;

  // 3. Helper functions for Programmatic Scrolling
  const handleScrollToTop = () => {
    // Scroll to X:0, Y:0 (Top Left)
    viewport?.scrollTo({ x: 0, y: 0, behavior: 'smooth' });
  };

  const handleScrollToBottom = () => {
    // Scroll to a large Y value to hit the bottom
    viewport?.scrollTo({ x: 0, y: 999999, behavior: 'smooth' });
  };

  return (
    <div className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4 shadow-sm z-10 relative">
      {/* LEFT: Title */}
      <div className="flex items-center space-x-2">
        <span className="font-bold text-gray-700 text-lg">PDF Viewer</span>
      </div>

      {/* CENTER: Navigation Controls (New Feature) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
        <button 
          onClick={handleScrollToTop}
          className="flex items-center space-x-1 px-3 py-1 hover:bg-white rounded-md transition-colors text-gray-700 text-sm font-medium"
          title="Scroll to Top"
        >
          <ArrowUpToLine size={16} />
          <span>Top</span>
        </button>
        <div className="w-px h-4 bg-gray-300 mx-1"></div>
        <button 
          onClick={handleScrollToBottom}
          className="flex items-center space-x-1 px-3 py-1 hover:bg-white rounded-md transition-colors text-gray-700 text-sm font-medium"
          title="Scroll to Bottom"
        >
          <span>Bottom</span>
          <ArrowDownToLine size={16} />
        </button>
      </div>

      {/* RIGHT: Zoom Controls & Reset */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          <button 
            onClick={zoomProvides.zoomOut}
            className="p-2 hover:bg-white rounded-md transition-colors text-gray-700"
            title="Zoom Out"
          >
            <ZoomOut size={18} />
          </button>
          <span className="w-16 text-center text-sm font-medium text-gray-600">
            {Math.round(zoomState.currentZoomLevel * 100)}%
          </span>
          <button 
            onClick={zoomProvides.zoomIn}
            className="p-2 hover:bg-white rounded-md transition-colors text-gray-700"
            title="Zoom In"
          >
            <ZoomIn size={18} />
          </button>
        </div>

        <button 
          onClick={() => zoomProvides.requestZoom(1.0)}
          className="p-2 hover:bg-gray-100 rounded-md text-gray-600 text-sm font-medium"
        >
          Reset
        </button>
      </div>
    </div>
  );
};