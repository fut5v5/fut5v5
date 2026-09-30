/* FUT 5V5 : service worker (installation, ouverture hors connexion, mises à jour) */
const VERSION = 'fut5v5-2026-10-01-21-compteur-mvp';
const SHELL = ['./', './index.html', './config.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png', './icons/badge-96.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== 'fut5v5-polices' && k !== 'fut5v5-photos').map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  /* polices Google : gardées après le premier chargement */
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open('fut5v5-polices').then(c => c.match(req).then(hit => hit ||
      fetch(req).then(r => { c.put(req, r.clone()); return r; }))));
    return;
  }
  if (url.origin !== location.origin) return; /* le script Google n'est jamais mis en cache */
  /* page et réglages : réseau d'abord (pour recevoir les mises à jour), sinon la copie gardée */
  if (req.mode === 'navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/config.js')) {
    /* no-store : on contourne le cache du navigateur pour voir tout de suite une mise à jour */
    e.respondWith(fetch(req.url, { cache: 'no-store', credentials: 'same-origin' }).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return r; })
      .catch(() => caches.match(req).then(hit => hit || caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});

/* ---------- notifications : affichage et ouverture au bon écran ---------- */
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { data: { title: 'FUT 5V5', body: e.data ? e.data.text() : '' } }; }
  const m = d.data || d.notification || d;
  const title = m.title || 'FUT 5V5';
  e.waitUntil(self.registration.showNotification(title, {
    body: m.body || '', icon: 'icons/icon-192.png', badge: 'icons/badge-96.png',
    tag: m.tag || undefined, renotify: !!m.tag, data: { url: m.url || '#' }
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const hash = (e.notification.data && e.notification.data.url) || '#';
  const target = new URL('./' + (hash.startsWith('#') ? hash : '#' + hash), self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) { if (c.url.startsWith(self.registration.scope)) { c.navigate(target).catch(() => {}); return c.focus(); } }
    return self.clients.openWindow(target);
  }));
});