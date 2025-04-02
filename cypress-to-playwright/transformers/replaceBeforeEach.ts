export default function replaceBeforeEach(content: string): string {
  return content.replace(
    /beforeEach\(\s*\(\s*\)\s*=>\s*{/g,
    'test.beforeEach(async ({ page }) => {'
  );
}
