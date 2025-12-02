import React from 'react'
import { useZoom } from '@embedpdf/plugin-zoom/react'

export default function Toolbar() {
  const { provides: zoomProvides, state: zoomState } = useZoom()

  return (
    <div className="toolbar">
      {zoomProvides && (
        <>
          <button onClick={() => zoomProvides.zoomOut()}>-</button>
          <span>{Math.round(zoomState.currentZoomLevel * 100)}%</span>
          <button onClick={() => zoomProvides.zoomIn()}>+</button>
          <button onClick={() => zoomProvides.requestZoom(1)}>Reset</button>
        </>
      )}
    </div>
  )
}