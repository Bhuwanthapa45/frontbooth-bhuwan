import React from 'react';
import { UploadCloud } from 'lucide-react';

export const FileUpload = ({ onFileSelect }) => {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    } else {
      alert('Please select a valid PDF file.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full border border-gray-100">
        <div className="bg-blue-50 p-4 rounded-full inline-block mb-4">
          <UploadCloud className="w-12 h-12 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Upload Document</h1>
        <p className="text-gray-500 mb-8">Select a PDF file from your device to view and interact with it.</p>
        
        <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95">
          <span>Choose PDF</span>
          <input 
            type="file" 
            accept="application/pdf" 
            className="hidden" 
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};