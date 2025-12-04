export const runtime = "nodejs";
import { NextResponse } from "next/server";
import mime from "mime-types";
import path from "path";
import fs from "fs/promises";

import { convertToPDF } from "@/lib/gotenbergClient";
import { saveConvertedPdf } from "@/lib/storage";

/**
 * POST JSON { fileName, originalLocation, mimeType }
 * If mimeType === application/pdf -> skip conversion and return URL (local serve or S3).
 * Otherwise fetch original (if local path read; if S3 path you might already have URL).
 * Convert via Gotenberg and save PDF.
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const { fileName, originalLocation, mimeType } = body;

    // Already a PDF?
    if (mimeType === "application/pdf") {
      // If using local: we assume original saved in /public/converted or provide direct URL
      return NextResponse.json({ success: true, pdfUrl: originalLocation });
    }

    // Read original file buffer (local strategy)
    let buffer;
    if (originalLocation && originalLocation.startsWith("/")) {
      // local path
      buffer = await fs.readFile(originalLocation);
    } else {
      // Possibly S3 pre-signed URL - fetch
      const res = await fetch(originalLocation);
      buffer = Buffer.from(await res.arrayBuffer());
    }

    // Convert using Gotenberg
    const pdfBuffer = await convertToPDF(buffer, fileName);

    // Save converted PDF with .pdf extension
    const outFileName = fileName.replace(/(\.[^.]*)?$/, ".pdf");
    const pdfUrl = await saveConvertedPdf(pdfBuffer, outFileName);

    return NextResponse.json({ success: true, pdfUrl });
  } catch (err) {
    console.error("convert error", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}