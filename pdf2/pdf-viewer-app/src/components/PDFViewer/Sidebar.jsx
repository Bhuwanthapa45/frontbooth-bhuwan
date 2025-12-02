import React from 'react';
import { usePdfiumEngine } from '@embedpdf/engines/react';
import { RenderLayer } from '@embedpdf/plugin-render/react';
import { useScroll } from '@embedpdf/plugin-scroll/react';

export const Sidebar = () => {
  const { engine } = usePdfiumEngine();
  const { provides: scrollProvides } = useScroll();

  // Safely check if document is loaded
  if (!engine || !engine.doc) return null;

  const numPages = engine.doc.numPages || 0;
  const pages = Array.from({ length: numPages }, (_, i) => i);

  return (
    <div className="w-64 border-r border-gray-200 bg-gray-50 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 font-semibold text-gray-600 text-sm uppercase tracking-wider bg-white shadow-sm z-10">
        Pages ({numPages})
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4">
        {pages.map((pageIndex) => (
          <div 
            key={pageIndex}
            className="group cursor-pointer"
            onClick={() => scrollProvides?.jumpToPage(pageIndex)}
          >
            {/* Thumbnail Wrapper */}
            <div className="relative aspect-[3/4] w-full bg-white shadow-sm rounded-md overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all duration-200">
              {/* We reuse RenderLayer with a small scale (0.2) to create a thumbnail.
                 priority={0} ensures these don't slow down the main viewer.
              */}
              <RenderLayer 
                pageIndex={pageIndex} 
                scale={0.2} 
                priority={0} 
              />
              
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                {pageIndex + 1}
              </div>
            </div>
            
            <div className="text-center mt-1 text-xs text-gray-500 font-medium">
              Page {pageIndex + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};