module.exports = 
  (function() {
    if('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
    }
  })();