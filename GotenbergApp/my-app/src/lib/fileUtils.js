import fs from "fs/promises";
import path from "path";

/**
 * Ensure directory exists
 */
export async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

/**
 * Save buffer to file
 * returns absolute path
 */
export async function saveBufferToFile(buffer, dir, filename) {
  await ensureDir(dir);
  const filePath = path.join(dir, filename);
  await fs.writeFile(filePath, buffer);
  return filePath;
}