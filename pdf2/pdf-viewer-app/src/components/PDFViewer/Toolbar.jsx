import React from 'react';
import { useZoom } from '@embedpdf/plugin-zoom/react';
import { useRotate } from '@embedpdf/plugin-rotate/react'; // Assuming standard export
import { ZoomIn, ZoomOut, RotateCw, RotateCcw, Maximize } from 'lucide-react';

export const Toolbar = () => {
  // Access Zoom State
  const { provides: zoomProvides, state: zoomState } = useZoom();
  
  // Note: Depending on the specific version, Rotate might be exposed differently. 
  // If useRotate isn't directly available, we can rely on engine transforms, 
  // but usually plugins expose a hook or a component.
  // For safety in this demo, we'll focus on the confirmed Zoom hooks which are critical.

  if (!zoomProvides) return null;

  return (
    <div className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4 shadow-sm z-10">
      <div className="flex items-center space-x-2">
        <span className="font-bold text-gray-700 text-lg">PDF Viewer</span>
      </div>

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

      <div className="flex items-center space-x-2">
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