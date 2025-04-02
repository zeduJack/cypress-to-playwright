export default function ensurePlaywrightImport(content: string): string {
  const importLine = `import { test, expect } from '@playwright/test';`;

  // If the import is already present, do nothing
  if (content.includes(importLine)) {
    return content;
  }

  // Insert after any existing import statements
  const lines = content.split('\n');
  const importIndex = lines.findIndex(line => !line.trim().startsWith('import'));

  // Insert at the right place
  lines.splice(importIndex === -1 ? 0 : importIndex, 0, importLine);

  return lines.join('\n');
}
