import FormData from "form-data";
import fetch from "node-fetch";
const GOTENBERG_URL = process.env.GOTENBERG_URL || "http://localhost:3001";

/**
 * Convert a single file buffer (any supported type) to PDF using Gotenberg.
 * Returns Buffer of PDF.
 */
export async function convertToPDF(buffer, fileName) {
  const form = new FormData();
  form.append("files", buffer, { filename: fileName });

  const res = await fetch(`${GOTENBERG_URL}/forms/libreoffice/convert`, {
    method: "POST",
    body: form,
    headers: form.getHeaders?.() ?? {}, // node FormData guard
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gotenberg failed: ${res.status} ${text}`);
  }

  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}