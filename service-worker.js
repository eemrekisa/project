const CACHE_NAME = 'emre-dilara-offline-v2';
const PRECACHE_URLS = ["./anı/2018 (2).jpeg","./anı/2018.jpeg","./anı/2019 (2).jpeg","./anı/2019 (3).jpeg","./anı/2019.jpeg","./anı/2020 (2).jpeg","./anı/2020 (3).jpeg","./anı/2020 (4).jpeg","./anı/2020.jpeg","./anı/2021 (10).jpeg","./anı/2021 (11).jpeg","./anı/2021 (2).jpeg","./anı/2021 (3).jpeg","./anı/2021 (4).jpeg","./anı/2021 (5).jpeg","./anı/2021 (6).jpeg","./anı/2021 (7).jpeg","./anı/2021 (8).jpeg","./anı/2021 (9).jpeg","./anı/2021.jpeg","./anı/2022 (2).jpeg","./anı/2022 (3).jpeg","./anı/2022 (4).jpeg","./anı/2022 (5).jpeg","./anı/2022.jpeg","./anı/2023 (10).jpeg","./anı/2023 (11).jpeg","./anı/2023 (12).jpeg","./anı/2023 (2).jpeg","./anı/2023 (3).jpeg","./anı/2023 (4).jpeg","./anı/2023 (5).jpeg","./anı/2023 (6).jpeg","./anı/2023 (7).jpeg","./anı/2023 (8).jpeg","./anı/2023 (9).jpeg","./anı/2023.jpeg","./anı/2024 (10).jpeg","./anı/2024 (11).jpeg","./anı/2024 (2).jpeg","./anı/2024 (3).jpeg","./anı/2024 (4).jpeg","./anı/2024 (5).jpeg","./anı/2024 (6).jpeg","./anı/2024 (7).jpeg","./anı/2024 (8).jpeg","./anı/2024 (9).jpeg","./anı/2024.jpeg","./anı/2025 (10).jpeg","./anı/2025 (11).jpeg","./anı/2025 (2).jpeg","./anı/2025 (3).jpeg","./anı/2025 (4).jpeg","./anı/2025 (5).jpeg","./anı/2025 (6).jpeg","./anı/2025 (7).jpeg","./anı/2025 (8).jpeg","./anı/2025 (9).jpeg","./anı/2025.jpeg","./anı/2026 (1).jpeg","./anı/2026 (10).jpeg","./anı/2026 (2).jpeg","./anı/2026 (3).jpeg","./anı/2026 (4).jpeg","./anı/2026 (5).jpeg","./anı/2026 (6).jpeg","./anı/2026 (7).jpeg","./anı/2026 (8).jpeg","./anı/2026 (9).jpeg","./anı/2026.jpeg","./audio/romantik.mp3","./img/afife.jpeg","./img/afife2.jpeg","./img/afife3.jpeg","./img/afife4.jpeg","./img/app-icon.svg","./img/araba1.JPG","./img/araba2.JPG","./img/araba3.jpeg","./img/bandırma sahil.jpeg","./img/bandırma sahil2.jpeg","./img/bandırma sahil3.jpeg","./img/bandırma.jpeg","./img/banü mezun.jpeg","./img/burger.jpeg","./img/burger2.jpeg","./img/dyt.jpeg","./img/ev önü.jpeg","./img/facetime.jpeg","./img/golet manzara.JPG","./img/gölet.jpeg","./img/gölet2.jpeg","./img/gölet3.jpeg","./img/gölet4.jpeg","./img/gölet5.jpeg","./img/ikçü mezun.jpeg","./img/light.jpeg","./img/limon parkı.jpeg","./img/lise.jpeg","./img/lise3.jpeg","./img/maç.jpeg","./img/maç2.jpeg","./img/park.jpeg","./img/sokak1.jpeg","./img/sokak2.jpeg","./img/sweet.jpeg","./img/sweet2.jpeg","./img/tatil.jpeg","./img/tren garı.jpeg","./index.html","./manifest.webmanifest"];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Cache local assets individually so one missing/large optional asset doesn't break installation.
    await Promise.all(PRECACHE_URLS.map(async url => {
      try { const response = await fetch(url, {cache: 'reload'}); if (response.ok) await cache.put(url, response); } catch (_) {}
    }));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('emre-dilara-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin === self.location.origin) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request, {ignoreSearch: true});
      if (cached) {
        // Refresh quietly in the background when online.
        fetch(request).then(response => { if (response && response.ok) cache.put(request, response.clone()); }).catch(() => {});
        return cached;
      }
      try { const response = await fetch(request); if (response.ok) cache.put(request, response.clone()); return response; }
      catch (_) { return cache.match('./index.html'); }
    })());
  } else if (/cdn\.tailwindcss\.com|cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com/.test(url.hostname)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response && (response.ok || response.type === 'opaque')) await cache.put(request, response.clone());
      return response;
    })());
  }
});
