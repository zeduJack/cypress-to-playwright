import { Project, SyntaxKind, ParameterDeclarationStructure } from 'ts-morph';

export default function transformItToTest(content: string): string {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('temp.ts', content);

  sourceFile.forEachDescendant((node) => {
    if (
      node.getKind() === SyntaxKind.CallExpression &&
      node.getFirstChild()?.getText() === 'it'
    ) {
      node.getFirstChild()?.replaceWithText('test');

      const args = node.getChildrenOfKind(SyntaxKind.SyntaxList)[0]?.getChildren();
      const fn = args?.[1];
      if (fn && fn.getKind() === SyntaxKind.ArrowFunction) {
        const arrowFn = fn.asKindOrThrow(SyntaxKind.ArrowFunction);
        arrowFn.setIsAsync(true);

        if (arrowFn.getParameters().length === 0) {
          arrowFn.addParameter({ name: 'page' });
        }
      }
    }
  });

  return sourceFile.getFullText();
}
