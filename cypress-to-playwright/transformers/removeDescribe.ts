export default function removeDescribe(content: string): string {
  const describeRegex = /describe\s*\(\s*(['"`])(.*?)\1\s*,\s*\(\s*\)\s*=>\s*{([\s\S]*?)}\s*\);?/;

  return content.replace(describeRegex, (_, _quote, _title, body) => {
    return body.trim(); // Unwrap the body of the describe block
  });
}
