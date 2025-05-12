import { existsSync } from 'fs';
import { dirname } from 'path';
import { writeFile, mkdir } from 'fs/promises';

export const ensureDirectoryExists = async (dirPath) => {
  if (!existsSync(dirPath)) {
    await mkdir(dirPath, { recursive: true });
  }
};

export const writeFileWithDirs = async (filePath, data) => {
  const dirPath = dirname(filePath);
  await ensureDirectoryExists(dirPath);
  await writeFile(filePath, data);
};
