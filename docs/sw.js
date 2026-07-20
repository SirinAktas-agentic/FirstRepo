'use strict';
// Service worker: uygulama kabuğunu önbelleğe alır, böylece telefon
// çevrimdışıyken bile ana ekrandan açılan uygulama çalışır.
// Yeni sürüm yayınlanırken CACHE_VERSION artırılmalı.

const CACHE_VERSION = 'mine-ajanda-v3.0.0';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './data.js',
  './logic.js',
  './store.js',
  './app.js',
  './manifest.webmanifest',
  './icons/icon-180.png',
  './icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(
      (cached) => cached
        || fetch(event.request).then((res) => {
          // Aynı kökenden gelen başarılı yanıtları önbelleğe ekle
          if (res.ok && new URL(event.request.url).origin === self.location.origin) {
            const clone = res.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, clone));
          }
          return res;
        }),
    ).catch(() => caches.match('./index.html')),
  );
});
