"use client";

import { useState } from "react";
import { FileUpload } from "@/components/FileUpload/FileUpload";
import { ViewerContainer } from "@/components/PDFViewer/ViewerContainer";

export default function HomePage() {
  const [pdfUrl, setPdfUrl] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {!pdfUrl ? (
        <FileUpload onPdfReady={setPdfUrl} />
      ) : (
        <ViewerContainer key={pdfUrl} fileUrl={pdfUrl} />
      )}
    </div>
  );
}
