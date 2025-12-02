import React, { useState, useEffect } from 'react';
import { FileUpload } from './components/FileUpload/FileUpload';
import { ViewerContainer } from './components/PDFViewer/ViewerContainer';

function App() {
  const [fileUrl, setFileUrl] = useState(null);

  const handleFileSelect = (file) => {
    // Create a temporary blob URL for the uploaded file
    const url = URL.createObjectURL(file);
    setFileUrl(url);
  };

  // Cleanup blob URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  return (
    <div className="min-h-screen bg-gray-50">
      {!fileUrl ? (
        <FileUpload onFileSelect={handleFileSelect} />
      ) : (
        // Key forces re-mount if URL changes, ensuring clean plugin initialization
        <ViewerContainer key={fileUrl} fileUrl={fileUrl} />
      )}
    </div>
  );
}

export default App;