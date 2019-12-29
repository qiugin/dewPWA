importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox){
    console.log(`Yeah!!!! Workbox berhasil dimuat`);
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '1' },
        { url: '/404.html', revision: '1' },
        { url: '/bolaqu.png', revision: '1' },
        { url: '/favicon.ico', revision: '1' },
        { url: '/index.html', revision: '1' },
        { url: '/manifest.json', revision: '1' },
        { url: '/nav.html', revision: '1' },
        { url: '/push.js', revision: '1' },
        { url: '/service-worker.js', revision: '1' },
        { url: '/css/materialize.min.css', revision: '1' },
        { url: '/css/style.css', revision: '1' },
        { url: '/images/badgeicon.png', revision: '1' },
        { url: '/images/bolaqu.png', revision: '1' },
        { url: '/images/bolaquPush.png', revision: '1' },
        { url: '/images/icons-192.png', revision: '1' },
        { url: '/images/icons-192a.png', revision: '1' },
        { url: '/images/icons-512.png', revision: '1' },
        { url: '/images/icons-512a.png', revision: '1' },
        { url: '/images/icons-512b.png', revision: '1' },
        { url: '/images/no-image.png', revision: '1' },
        { url: '/js/api.js', revision: '1' },
        { url: '/js/db.js', revision: '1' },
        { url: '/js/idb.js', revision: '1' },
        { url: '/js/jquery-3.4.1.min.js', revision: '1' },
        { url: '/js/main.js', revision: '1' },
        { url: '/js/materialize.min.js', revision: '1' },
        { url: '/pages/bolaqu.html', revision: '1' },
        { url: '/pages/home.html', revision: '1' },
        { url: '/pages/jadwal.html', revision: '1' },
        { url: '/pages/klasemen.html', revision: '1' },
        { url: '/pages/teams.html', revision: '1' },
        { url: '/pages/topskor.html', revision: '1' }
        ]);

    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'BolaQu-img',
            plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 1 * 24 * 60 * 60,
            }),
            ]
        })
        );


    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/'),
        workbox.strategies.staleWhileRevalidate()
        )

  // Caching untik Google Fonts
  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
  })
    );

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'BolaQu-static',
  })
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'BolaQu-pages'
    })
);

}else{
  console.log(`Upppss!!! Workbox gagal dimuat`);
}

//Response Push Notification
self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
} else {
    body = 'Push message no payload';
}
var options = {
    body: body,
    image: '/images/bolaquPush.png',
    badge: '/images/badgeicon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
  }
};
event.waitUntil(
    self.registration.showNotification('Push Notification', options)
    );
});