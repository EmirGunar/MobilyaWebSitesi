const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const outFile = path.join(projectRoot, 'src', 'data', 'imagesManifest.ts');

function isImage(file) {
  return /\.(jpe?g|png|webp|svg)$/i.test(file);
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walk(full));
    } else if (entry.isFile() && isImage(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function main() {
  if (!fs.existsSync(publicDir)) {
    console.error('public directory not found:', publicDir);
    process.exit(1);
  }

  const allImages = walk(publicDir)
    .map(p => path.relative(publicDir, p).replace(/\\/g, '/'))
    .filter(p => p !== 'arsellogo.jpg');

  const manifest = {};
  for (const rel of allImages) {
    const [top, ...rest] = rel.split('/');
    if (!top || rest.length === 0) continue; // skip root files
    if (!manifest[top]) manifest[top] = [];
    if (!manifest[top].includes(rel)) manifest[top].push(rel);
  }

  const ts = `// AUTO-GENERATED FILE. Do not edit manually.\n` +
    `export const imagesManifest: Record<string, string[]> = ${JSON.stringify(manifest, null, 2)};\n`;

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, ts, 'utf8');
  console.log('Wrote manifest to', outFile);
}

main();


