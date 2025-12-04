"use client";
import { useSearchParams } from "next/navigation";
import PdfViewer from "@/components/PdfViewer";

export default function ViewerPage() {
  const search = useSearchParams();
  const url = search.get("url");
  if (!url) return <p>No document specified</p>;
  return (
    <main style={{ padding: 12 }}>
      <h1>Viewer</h1>
      <PdfViewer pdfUrl={url} />
    </main>
  );
}