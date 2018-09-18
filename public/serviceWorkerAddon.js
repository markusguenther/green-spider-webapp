/**
 * Will be imported into our service worker
 */


self.addEventListener('fetch', function(event) {
  var shouldRespond = false;
  if (event.request.method === 'GET') {
    
    console.log(event.request.url);
    // icon
    if (event.request.url.indexOf('/siteicons/') !== -1) {
      shouldRespond = true;
    }

    // webfonts
    else if (event.request.url.indexOf('https://netzbegruenung.github.io') !== -1) {
      shouldRespond = true;
    }

    // ionicons
    else if (event.request.url.indexOf('https://unpkg.com/ionicons') !== -1) {
      shouldRespond = true;
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(event.request.url)).then(function(response) {
            return response || fetch(event.request).then(function(response) {
              console.log("Fetching and caching resource", event.request.url);
              cache.put(event.request, response.clone());
              return response;
            });
          });
        })
      );
    }
  }
});