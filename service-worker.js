const CACHE_NAME='anhbao-store-v1';
const URLS_TO_CACHE=['./','./index.html','./manifest.json','./apps.json','./rows.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(URLS_TO_CACHE)));});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});