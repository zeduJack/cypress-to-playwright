export default function replaceVisit(content: string): string {
  return content.replace(/cy\.visit\(\s*(['"`])(.*?)\1\s*\)/g, 'await page.goto(\'$2\')');
}
