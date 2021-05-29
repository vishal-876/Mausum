const CACHE_NALE = "version-1"
const urlsToCache = ['index.html','offline.html'];

const self = this
//install
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NALE)
        .then((cache) =>{
            console.log("open");
            return cache.addAll(urlsToCache)
        })
    )
});
//fetch
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then(()=>{
            return fetch(event.request)
            .catch(() => caches.match('offline.html'))
        })
    )
});
// activate
self.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NALE)

    event.waitUntil(
        caches.keys().then((cacheNames)=> Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhiteList.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});