import { cp, mkdir, readdir } from 'node:fs/promises';
const source = new URL('../public/', import.meta.url);
const output = new URL('../dist/', import.meta.url);
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });
console.log(`Built ${(await readdir(output)).length} public assets into dist/.`);
