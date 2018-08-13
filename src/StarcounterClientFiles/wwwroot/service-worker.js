/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
     http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = 'pHDKGh1MeUGWz2aaGnQVBQUjfgU=';
const RUNTIME = 'runtime';

const PRECACHE_URLS = ["sys/enlighted-link/enlighted-link.html","sys/imported-template/imported-template.html","sys/iron-a11y-announcer/iron-a11y-announcer.html","sys/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","sys/iron-fit-behavior/iron-fit-behavior.html","sys/iron-flex-layout/iron-flex-layout-classes.html","sys/iron-flex-layout/iron-flex-layout.html","sys/iron-icon/iron-icon.html","sys/iron-iconset-svg/iron-iconset-svg.html","sys/iron-media-query/iron-media-query.html","sys/iron-meta/iron-meta.html","sys/iron-overlay-behavior/iron-focusables-helper.html","sys/iron-overlay-behavior/iron-overlay-backdrop.html","sys/iron-overlay-behavior/iron-overlay-behavior.html","sys/iron-overlay-behavior/iron-overlay-manager.html","sys/iron-overlay-behavior/iron-scroll-manager.html","sys/iron-resizable-behavior/iron-resizable-behavior.html","sys/iron-scroll-target-behavior/iron-scroll-target-behavior.html","sys/juicy-html/juicy-html.html","sys/Palindrom/bump-version.js","sys/Palindrom/dist/palindrom-dom.js","sys/Palindrom/dist/palindrom-dom.min.js","sys/Palindrom/dist/palindrom.js","sys/Palindrom/dist/palindrom.min.js","sys/Palindrom/docs/css/style.css","sys/Palindrom/src/palindrom-dom.js","sys/Palindrom/src/palindrom-errors.js","sys/Palindrom/src/palindrom.js","sys/Palindrom/src/URL.js","sys/Palindrom/webpack.config.js","sys/palindrom-client/notifySplices.html","sys/palindrom-client/palindrom-client.html","sys/palindrom-error-catcher/palindrom-error-catcher.html","sys/palindrom-redirect/palindrom-redirect.html","sys/palindrom-redirect/puppet-redirect.html","sys/polymer/lib/elements/array-selector.html","sys/polymer/lib/elements/custom-style.html","sys/polymer/lib/elements/dom-bind.html","sys/polymer/lib/elements/dom-if.html","sys/polymer/lib/elements/dom-module.html","sys/polymer/lib/elements/dom-repeat.html","sys/polymer/lib/legacy/class.html","sys/polymer/lib/legacy/legacy-element-mixin.html","sys/polymer/lib/legacy/mutable-data-behavior.html","sys/polymer/lib/legacy/polymer-fn.html","sys/polymer/lib/legacy/polymer.dom.html","sys/polymer/lib/legacy/templatizer-behavior.html","sys/polymer/lib/mixins/dir-mixin.html","sys/polymer/lib/mixins/element-mixin.html","sys/polymer/lib/mixins/gesture-event-listeners.html","sys/polymer/lib/mixins/mutable-data.html","sys/polymer/lib/mixins/properties-changed.html","sys/polymer/lib/mixins/properties-mixin.html","sys/polymer/lib/mixins/property-accessors.html","sys/polymer/lib/mixins/property-effects.html","sys/polymer/lib/mixins/template-stamp.html","sys/polymer/lib/utils/array-splice.html","sys/polymer/lib/utils/async.html","sys/polymer/lib/utils/boot.html","sys/polymer/lib/utils/case-map.html","sys/polymer/lib/utils/debounce.html","sys/polymer/lib/utils/flattened-nodes-observer.html","sys/polymer/lib/utils/flush.html","sys/polymer/lib/utils/gestures.html","sys/polymer/lib/utils/html-tag.html","sys/polymer/lib/utils/import-href.html","sys/polymer/lib/utils/mixin.html","sys/polymer/lib/utils/path.html","sys/polymer/lib/utils/render-status.html","sys/polymer/lib/utils/resolve-url.html","sys/polymer/lib/utils/settings.html","sys/polymer/lib/utils/style-gather.html","sys/polymer/lib/utils/templatize.html","sys/polymer/lib/utils/unresolved.html","sys/polymer/polymer-element.html","sys/polymer/polymer.html","sys/shadycss/apply-shim.html","sys/shadycss/apply-shim.min.js","sys/shadycss/custom-style-interface.html","sys/shadycss/custom-style-interface.min.js","sys/shadycss/entrypoints/apply-shim.js","sys/shadycss/entrypoints/custom-style-interface.js","sys/shadycss/entrypoints/scoping-shim.js","sys/shadycss/examples/custom-style-element.js","sys/shadycss/examples/document-style-lib.js","sys/shadycss/externs/shadycss-externs.js","sys/shadycss/gulpfile.js","sys/shadycss/scoping-shim.min.js","sys/shadycss/src/apply-shim-utils.js","sys/shadycss/src/apply-shim.js","sys/shadycss/src/common-regex.js","sys/shadycss/src/common-utils.js","sys/shadycss/src/css-parse.js","sys/shadycss/src/custom-style-interface.js","sys/shadycss/src/document-wait.js","sys/shadycss/src/document-watcher.js","sys/shadycss/src/scoping-shim.js","sys/shadycss/src/style-cache.js","sys/shadycss/src/style-info.js","sys/shadycss/src/style-placeholder.js","sys/shadycss/src/style-properties.js","sys/shadycss/src/style-settings.js","sys/shadycss/src/style-transformer.js","sys/shadycss/src/style-util.js","sys/shadycss/src/template-map.js","sys/shadycss/src/unscoped-style-handler.js","sys/slot-all/slot-all.html","sys/starcounter-include/starcounter-include.html","sys/starcounter.html","sys/uniform.css/build.js","sys/uniform.css/components/uni-data-table/uni-data-table-column.html","sys/uniform.css/components/uni-data-table/uni-data-table-filter.html","sys/uniform.css/components/uni-data-table/uni-data-table-sorter.html","sys/uniform.css/components/uni-data-table/uni-data-table.html","sys/uniform.css/components/uni-date-picker/polymer-binding.html","sys/uniform.css/components/uni-date-picker/theming.html","sys/uniform.css/components/uni-date-picker/uni-date-picker.html","sys/uniform.css/components/uni-form-item/uni-form-item.html","sys/uniform.css/components/uni-form-item-group/uni-form-item-group.html","sys/uniform.css/components/uni-pagination/uni-pagination.html","sys/uniform.css/dist/commando.css","sys/uniform.css/dist/commando.unminified.css","sys/uniform.css/dist/underwear.css","sys/uniform.css/dist/underwear.unminified.css","sys/uniform.css/dist/uniform.css","sys/uniform.css/dist/uniform.unminified.css","sys/uniform.css/uniform.css","sys/uniform.css/webpack.config.js","sys/vaadin-button/src/vaadin-button.html","sys/vaadin-button/theme/lumo/vaadin-button.html","sys/vaadin-button/vaadin-button.html","sys/vaadin-checkbox/src/vaadin-checkbox.html","sys/vaadin-checkbox/theme/lumo/vaadin-checkbox.html","sys/vaadin-checkbox/vaadin-checkbox.html","sys/vaadin-control-state-mixin/vaadin-control-state-mixin.html","sys/vaadin-date-picker/src/vaadin-date-picker-helper.html","sys/vaadin-date-picker/src/vaadin-date-picker-light.html","sys/vaadin-date-picker/src/vaadin-date-picker-mixin.html","sys/vaadin-date-picker/src/vaadin-date-picker-overlay-content.html","sys/vaadin-date-picker/src/vaadin-date-picker-overlay.html","sys/vaadin-date-picker/src/vaadin-date-picker-styles.html","sys/vaadin-date-picker/src/vaadin-date-picker.html","sys/vaadin-date-picker/src/vaadin-infinite-scroller.html","sys/vaadin-date-picker/src/vaadin-month-calendar.html","sys/vaadin-date-picker/theme/lumo/vaadin-date-picker-light.html","sys/vaadin-date-picker/theme/lumo/vaadin-date-picker-overlay-content.html","sys/vaadin-date-picker/theme/lumo/vaadin-date-picker-overlay.html","sys/vaadin-date-picker/theme/lumo/vaadin-date-picker.html","sys/vaadin-date-picker/theme/lumo/vaadin-month-calendar.html","sys/vaadin-date-picker/vaadin-date-picker-light.html","sys/vaadin-date-picker/vaadin-date-picker.html","sys/vaadin-development-mode-detector/vaadin-development-mode-detector.html","sys/vaadin-element-mixin/vaadin-element-mixin.html","sys/vaadin-grid/all-imports.html","sys/vaadin-grid/src/all-imports.html","sys/vaadin-grid/src/iron-list.html","sys/vaadin-grid/src/vaadin-grid-a11y-mixin.html","sys/vaadin-grid/src/vaadin-grid-active-item-mixin.html","sys/vaadin-grid/src/vaadin-grid-array-data-provider-mixin.html","sys/vaadin-grid/src/vaadin-grid-cell-click-mixin.html","sys/vaadin-grid/src/vaadin-grid-column-group.html","sys/vaadin-grid/src/vaadin-grid-column-reordering-mixin.html","sys/vaadin-grid/src/vaadin-grid-column-resizing-mixin.html","sys/vaadin-grid/src/vaadin-grid-column.html","sys/vaadin-grid/src/vaadin-grid-combined-mixin.html","sys/vaadin-grid/src/vaadin-grid-data-provider-mixin.html","sys/vaadin-grid/src/vaadin-grid-dynamic-columns-mixin.html","sys/vaadin-grid/src/vaadin-grid-filter-mixin.html","sys/vaadin-grid/src/vaadin-grid-filter.html","sys/vaadin-grid/src/vaadin-grid-keyboard-navigation-mixin.html","sys/vaadin-grid/src/vaadin-grid-outer-scroller.html","sys/vaadin-grid/src/vaadin-grid-row-details-mixin.html","sys/vaadin-grid/src/vaadin-grid-scroll-mixin.html","sys/vaadin-grid/src/vaadin-grid-scroller.html","sys/vaadin-grid/src/vaadin-grid-selection-column.html","sys/vaadin-grid/src/vaadin-grid-selection-mixin.html","sys/vaadin-grid/src/vaadin-grid-sort-mixin.html","sys/vaadin-grid/src/vaadin-grid-sorter.html","sys/vaadin-grid/src/vaadin-grid-styles.html","sys/vaadin-grid/src/vaadin-grid-templatizer.html","sys/vaadin-grid/src/vaadin-grid-tree-toggle.html","sys/vaadin-grid/src/vaadin-grid.html","sys/vaadin-grid/theme/lumo/all-imports.html","sys/vaadin-grid/theme/lumo/vaadin-grid-column-group.html","sys/vaadin-grid/theme/lumo/vaadin-grid-column.html","sys/vaadin-grid/theme/lumo/vaadin-grid-filter.html","sys/vaadin-grid/theme/lumo/vaadin-grid-selection-column.html","sys/vaadin-grid/theme/lumo/vaadin-grid-sorter.html","sys/vaadin-grid/theme/lumo/vaadin-grid-tree-toggle.html","sys/vaadin-grid/theme/lumo/vaadin-grid.html","sys/vaadin-grid/vaadin-grid-column-group.html","sys/vaadin-grid/vaadin-grid-column.html","sys/vaadin-grid/vaadin-grid-filter.html","sys/vaadin-grid/vaadin-grid-selection-column.html","sys/vaadin-grid/vaadin-grid-sorter.html","sys/vaadin-grid/vaadin-grid-tree-toggle.html","sys/vaadin-grid/vaadin-grid.html","sys/vaadin-lumo-styles/badge.html","sys/vaadin-lumo-styles/color.html","sys/vaadin-lumo-styles/font-icons.html","sys/vaadin-lumo-styles/icons.html","sys/vaadin-lumo-styles/mixins/field-button.html","sys/vaadin-lumo-styles/mixins/menu-overlay.html","sys/vaadin-lumo-styles/mixins/overlay.html","sys/vaadin-lumo-styles/sizing.html","sys/vaadin-lumo-styles/spacing.html","sys/vaadin-lumo-styles/style.html","sys/vaadin-lumo-styles/typography.html","sys/vaadin-lumo-styles/version.html","sys/vaadin-lumo-styles/wdio.conf.js","sys/vaadin-overlay/src/vaadin-overlay.html","sys/vaadin-overlay/theme/lumo/vaadin-overlay.html","sys/vaadin-overlay/vaadin-overlay.html","sys/vaadin-text-field/src/vaadin-password-field.html","sys/vaadin-text-field/src/vaadin-text-area.html","sys/vaadin-text-field/src/vaadin-text-field-mixin.html","sys/vaadin-text-field/src/vaadin-text-field.html","sys/vaadin-text-field/theme/lumo/vaadin-password-field.html","sys/vaadin-text-field/theme/lumo/vaadin-text-area.html","sys/vaadin-text-field/theme/lumo/vaadin-text-field.html","sys/vaadin-text-field/vaadin-password-field.html","sys/vaadin-text-field/vaadin-text-area.html","sys/vaadin-text-field/vaadin-text-field.html","sys/vaadin-themable-mixin/vaadin-themable-mixin.html","sys/vaadin-usage-statistics/vaadin-usage-statistics.html","sys/vaadin-usage-statistics/vaadin-usage-statistics.js","sys/vaadin-usage-statistics/wct.conf.js","sys/webcomponentsjs/custom-elements-es5-adapter.js","sys/webcomponentsjs/entrypoints/custom-elements-es5-adapter-index.js","sys/webcomponentsjs/entrypoints/webcomponents-ce-index.js","sys/webcomponentsjs/entrypoints/webcomponents-hi-ce-index.js","sys/webcomponentsjs/entrypoints/webcomponents-hi-index.js","sys/webcomponentsjs/entrypoints/webcomponents-hi-sd-ce-index.js","sys/webcomponentsjs/entrypoints/webcomponents-hi-sd-ce-pf-index.js","sys/webcomponentsjs/entrypoints/webcomponents-hi-sd-index.js","sys/webcomponentsjs/entrypoints/webcomponents-sd-ce-index.js","sys/webcomponentsjs/entrypoints/webcomponents-sd-index.js","sys/webcomponentsjs/externs/webcomponents.js","sys/webcomponentsjs/gulpfile.js","sys/webcomponentsjs/src/post-polyfill.js","sys/webcomponentsjs/src/pre-polyfill.js","sys/webcomponentsjs/src/promise.js","sys/webcomponentsjs/src/unresolved.js","sys/webcomponentsjs/webcomponents-ce.js","sys/webcomponentsjs/webcomponents-hi-ce.js","sys/webcomponentsjs/webcomponents-hi-sd-ce.js","sys/webcomponentsjs/webcomponents-hi-sd.js","sys/webcomponentsjs/webcomponents-hi.js","sys/webcomponentsjs/webcomponents-lite.js","sys/webcomponentsjs/webcomponents-loader.js","sys/webcomponentsjs/webcomponents-sd-ce.js","sys/webcomponentsjs/webcomponents-sd.js"];

function isRequestForAnAsset(url) {
  const lastPartOfUrl = url.split('/').pop();
  if (lastPartOfUrl.match(/\.\w{2,5}$/)) {
    // has an extenstion
    return true;
  }
  if (url.includes('htmlmerger')) {
    // an HTML merger url
    return true;
  }
  return false;
}

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return cacheNames.filter(
          cacheName => !currentCaches.includes(cacheName)
        );
      })
      .then(cachesToDelete => {
        return Promise.all(
          cachesToDelete.map(cacheToDelete => {
            return caches.delete(cacheToDelete);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    const acceptHeader = event.request.headers.get('accept');

    // skip Palindrom objects
    if (acceptHeader && acceptHeader.includes('application/json')) {
      return;
    }

    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request, {
            headers: { Accept: acceptHeader } // forward headers
          }).then(response => {
            // only cache assets
            // caching non-assets would cache eg MainPage (which is technically the app shell),
            // and would cache REST API calls
            if (isRequestForAnAsset(event.request.url)) {
              console.log('cached', event.request.url)
              return cache.put(event.request, response.clone()).then(() => {
                return response;
              });
            } else {
              console.log('skipped', event.request.url)
              return response;
            }
          });
        });
      })
    );
  }
});
