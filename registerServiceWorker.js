if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/Shoop/serviceWorker.js')
    .then(() => console.log("Service Worker Registered for Shoop"));
}