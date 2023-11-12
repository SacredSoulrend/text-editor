const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Use a NetworkFirst strategy for navigation requests (HTML pages)
registerRoute(({ request }) => request.mode === 'navigate', new NetworkFirst({ cacheName: 'page-cache' }));

// Register the pageCache strategy as the catch handler for navigation requests
setCatchHandler(({ event }) => {
  // Handle offline navigation requests using offlineFallback
  return offlineFallback({ event });
});

// TODO: Implement asset caching
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  // Use the CacheFirst strategy for asset caching
  new StaleWhileRevalidate({
    // Cache name for assets
    cacheName: 'assets-cache',
    // Plugin to cache responses with a 200 status and ignore other statuses
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
