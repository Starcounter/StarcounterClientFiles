/** Please do not modify this file, instead modify service-worker.src.js in the root of this project */

const VULCANIZED_URLS = ["sys/starcounter.max.html","sys/polymer/polymer.html","sys/palindrom-client/palindrom-client.html","sys/starcounter-include/starcounter-include.html","sys/polymer/lib/legacy/legacy-element-mixin.html","sys/polymer/lib/legacy/polymer-fn.html","sys/polymer/lib/legacy/templatizer-behavior.html","sys/polymer/lib/elements/dom-bind.html","sys/polymer/lib/elements/dom-repeat.html","sys/polymer/lib/elements/dom-if.html","sys/polymer/lib/elements/array-selector.html","sys/polymer/lib/elements/custom-style.html","sys/polymer/lib/legacy/mutable-data-behavior.html","sys/polymer/lib/utils/html-tag.html","sys/Palindrom/dist/palindrom-dom.min.js","sys/imported-template/imported-template.html","sys/translate-shadowdom/translate-shadowdom.html","sys/polymer/lib/utils/templatize.html","sys/shadycss/apply-shim.html","sys/polymer/lib/mixins/element-mixin.html","sys/polymer/lib/mixins/gesture-event-listeners.html","sys/polymer/lib/mixins/dir-mixin.html","sys/polymer/lib/utils/mixin.html","sys/polymer/lib/utils/import-href.html","sys/polymer/lib/utils/render-status.html","sys/polymer/lib/utils/unresolved.html","sys/polymer/lib/legacy/polymer.dom.html","sys/polymer/lib/legacy/class.html","sys/polymer/lib/utils/boot.html","sys/polymer/lib/mixins/property-effects.html","sys/polymer/lib/mixins/mutable-data.html","sys/polymer/polymer-element.html","sys/polymer/lib/utils/debounce.html","sys/polymer/lib/utils/flush.html","sys/polymer/lib/utils/array-splice.html","sys/shadycss/custom-style-interface.html","sys/polymer/lib/utils/style-gather.html","sys/translate-shadowdom/translate-shadowdom.js","sys/juicy-html/juicy-html.html","sys/shadycss/apply-shim.min.js","sys/polymer/lib/utils/gestures.html","sys/polymer/lib/utils/settings.html","sys/polymer/lib/utils/resolve-url.html","sys/polymer/lib/elements/dom-module.html","sys/polymer/lib/mixins/properties-mixin.html","sys/polymer/lib/mixins/property-accessors.html","sys/polymer/lib/utils/flattened-nodes-observer.html","sys/polymer/lib/utils/path.html","sys/polymer/lib/utils/case-map.html","sys/polymer/lib/mixins/template-stamp.html","sys/polymer/lib/utils/async.html","sys/shadycss/custom-style-interface.min.js","sys/polymer/lib/mixins/properties-changed.html"];
const RESOLVED_VULCANIZED_URLS = VULCANIZED_URLS.map(
  url => new URL(url, self.location).href
);

self.addEventListener('activate', event => {
  // this allows to to intercept the very first request after SW installation
  // without it, SW only takes effect after refreshing the page
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  if (RESOLVED_VULCANIZED_URLS.includes(event.request.url)) {
    // respond with empty text when a request to a vulcanized file occurs
    event.respondWith(new Response('', { 'content-type': 'text/html' }));
  }
});
