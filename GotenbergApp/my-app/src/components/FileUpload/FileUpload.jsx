"use client";

import React, { useState } from "react";
import { UploadCloud } from "lucide-react";

export const FileUpload = ({ onPdfReady }) => {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (data?.pdfUrl) {
      onPdfReady(data.pdfUrl);
    } else {
      alert("Upload failed");
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex items-center justify-center">
      <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg">
        {loading ? "Uploading..." : "Choose a File"}
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>
    </div>
  );
};
