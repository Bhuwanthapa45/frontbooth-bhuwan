import React, { useMemo } from 'react'

import { EmbedPDF } from '@embedpdf/core/react'
import { createPluginRegistration } from '@embedpdf/core'
import { usePdfiumEngine } from '@embedpdf/engines/react'

// Stable Plugins
import { LoaderPluginPackage } from '@embedpdf/plugin-loader/react'
import { Viewport, ViewportPluginPackage } from '@embedpdf/plugin-viewport/react'
import { Scroller, ScrollPluginPackage } from '@embedpdf/plugin-scroll/react'
import { RenderLayer, RenderPluginPackage } from '@embedpdf/plugin-render/react'
import { ThumbnailSidebar, ThumbnailPluginPackage } from '@embedpdf/plugin-thumbnail/react'
import { ZoomPluginPackage } from '@embedpdf/plugin-zoom/react'
import { SelectionLayer, SelectionPluginPackage } from '@embedpdf/plugin-selection/react'
import { PanPluginPackage } from '@embedpdf/plugin-pan/react'


import Toolbar from './Toolbar'

export default function PdfViewer({ fileUrl }) {
  const { engine, isLoading } = usePdfiumEngine()

  const plugins = useMemo(() => [
    createPluginRegistration(LoaderPluginPackage, {
      loadingOptions: {
        type: 'url',
        pdfFile: fileUrl ? { id: 'pdf', url: fileUrl } : undefined,
      },
    }),

    createPluginRegistration(ViewportPluginPackage),
    createPluginRegistration(ScrollPluginPackage),
    createPluginRegistration(RenderPluginPackage),
    createPluginRegistration(ThumbnailPluginPackage),
    createPluginRegistration(ZoomPluginPackage),
    createPluginRegistration(SelectionPluginPackage),
    createPluginRegistration(PanPluginPackage)
  ], [fileUrl])

  if (isLoading || !engine) {
    return <div className="viewer-loading">Loading PDF Engine...</div>
  }

  return (
    <div className="pdf-viewer-root">
      <EmbedPDF engine={engine} plugins={plugins}>
        <Toolbar />

        <div className="viewer-body">
          <aside className="thumbnail-column">
            <ThumbnailSidebar />
          </aside>

          <section className="viewport-column">
            <Viewport style={{ width: '100%', height: '100%' }}>
              <Scroller
                renderPage={({ width, height, pageIndex, scale }) => (
                  <div style={{ width, height }}>
                    <RenderLayer pageIndex={pageIndex} scale={scale} />
                    <SelectionLayer pageIndex={pageIndex} />
                  </div>
                )}
              />
            </Viewport>
          </section>
        </div>
      </EmbedPDF>
    </div>
  )
}