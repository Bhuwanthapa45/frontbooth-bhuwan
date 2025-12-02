import React from 'react';
import { EmbedPDF } from '@embedpdf/core/react';
import { usePdfiumEngine } from '@embedpdf/engines/react';
import { Viewport } from '@embedpdf/plugin-viewport/react';
import { Scroller } from '@embedpdf/plugin-scroll/react';
import { RenderLayer } from '@embedpdf/plugin-render/react';
import { SelectionLayer } from '@embedpdf/plugin-selection/react'; // Add selection layer

import { useViewerPlugins } from '../../hooks/useViewerPlugins';
import { Toolbar } from './Toolbar';
import { Sidebar } from './Sidebar';
import { Spinner } from '../Spinner';

export const ViewerContainer = ({ fileUrl }) => {
  // 1. Initialize the Engine
  const { engine, isLoading, error } = usePdfiumEngine();
  
  // 2. Initialize Plugins
  const plugins = useViewerPlugins(fileUrl);

  if (isLoading || !engine) return <Spinner />;
  if (error) return <div className="text-red-500 p-10">Error loading engine: {error.message}</div>;

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* 3. Wrap everything in the EmbedPDF Provider */}
      <EmbedPDF engine={engine} plugins={plugins}>
        
        {/* Custom Toolbar */}
        <Toolbar />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar for Thumbnails */}
          <Sidebar />

          {/* Main Viewport Area */}
          <div className="flex-1 relative bg-gray-100">
            <Viewport>
              <Scroller renderPage={({ width, height, pageIndex, scale }) => (
                <div style={{ width, height }} className="relative shadow-md mb-4 bg-white">
                  {/* Layers are stacked: Render (image) -> Selection (text) */}
                  <RenderLayer pageIndex={pageIndex} scale={scale} />
                  <SelectionLayer pageIndex={pageIndex} scale={scale} />
                </div>
              )} />
            </Viewport>
          </div>
        </div>

      </EmbedPDF>
    </div>
  );
};