// lib/storage.js
// -----------------------------------------------------------
// Local storage utilities for saving uploaded files and
// converted PDF files in a Next.js application.
//
// This version ONLY supports local filesystem storage.
// Files are written to:
//   - /uploaded            (incoming/original files)
//   - /public/converted    (converted PDF files)
// -----------------------------------------------------------

import path from "path";
import fs from "fs/promises";
import { ensureDir } from "./fileUtils";

// -----------------------------------------------------------
// Save converted PDF locally
// -----------------------------------------------------------
/**
 * Saves a converted PDF buffer into the /public/converted directory.
 * Returns a public URL (Next.js serves files from /public).
 *
 * Example returned url:
 *   /converted/12345.pdf
 */
export async function saveConvertedPdf(buffer, filename) {
  // Directory where converted PDFs will be stored
  const dir =
    process.env.CONVERTED_DIR ||
    path.join(process.cwd(), "public", "converted");

  // Ensure directory exists
  await ensureDir(dir);

  const filePath = path.join(dir, filename);
  await fs.writeFile(filePath, buffer);

  // Public URL for the PDF
  return `/converted/${filename}`;
}

// -----------------------------------------------------------
// Save original uploaded file locally
// -----------------------------------------------------------
/**
 * Saves an uploaded file buffer in the /uploaded folder.
 * The uploaded folder is NOT public — it is server-only storage.
 *
 * Returns the absolute file system path.
 */
export async function saveOriginal(buffer, filename) {
  // Directory to store raw uploaded files (not public)
  const dir =
    process.env.UPLOAD_DIR ||
    path.join(process.cwd(), "uploaded");

  await ensureDir(dir);

  const filePath = path.join(dir, filename);
  await fs.writeFile(filePath, buffer);

  return filePath; // absolute path on disk
}
