import { Project, SyntaxKind } from 'ts-morph';

export default function transformBeforeEach(content: string): string {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('temp.ts', content);

  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && node.getExpression().getText() === 'beforeEach') {
      node.getExpression().replaceWithText('test.beforeEach');

      const args = node.getArguments();
      const fn = args?.[0];
      if (fn && fn.isKind(SyntaxKind.ArrowFunction)) {
        fn.setIsAsync(true);
        if (fn.getParameters().length === 0) {
          fn.addParameter({ name: 'page' });
        }
      }
    }
  });

  return sourceFile.getFullText();
}
