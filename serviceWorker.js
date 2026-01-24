const CACHE_NAME = 'assets-v2';
const FILES = [
  '/Shoop/',
  '/Shoop/index.html',
  '/Shoop/styles.css',
  '/Shoop/home/',
  '/Shoop/home/index.html',
  '/Shoop/home/styles.css',
  '/Shoop/icon-192.png',
  '/Shoop/icon-512.png',
  '/Shoop/noProfile.webp',
  '/Shoop/manifest.json',
  '/Shoop/icon-32.png',
  '/Shoop/firebase.js',
  '/Shoop/login/',
  '/Shoop/login/index.html',
  '/Shoop/login/styles.css',
  'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js',
  '/Shoop/profile.js',
  '/Shoop/profile/',
  '/Shoop/profile/index.html',
  '/Shoop/profile/styles.css',
  '/Shoop/offline.html',
  '/Shoop/registerServiceWorker.js',
  'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js'
]

self.addEventListener('fetch', (event) => {
    // We only care about GET requests for the cache
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            // If not in cache, try the network
            return fetch(event.request).catch(() => {
                // If network fails AND it's a page navigation, show offline.html
                if (event.request.mode === 'navigate') {
                    return caches.match('/Shoop/offline.html');
                }
            });
        })
    );
});


self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installed.');
    event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
        return cache.addAll(FILES);
    }).then(() => {
        self.skipWaiting();
    }));
});

self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating and cleaning up...');
    
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    // Delete any cache that isn't the current version
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Force the new service worker to take control of all open tabs immediately
            return self.clients.claim();
        })
    );
});