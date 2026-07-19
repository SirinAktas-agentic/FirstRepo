// Mine'nin Yaz Ajandası — sunucu. Yalnızca Node yerleşik modülleri (node:http,
// node:sqlite, node:fs) kullanır; harici bağımlılık yoktur.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  openDatabase, getState, toggleTask, toggleBook, setAvatar, setSettings, resetProgress,
} from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const DB_PATH = process.env.DB_PATH || path.join(ROOT, 'data', 'mine.db');
const PORT = Number(process.env.PORT) || 8080;
const HOST = process.env.HOST || '0.0.0.0';

const db = openDatabase(DB_PATH);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.webmanifest': 'application/manifest+json',
};

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1_000_000) reject(new Error('body too large'));
    });
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch {
        reject(new Error('invalid json'));
      }
    });
    req.on('error', reject);
  });
}

function serveStatic(req, res, urlPath) {
  let rel = decodeURIComponent(urlPath.split('?')[0]);
  if (rel === '/' || rel === '') rel = '/index.html';
  // güvenlik: dizin dışına çıkışı engelle
  const filePath = path.normalize(path.join(PUBLIC_DIR, rel));
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Bulunamadı');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(content);
  });
}

async function handleApi(req, res, urlPath) {
  const method = req.method;

  if (method === 'GET' && urlPath === '/api/state') {
    return sendJson(res, 200, getState(db));
  }

  // POST /api/tasks/:id/toggle
  let m = urlPath.match(/^\/api\/tasks\/(.+)\/toggle$/);
  if (method === 'POST' && m) {
    const id = decodeURIComponent(m[1]);
    const result = toggleTask(db, id);
    return sendJson(res, result.error ? 404 : 200, result);
  }

  // POST /api/books/:id/toggle
  m = urlPath.match(/^\/api\/books\/(.+)\/toggle$/);
  if (method === 'POST' && m) {
    const id = decodeURIComponent(m[1]);
    const result = toggleBook(db, id);
    return sendJson(res, result.error ? 404 : 200, result);
  }

  if (method === 'POST' && urlPath === '/api/avatar') {
    const body = await readBody(req);
    const result = setAvatar(db, body.hairColor, body.hairStyle);
    return sendJson(res, result.error ? 400 : 200, result);
  }

  if (method === 'POST' && urlPath === '/api/settings') {
    const body = await readBody(req);
    const result = setSettings(db, body.childName, body.startDate, body.endDate);
    return sendJson(res, result.error ? 400 : 200, result);
  }

  if (method === 'POST' && urlPath === '/api/reset') {
    return sendJson(res, 200, resetProgress(db));
  }

  return sendJson(res, 404, { error: 'not_found' });
}

const server = http.createServer(async (req, res) => {
  try {
    const urlPath = req.url.split('?')[0];
    if (urlPath.startsWith('/api/')) {
      await handleApi(req, res, urlPath);
    } else if (req.method === 'GET') {
      serveStatic(req, res, req.url);
    } else {
      sendJson(res, 405, { error: 'method_not_allowed' });
    }
  } catch (err) {
    console.error(err);
    if (!res.headersSent) sendJson(res, 500, { error: 'server_error', message: String(err.message || err) });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`\n  Mine'nin Yaz Ajandası çalışıyor:  http://localhost:${PORT}\n  Veritabanı: ${DB_PATH}\n  (Durdurmak için Ctrl+C)\n`);
});
