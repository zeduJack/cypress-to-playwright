import { Project, SyntaxKind } from 'ts-morph';

export default function removeDescribe(content: string): string {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('temp.ts', content);

  sourceFile.forEachChild((node) => {
    if (
      node.getKind() === SyntaxKind.ExpressionStatement &&
      node.getFirstChildByKind(SyntaxKind.CallExpression)?.getExpression().getText() === 'describe'
    ) {
      const callExpr = node.getFirstChildByKind(SyntaxKind.CallExpression)!;
      const bodyBlock = callExpr.getArguments()[1]
        ?.asKind(SyntaxKind.ArrowFunction)
        ?.getBody()
        ?.asKind(SyntaxKind.Block);

      if (bodyBlock) {
        const statements = bodyBlock.getStatements();
        node.replaceWithText(statements.map(s => s.getFullText()).join('\n'));
      }
    }
  });

  return sourceFile.getFullText();
}
