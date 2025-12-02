import React, { useState } from 'react'
import PdfViewer from './components/PdfViewer'

export default function App() {
  const [fileUrl, setFileUrl] = useState(null)

  const onFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileUrl(URL.createObjectURL(file))
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1 className="logo">EmbedPDF Viewer</h1>

        <label htmlFor="file" className="upload-btn">Upload PDF</label>
        <input
          id="file"
          type="file"
          accept="application/pdf"
          onChange={onFileChange}
          style={{ display: 'none' }}
        />
      </header>

      <main className="app-main">
        {fileUrl ? (
          <PdfViewer fileUrl={fileUrl} />
        ) : (
          <div className="placeholder">No PDF selected</div>
        )}
      </main>
    </div>
  )
}