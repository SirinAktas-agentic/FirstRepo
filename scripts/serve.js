// Statik uygulamayı bilgisayarda yerel olarak açmak için minik sunucu.
// Yalnızca Node yerleşik modülleri; bağımlılık yok. (Uygulamanın kendisi
// tamamen statiktir — bu sunucu sadece dosyaları tarayıcıya ulaştırır.)

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS = path.resolve(__dirname, '..', 'docs');
const PORT = Number(process.env.PORT) || 8080;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel === '/' || rel === '') rel = '/index.html';
  const filePath = path.normalize(path.join(DOCS, rel));
  if (!filePath.startsWith(DOCS)) { res.writeHead(403).end('Forbidden'); return; }
  fs.readFile(filePath, (err, content) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Bulunamadı'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream' });
    res.end(content);
  });
}).listen(PORT, () => {
  console.log(`\n  Mine'nin Yaz Ajandası (statik):  http://localhost:${PORT}\n  (Durdurmak için Ctrl+C)\n`);
});
