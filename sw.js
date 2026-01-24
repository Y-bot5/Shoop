const CACHE_NAME = 'assets-v1';
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
  '/Shoop/profile/styles.css'
]

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((response) => {
      // Return the cached file if found, otherwise fetch from network
      return response || fetch(event.request);
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