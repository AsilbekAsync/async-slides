import { readFile, writeFile } from 'node:fs/promises';

const file = new URL('../assets/app.css', import.meta.url);
let css = await readFile(file, 'utf8');
css = css.replace(/^\/\*![\s\S]*?\*\/\s*/, '');
await writeFile(file, css);
