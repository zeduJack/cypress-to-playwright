import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';
import { pathToFileURL, fileURLToPath } from 'url';

interface CLIOptions {
  sourceDir: string;
  destinationDir: string;
  transformerDir: string;
  testPattern?: string;
}

// Get __dirname equivalent in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Parse CLI args (relative to this file!)
const args = process.argv.slice(2);
const options: CLIOptions = {
  sourceDir: args[0] || '../cypress',
  destinationDir: args[1] || '../playwright-tests',
  transformerDir: args[2] || './transformers',
  testPattern: args[3] || '**/*.cy.@(ts|js)',
};

if (!options.sourceDir || !options.destinationDir || !options.transformerDir) {
  console.error('Usage: ts-node cli.ts <sourceDir> <destinationDir> <transformerDir> [testPattern]');
  process.exit(1);
}

// Resolve all paths relative to cli.ts location
const src = path.resolve(__dirname, options.sourceDir);
const dest = path.resolve(__dirname, options.destinationDir);
const transformerPath = path.resolve(__dirname, options.transformerDir);

async function loadTransformers(transformerDir: string): Promise<((input: string) => string)[]> {
  const transformerFiles = fs.readdirSync(transformerDir).filter((f: string) => f.endsWith('.ts') || f.endsWith('.js'));
  const transformers: ((input: string) => string)[] = [];

  for (const file of transformerFiles) {
    const filePath = path.resolve(transformerDir, file);
    const imported = await import(pathToFileURL(filePath).href);
    const transformerFn = imported.default;

    if (typeof transformerFn !== 'function') {
      console.warn(`Skipping transformer '${file}' — default export is not a function.`);
      continue;
    }

    transformers.push(transformerFn);
  }

  return transformers;
}

async function run() {
  // Clean and prepare destination
  fs.removeSync(dest);
  fs.mkdirpSync(dest);

  // Load transformers
  const transformers = await loadTransformers(transformerPath);

  // Resolve glob pattern relative to source
  const testFilesPattern = path.join(src, options.testPattern!);
  console.log('🔍 Searching test files at:', testFilesPattern);

  const files = await glob(testFilesPattern, {
    absolute: true,
  });

  if (files.length === 0) {
    console.warn('⚠️ No test files found. Check your pattern and source directory.');
    return;
  }

  for (const file of files) {
    const relativePath = path.relative(src, file);
    const newRelativePath = relativePath.replace(/\.cy\.(ts|js)$/, '.spec.$1');
    const targetPath = path.join(dest, newRelativePath);

    let content = fs.readFileSync(file, 'utf-8');

    for (const transformer of transformers) {
      content = transformer(content);
    }

    fs.mkdirpSync(path.dirname(targetPath));
    fs.writeFileSync(targetPath, content, 'utf-8');

    console.log(`✅ Transformed: ${relativePath} -> ${newRelativePath}`);
  }
}

run().catch(err => {
  console.error('❌ Error in CLI:', err);
  process.exit(1);
});
