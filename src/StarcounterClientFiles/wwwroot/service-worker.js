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
const PRECACHE = 'BERPxLAlzLqBvSk+CXI+2IrbEGo=';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_WITHOUT_SYS = ["enlighted-link/enlighted-link.html","imported-template/imported-template.html","iron-a11y-announcer/iron-a11y-announcer.html","iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","iron-fit-behavior/iron-fit-behavior.html","iron-flex-layout/iron-flex-layout-classes.html","iron-flex-layout/iron-flex-layout.html","iron-icon/iron-icon.html","iron-iconset-svg/iron-iconset-svg.html","iron-media-query/iron-media-query.html","iron-meta/iron-meta.html","iron-overlay-behavior/iron-focusables-helper.html","iron-overlay-behavior/iron-overlay-backdrop.html","iron-overlay-behavior/iron-overlay-behavior.html","iron-overlay-behavior/iron-overlay-manager.html","iron-overlay-behavior/iron-scroll-manager.html","iron-resizable-behavior/iron-resizable-behavior.html","iron-scroll-target-behavior/iron-scroll-target-behavior.html","juicy-html/juicy-html.html","Palindrom/bump-version.js","Palindrom/dist/palindrom-dom.js","Palindrom/dist/palindrom-dom.min.js","Palindrom/dist/palindrom.js","Palindrom/dist/palindrom.min.js","Palindrom/docs/css/style.css","Palindrom/src/palindrom-dom.js","Palindrom/src/palindrom-errors.js","Palindrom/src/palindrom.js","Palindrom/src/URL.js","Palindrom/webpack.config.js","palindrom-client/notifySplices.html","palindrom-client/palindrom-client.html","palindrom-error-catcher/palindrom-error-catcher.html","palindrom-redirect/palindrom-redirect.html","palindrom-redirect/puppet-redirect.html","polymer/lib/elements/array-selector.html","polymer/lib/elements/custom-style.html","polymer/lib/elements/dom-bind.html","polymer/lib/elements/dom-if.html","polymer/lib/elements/dom-module.html","polymer/lib/elements/dom-repeat.html","polymer/lib/legacy/class.html","polymer/lib/legacy/legacy-element-mixin.html","polymer/lib/legacy/mutable-data-behavior.html","polymer/lib/legacy/polymer-fn.html","polymer/lib/legacy/polymer.dom.html","polymer/lib/legacy/templatizer-behavior.html","polymer/lib/mixins/dir-mixin.html","polymer/lib/mixins/element-mixin.html","polymer/lib/mixins/gesture-event-listeners.html","polymer/lib/mixins/mutable-data.html","polymer/lib/mixins/properties-changed.html","polymer/lib/mixins/properties-mixin.html","polymer/lib/mixins/property-accessors.html","polymer/lib/mixins/property-effects.html","polymer/lib/mixins/template-stamp.html","polymer/lib/utils/array-splice.html","polymer/lib/utils/async.html","polymer/lib/utils/boot.html","polymer/lib/utils/case-map.html","polymer/lib/utils/debounce.html","polymer/lib/utils/flattened-nodes-observer.html","polymer/lib/utils/flush.html","polymer/lib/utils/gestures.html","polymer/lib/utils/html-tag.html","polymer/lib/utils/import-href.html","polymer/lib/utils/mixin.html","polymer/lib/utils/path.html","polymer/lib/utils/render-status.html","polymer/lib/utils/resolve-url.html","polymer/lib/utils/settings.html","polymer/lib/utils/style-gather.html","polymer/lib/utils/templatize.html","polymer/lib/utils/unresolved.html","polymer/polymer-element.html","polymer/polymer.html","shadycss/apply-shim.html","shadycss/apply-shim.min.js","shadycss/custom-style-interface.html","shadycss/custom-style-interface.min.js","shadycss/entrypoints/apply-shim.js","shadycss/entrypoints/custom-style-interface.js","shadycss/entrypoints/scoping-shim.js","shadycss/examples/custom-style-element.js","shadycss/examples/document-style-lib.js","shadycss/externs/shadycss-externs.js","shadycss/gulpfile.js","shadycss/scoping-shim.min.js","shadycss/src/apply-shim-utils.js","shadycss/src/apply-shim.js","shadycss/src/common-regex.js","shadycss/src/common-utils.js","shadycss/src/css-parse.js","shadycss/src/custom-style-interface.js","shadycss/src/document-wait.js","shadycss/src/document-watcher.js","shadycss/src/scoping-shim.js","shadycss/src/style-cache.js","shadycss/src/style-info.js","shadycss/src/style-placeholder.js","shadycss/src/style-properties.js","shadycss/src/style-settings.js","shadycss/src/style-transformer.js","shadycss/src/style-util.js","shadycss/src/template-map.js","shadycss/src/unscoped-style-handler.js","slot-all/slot-all.html","starcounter-include/starcounter-include.html","starcounter.html","uniform.css/build.js","uniform.css/components/uni-data-table/uni-data-table-column.html","uniform.css/components/uni-data-table/uni-data-table-filter.html","uniform.css/components/uni-data-table/uni-data-table-sorter.html","uniform.css/components/uni-data-table/uni-data-table.html","uniform.css/components/uni-date-picker/polymer-binding.html","uniform.css/components/uni-date-picker/theming.html","uniform.css/components/uni-date-picker/uni-date-picker.html","uniform.css/components/uni-form-item/uni-form-item.html","uniform.css/components/uni-form-item-group/uni-form-item-group.html","uniform.css/components/uni-pagination/uni-pagination.html","uniform.css/dist/commando.css","uniform.css/dist/commando.unminified.css","uniform.css/dist/underwear.css","uniform.css/dist/underwear.unminified.css","uniform.css/dist/uniform.css","uniform.css/dist/uniform.unminified.css","uniform.css/uniform.css","uniform.css/webpack.config.js","vaadin-button/src/vaadin-button.html","vaadin-button/theme/lumo/vaadin-button.html","vaadin-button/vaadin-button.html","vaadin-checkbox/src/vaadin-checkbox.html","vaadin-checkbox/theme/lumo/vaadin-checkbox.html","vaadin-checkbox/vaadin-checkbox.html","vaadin-control-state-mixin/vaadin-control-state-mixin.html","vaadin-date-picker/src/vaadin-date-picker-helper.html","vaadin-date-picker/src/vaadin-date-picker-light.html","vaadin-date-picker/src/vaadin-date-picker-mixin.html","vaadin-date-picker/src/vaadin-date-picker-overlay-content.html","vaadin-date-picker/src/vaadin-date-picker-overlay.html","vaadin-date-picker/src/vaadin-date-picker-styles.html","vaadin-date-picker/src/vaadin-date-picker.html","vaadin-date-picker/src/vaadin-infinite-scroller.html","vaadin-date-picker/src/vaadin-month-calendar.html","vaadin-date-picker/theme/lumo/vaadin-date-picker-light.html","vaadin-date-picker/theme/lumo/vaadin-date-picker-overlay-content.html","vaadin-date-picker/theme/lumo/vaadin-date-picker-overlay.html","vaadin-date-picker/theme/lumo/vaadin-date-picker.html","vaadin-date-picker/theme/lumo/vaadin-month-calendar.html","vaadin-date-picker/vaadin-date-picker-light.html","vaadin-date-picker/vaadin-date-picker.html","vaadin-development-mode-detector/vaadin-development-mode-detector.html","vaadin-element-mixin/vaadin-element-mixin.html","vaadin-grid/all-imports.html","vaadin-grid/src/all-imports.html","vaadin-grid/src/iron-list.html","vaadin-grid/src/vaadin-grid-a11y-mixin.html","vaadin-grid/src/vaadin-grid-active-item-mixin.html","vaadin-grid/src/vaadin-grid-array-data-provider-mixin.html","vaadin-grid/src/vaadin-grid-cell-click-mixin.html","vaadin-grid/src/vaadin-grid-column-group.html","vaadin-grid/src/vaadin-grid-column-reordering-mixin.html","vaadin-grid/src/vaadin-grid-column-resizing-mixin.html","vaadin-grid/src/vaadin-grid-column.html","vaadin-grid/src/vaadin-grid-combined-mixin.html","vaadin-grid/src/vaadin-grid-data-provider-mixin.html","vaadin-grid/src/vaadin-grid-dynamic-columns-mixin.html","vaadin-grid/src/vaadin-grid-filter-mixin.html","vaadin-grid/src/vaadin-grid-filter.html","vaadin-grid/src/vaadin-grid-keyboard-navigation-mixin.html","vaadin-grid/src/vaadin-grid-outer-scroller.html","vaadin-grid/src/vaadin-grid-row-details-mixin.html","vaadin-grid/src/vaadin-grid-scroll-mixin.html","vaadin-grid/src/vaadin-grid-scroller.html","vaadin-grid/src/vaadin-grid-selection-column.html","vaadin-grid/src/vaadin-grid-selection-mixin.html","vaadin-grid/src/vaadin-grid-sort-mixin.html","vaadin-grid/src/vaadin-grid-sorter.html","vaadin-grid/src/vaadin-grid-styles.html","vaadin-grid/src/vaadin-grid-templatizer.html","vaadin-grid/src/vaadin-grid-tree-toggle.html","vaadin-grid/src/vaadin-grid.html","vaadin-grid/theme/lumo/all-imports.html","vaadin-grid/theme/lumo/vaadin-grid-column-group.html","vaadin-grid/theme/lumo/vaadin-grid-column.html","vaadin-grid/theme/lumo/vaadin-grid-filter.html","vaadin-grid/theme/lumo/vaadin-grid-selection-column.html","vaadin-grid/theme/lumo/vaadin-grid-sorter.html","vaadin-grid/theme/lumo/vaadin-grid-tree-toggle.html","vaadin-grid/theme/lumo/vaadin-grid.html","vaadin-grid/vaadin-grid-column-group.html","vaadin-grid/vaadin-grid-column.html","vaadin-grid/vaadin-grid-filter.html","vaadin-grid/vaadin-grid-selection-column.html","vaadin-grid/vaadin-grid-sorter.html","vaadin-grid/vaadin-grid-tree-toggle.html","vaadin-grid/vaadin-grid.html","vaadin-lumo-styles/badge.html","vaadin-lumo-styles/color.html","vaadin-lumo-styles/font-icons.html","vaadin-lumo-styles/icons.html","vaadin-lumo-styles/mixins/field-button.html","vaadin-lumo-styles/mixins/menu-overlay.html","vaadin-lumo-styles/mixins/overlay.html","vaadin-lumo-styles/sizing.html","vaadin-lumo-styles/spacing.html","vaadin-lumo-styles/style.html","vaadin-lumo-styles/typography.html","vaadin-lumo-styles/version.html","vaadin-lumo-styles/wdio.conf.js","vaadin-overlay/src/vaadin-overlay.html","vaadin-overlay/theme/lumo/vaadin-overlay.html","vaadin-overlay/vaadin-overlay.html","vaadin-text-field/src/vaadin-password-field.html","vaadin-text-field/src/vaadin-text-area.html","vaadin-text-field/src/vaadin-text-field-mixin.html","vaadin-text-field/src/vaadin-text-field.html","vaadin-text-field/theme/lumo/vaadin-password-field.html","vaadin-text-field/theme/lumo/vaadin-text-area.html","vaadin-text-field/theme/lumo/vaadin-text-field.html","vaadin-text-field/vaadin-password-field.html","vaadin-text-field/vaadin-text-area.html","vaadin-text-field/vaadin-text-field.html","vaadin-themable-mixin/vaadin-themable-mixin.html","vaadin-usage-statistics/vaadin-usage-statistics.html","vaadin-usage-statistics/vaadin-usage-statistics.js","vaadin-usage-statistics/wct.conf.js","webcomponentsjs/custom-elements-es5-adapter.js","webcomponentsjs/entrypoints/custom-elements-es5-adapter-index.js","webcomponentsjs/entrypoints/webcomponents-ce-index.js","webcomponentsjs/entrypoints/webcomponents-hi-ce-index.js","webcomponentsjs/entrypoints/webcomponents-hi-index.js","webcomponentsjs/entrypoints/webcomponents-hi-sd-ce-index.js","webcomponentsjs/entrypoints/webcomponents-hi-sd-ce-pf-index.js","webcomponentsjs/entrypoints/webcomponents-hi-sd-index.js","webcomponentsjs/entrypoints/webcomponents-sd-ce-index.js","webcomponentsjs/entrypoints/webcomponents-sd-index.js","webcomponentsjs/externs/webcomponents.js","webcomponentsjs/gulpfile.js","webcomponentsjs/src/post-polyfill.js","webcomponentsjs/src/pre-polyfill.js","webcomponentsjs/src/promise.js","webcomponentsjs/src/unresolved.js","webcomponentsjs/webcomponents-ce.js","webcomponentsjs/webcomponents-hi-ce.js","webcomponentsjs/webcomponents-hi-sd-ce.js","webcomponentsjs/webcomponents-hi-sd.js","webcomponentsjs/webcomponents-hi.js","webcomponentsjs/webcomponents-lite.js","webcomponentsjs/webcomponents-loader.js","webcomponentsjs/webcomponents-sd-ce.js","webcomponentsjs/webcomponents-sd.js"];

/* there is a couple hundred URLs all prefixed with `sys`. Removing those `sys`es and adding them here saves ~1KB */
const PRECACHE_URLS = PRECACHE_WITHOUT_SYS.map(url => `sys/${url}`);


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
