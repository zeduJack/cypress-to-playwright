import { Project, SyntaxKind, CallExpression } from 'ts-morph';

function toCamelCaseFromSelector(selector: string): string {
  return selector
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

export default function replaceCyGetWithVariable(content: string): string {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile('temp.ts', content);

  const toReplace: { statementText: string; newText: string }[] = [];

  sourceFile.forEachDescendant((node) => {
    if (!node.isKind(SyntaxKind.CallExpression)) return;

    const callExpr = node;
    const expr = callExpr.getExpression();
    if (!expr.isKind(SyntaxKind.PropertyAccessExpression)) return;

    const object = expr.getExpression();
    const method = expr.getName();

    if (object.getText() === 'cy' && method === 'get') {
      const selectorArg = callExpr.getArguments()[0];
      const selectorText = selectorArg.getText();
      const varName = toCamelCaseFromSelector(selectorText.slice(1, -1));

      const parentStatement = callExpr.getFirstAncestorByKind(SyntaxKind.ExpressionStatement);
      const parentText = parentStatement?.getText() ?? callExpr.getText();
      const fullExpr = parentText.replace(callExpr.getText(), `await page.locator(${selectorText})`);

      if (parentStatement) {
        toReplace.push({
          statementText: parentText,
          newText: `const ${varName} = ${fullExpr}`,
        });
      }
    }
  });

  let updatedText = content;
  for (const { statementText, newText } of toReplace) {
    updatedText = updatedText.replace(statementText, newText);
  }

  return updatedText;
}
