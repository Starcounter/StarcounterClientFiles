const VULCANIZED_URLS = TO_BE_AUTOMATICALLY_REPLACED_WITH_URLS_ARRAY;
let RESOLVED_VULCANIZED_URLS;

self.addEventListener('install', event => {
  // we have relative URLS, we need them to be absolute, and to align with current domain
  RESOLVED_VULCANIZED_URLS = VULCANIZED_URLS.map(
    url => new URL(url, self.location).href
  );
});

// this allows to to intercept the very first request after SW installation
// without it, SW only takes effect after refreshing the page
self.addEventListener('activate', event => {
  clients.claim();
});
self.addEventListener('fetch', event => {
  if (RESOLVED_VULCANIZED_URLS.includes(event.request.url)) {
    // respond with empty text when a request to a vulcanized file occurs
    event.respondWith(new Response('', { 'content-type': 'text/html' }));
  }
});
