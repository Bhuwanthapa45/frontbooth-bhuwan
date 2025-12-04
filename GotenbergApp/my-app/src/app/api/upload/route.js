// app/api/upload/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import mime from "mime-types";
import path from "path";
import { saveOriginal } from "@/lib/storage";

/**
 * Upload API
 *
 * Accepts multipart/form-data with a single file field named "file".
 * - Saves the original file to local storage via saveOriginal()
 * - Returns JSON: { success, fileName, originalLocation, mimeType }
 *
 * Robustness features:
 * - Validates presence of file
 * - Validates file size (protects from huge uploads)
 * - Sanitizes filename (basic)
 * - Handles all errors and returns proper HTTP status codes
 * - Does not allow thrown errors to crash the server
 */

// Upper bound for uploads (bytes). Adjust as needed.
// 50 MB by default to avoid huge uploads; change via env var if required.
const MAX_UPLOAD_BYTES = Number(process.env.MAX_UPLOAD_BYTES) || 50 * 1024 * 1024;

function safeFileName(name) {
  // Very small sanitization: remove directory separators and limit length.
  // You can extend this with a stronger sanitizer if necessary.
  const base = path.basename(name).replace(/\s+/g, "_");
  return base.length > 200 ? base.slice(0, 200) : base;
}

export async function POST(req) {
  try {
    // Ensure request is multipart/form-data
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid content-type. Expected multipart/form-data." },
        { status: 415 }
      );
    }

    // Parse formData
    const formData = await req.formData();
    const file = formData.get("file");

    // Validate file presence
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    // Get file metadata from the uploaded File object
    const originalName = file.name || "upload";
    const mimeType = mime.lookup(originalName) || file.type || "application/octet-stream";

    // Read file into buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Protect against extremely large uploads
    if (buffer.length > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { error: `File too large. Max allowed is ${MAX_UPLOAD_BYTES} bytes.` },
        { status: 413 }
      );
    }

    // Build a safe file name to store on disk
    const timestamp = Date.now();
    const safeName = safeFileName(originalName);
    const fileName = `${timestamp}-${safeName}`;

    // Save the original file using storage helper; this may throw if disk issues occur
    let originalLocation;
    try {
      originalLocation = await saveOriginal(buffer, fileName);
    } catch (saveErr) {
      console.error("Failed to save uploaded file:", saveErr);
      return NextResponse.json(
        { error: "Failed to save uploaded file on server." },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        fileName,
        originalLocation,
        mimeType,
      },
      { status: 201 }
    );
  } catch (err) {
    // Catch-all: log the error and return a safe 500 response.
    console.error("Unexpected upload error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}