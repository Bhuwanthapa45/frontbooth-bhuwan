import React, { useState, useEffect } from 'react';
import { useZoom } from '@embedpdf/plugin-zoom/react';
import { useViewportCapability } from '@embedpdf/plugin-viewport/react';
import { useScroll } from '@embedpdf/plugin-scroll/react';
import { useSelectionCapability } from '@embedpdf/plugin-selection/react'; 
import { useExportCapability } from '@embedpdf/plugin-export/react';

import { 
  ZoomIn, 
  ZoomOut, 
  ArrowUpToLine, 
  ArrowDownToLine,
  ChevronLeft,
  ChevronRight,
  Copy // 2. New Icon
} from 'lucide-react';

export const Toolbar = () => {
  // --- Hooks ---
  const { provides: zoomProvides, state: zoomState } = useZoom();
  const { provides: viewport } = useViewportCapability();
  const { provides: scroll, state: scrollState } = useScroll();
  const { provides: exportApi } = useExportCapability();
 
  const { provides: selection } = useSelectionCapability(); // 3. Access Selection

  // Local state for the page input box
  const [pageInput, setPageInput] = useState(1);
  const [hasSelection, setHasSelection] = useState(false); // 4. Track if text is selected

  // Sync the input box whenever the actual page changes
  useEffect(() => {
    if (scrollState?.currentPage !== undefined) {
      setPageInput(scrollState.currentPage + 1); 
    }
  }, [scrollState?.currentPage]);

  // 5. Monitor Selection Changes
  useEffect(() => {
    if (!selection) return;
    return selection.onSelectionChange((sel) => {
      setHasSelection(!!sel); // Enable button if selection exists
    });
  }, [selection]);

  // Ensure plugins are ready
  if (!zoomProvides || !scroll) return null;

  // --- Handlers ---

  const handlePageInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      const pageNumber = parseInt(e.target.value, 10);
      const totalPages = scrollState?.totalPages || 0;

      if (pageNumber > 0 && pageNumber <= totalPages) {
        scroll.jumpToPage(pageNumber - 1);
        e.target.blur();
      } else {
        setPageInput((scrollState?.currentPage ?? 0) + 1);
      }
    }
  };

  const handleScrollToTop = () => viewport?.scrollTo({ x: 0, y: 0, behavior: 'smooth' });
  const handleScrollToBottom = () => viewport?.scrollTo({ x: 0, y: 999999, behavior: 'smooth' });

  // 6. Copy Handler
  const handleCopy = () => {
    selection?.copyToClipboard();
  };

  const currentPage = scrollState?.currentPage ?? 0;
  const totalPages = scrollState?.totalPages ?? 0;

  return (
    <div className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4 shadow-sm z-10 relative">
      {/* LEFT: Title */}
      <div className="flex items-center space-x-2 w-1/4">
        <span className="font-bold text-gray-700 text-lg hidden md:block">PDF Viewer</span>
      </div>

      {/* CENTER: Navigation Group */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center bg-gray-100 rounded-lg p-1 shadow-inner">
        
        {/* Page Navigation Section */}
        <div className="flex items-center space-x-1 pr-2 border-r border-gray-300">
          <button 
            onClick={() => scroll.scrollToPreviousPage()}
            disabled={currentPage === 0}
            className="p-1 hover:bg-white rounded-md disabled:opacity-30 text-gray-700"
            title="Previous Page"
          >
            <ChevronLeft size={18} />
          </button>
          
          <div className="flex items-center space-x-1">
            <span className="text-gray-500 text-sm pl-1">Page</span>
            <input 
              type="number"
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              onKeyDown={handlePageInputKeyDown}
              className="w-12 text-center text-sm font-medium bg-transparent border-b border-gray-400 focus:border-blue-500 focus:outline-none no-spinners"
            />
            <span className="text-gray-500 text-sm">
              of {totalPages}
            </span>
          </div>

          <button 
            onClick={() => scroll.scrollToNextPage()}
            disabled={currentPage === totalPages - 1}
            className="p-1 hover:bg-white rounded-md disabled:opacity-30 text-gray-700"
            title="Next Page"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Viewport Scrolling */}
        <div className="flex items-center space-x-1 pl-2">
          <button onClick={handleScrollToTop} className="p-1 hover:bg-white rounded-md text-gray-700" title="Scroll to Top">
            <ArrowUpToLine size={16} />
          </button>
          <button onClick={handleScrollToBottom} className="p-1 hover:bg-white rounded-md text-gray-700" title="Scroll to Bottom">
            <ArrowDownToLine size={16} />
          </button>
        </div>
      </div>

      {/* RIGHT: Tools & Zoom */}
      <div className="flex items-center space-x-2 w-1/4 justify-end">
        {/* Copy Button */}
        <button 
          onClick={handleCopy}
          disabled={!hasSelection}
          className={`p-2 rounded-md transition-colors flex items-center space-x-1 ${
            hasSelection 
              ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
              : 'text-gray-300 cursor-not-allowed'
          }`}
          title="Copy Selected Text"
        >
          <Copy size={18} />
          {hasSelection && <span className="text-xs font-semibold">Copy</span>}
        </button>

        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          <button onClick={() => zoomProvides.zoomOut()} className="p-2 hover:bg-white rounded-md transition-colors text-gray-700" title="Zoom Out">
            <ZoomOut size={18} />
          </button>
          <span className="w-14 text-center text-sm font-medium text-gray-600">
            {Math.round(zoomState.currentZoomLevel * 100)}%
          </span>
          <button onClick={() => zoomProvides.zoomIn()} className="p-2 hover:bg-white rounded-md transition-colors text-gray-700" title="Zoom In">
            <ZoomIn size={18} />
          </button>
        </div>

        <button 
          onClick={() => zoomProvides.requestZoom(1.0)}
          className="p-2 hover:bg-gray-100 rounded-md text-gray-600 text-sm font-medium hidden lg:block"
        >
          Reset
        </button>
        <button onClick={() => exportApi?.download()} disabled={!exportApi}>
      Download
    </button>
      </div>
    </div>
  );
};