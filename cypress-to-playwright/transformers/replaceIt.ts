export default function replaceIt(content: string): string {
  return content.replace(
    /it\(\s*(['"`])(.*?)\1\s*,\s*\(\s*\)\s*=>\s*{/g,
    `test('$2', async ({ page }) => {`
  );
}
