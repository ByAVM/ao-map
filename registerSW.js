if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/ao-map/sw.js', { scope: '/ao-map/' })})}