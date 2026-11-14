const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.hostname.startsWith('192.168.');
export const API_BASE = isLocal ? `http://${location.hostname}:5000` : 'https://o0a9mlt66t32-production-iwxjjh6e.us-central1.suga.run';
console.log(API_BASE)
