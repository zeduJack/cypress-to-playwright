import { Project, SyntaxKind } from 'ts-morph';

export default function ensurePlaywrightImport(content: string): string {
  if (content.includes(`import { test, expect } from '@playwright/test';`)) {
    return content;
  }

  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('temp.ts', content);

  const importIndex = 0;
  sourceFile.insertStatements(importIndex, `import { test, expect } from '@playwright/test';\n`);

  return sourceFile.getFullText();
}
