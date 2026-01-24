if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/Shoop/sw.js')
    .then(() => console.log("Service Worker Registered for Shoop"));
}