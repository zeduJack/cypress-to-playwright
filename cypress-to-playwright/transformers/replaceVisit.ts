import { Project, SyntaxKind } from 'ts-morph';

export default function replaceCyVisit(content: string): string {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('temp.ts', content);

  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && node.getExpression().getText() === 'cy.visit') {
      node.replaceWithText(`await page.goto(${node.getArguments().map(arg => arg.getText()).join(', ')})`);
    }
  });

  return sourceFile.getFullText();
}
