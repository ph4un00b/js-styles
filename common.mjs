import { readFile } from 'fs/promises';
import * as path from 'path';
import * as url from 'url';

// __dirname in ESM does not work!
// __filename, exports, module, and require. too!

// *********** this shall work on server not on web!
// https://blog.logrocket.com/alternatives-dirname-node-js-es-modules/
var __dirname = url.fileURLToPath(new URL('.', import.meta.url));
console.log({
  __dirname: __dirname,
  import: import.meta.url,
});

var esm = new URL('.example', import.meta.url);
var common = path.join(__dirname, '.example');

console.log({
  esm,
  common,
});

var tpl = await readFile(esm); // as stream buffer
var tpl = await readFile(esm, 'utf-8'); // as string
console.log(tpl);
