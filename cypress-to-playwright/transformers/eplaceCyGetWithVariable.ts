function toCamelCaseFromSelector(selector: string): string {
  return selector
    .replace(/[^a-zA-Z0-9]/g, ' ')     // replace non-alphanumerics with space
    .split(' ')
    .filter(Boolean)
    .map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

export default function replaceCyGetWithVariable(content: string): string {
  return content.replace(
    /cy\.get\(\s*(['"`])(.*?)\1\s*\)/g,
    (_match, _q, selector) => {
      const varName = toCamelCaseFromSelector(selector);
      return `const ${varName} = await page.locator('${selector}')`;
    }
  );
}
