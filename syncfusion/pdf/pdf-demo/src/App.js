import React, { useRef } from "react";
import "./index.css";
import {
  PdfViewerComponent,
  Toolbar,
  Magnification,
  Navigation,
  LinkAnnotation,
  BookmarkView,
  ThumbnailView,
  Print,
  TextSelection,
  Annotation,
  TextSearch,
  FormFields,
  FormDesigner,
  Inject
} from "@syncfusion/ej2-react-pdfviewer";

function App() {
  const viewerRef = useRef(null);

  // Convert ArrayBuffer → base64
  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  // Handle PDF upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const buffer = await file.arrayBuffer();
    const base64String = arrayBufferToBase64(buffer);

    // Load the PDF into Syncfusion Viewer
    viewerRef.current.load(base64String, null);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>PDF Viewer with Upload</h2>

      {/* File Upload */}
     <div style={{ margin: "20px", textAlign: "center" }}>
  <input
    type="file"
    accept="application/pdf"
    onChange={handleFileUpload}
  />

  {/* Export Button */}
  <button
    style={{ marginLeft: "15px", padding: "8px 15px" }}
    onClick={() => viewerRef.current.download()}
  >
    Download Edited PDF
  </button>
</div>

      {/* PDF Viewer */}
      <div className="control-section" style={{ height: "90vh" }}>
        <PdfViewerComponent
          id="pdfViewer"
          ref={viewerRef}
          resourceUrl="https://cdn.syncfusion.com/ej2/31.2.2/dist/ej2-pdfviewer-lib"
          style={{ height: "100%" }}
        >
          <Inject
            services={[
              Toolbar,
              Magnification,
              Navigation,
              Annotation,
              LinkAnnotation,
              BookmarkView,
              ThumbnailView,
              Print,
              TextSelection,
              TextSearch,
              FormFields,
              FormDesigner
            ]}
          />
        </PdfViewerComponent>
      </div>
    </div>
  );
}

export default App;
