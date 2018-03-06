&lt;starcounter-include&gt; [![Build Status](https://travis-ci.org/Starcounter/starcounter-include.svg?branch=master)](https://travis-ci.org/Starcounter/starcounter-include)
==============

`<starcounter-include>` is a custom element that lets you load partial HTML views into your Starcounter page, it uses  

- [`<imported-template>`](https://github.com/Juicy/imported-template) - You can take full control over loaded `<script>`s and `<link rel="import">`s. Thanks to HTML Imports - caching, script execution, etc. is completely native.

You can use Shadow DOM v1 features to apply Document Fragment with custom HTML composition and slots to tune the presentation of HTML Elements given by the partial HTML view. It lets you blend and apply your desired look & feel to elements given by your and even other apps - which were mixed due to Starcounter mappings.

For more details see articles:
- ["HTML partials/includes WebComponents-way"](http://starcounter.io/html-partialsincludes-webcomponents-way/) - How partials work,
- ["Unobtrusive styling and composing 3rd party HTML content"](http://starcounter.io/unobtrusive-styling-composing-3rd-party-html-content/) - How to style them with Shadow DOM,
- ["Layout compositions for HTML partials"](http://starcounter.io/layout-compositions-html-partials/) - How to use styles in Starcounter

### Kinds of compositions

`<starcounter-include>` recognizes 4 kinds of HTML compositions:

- Fallback composition - a single `<style>:host{display: block;}</style><slot></slot>` to display all things from light DOM in case no composition was provided
- Default composition - composition (or multiple concatenated compositions) found in the partial HTML view (`<template is="declarative-shadow-dom">` part)
- Custom composition - stored composition provided in JSON by BlendingProvider
- Temporary composition - explicit composition set directly in the shadow root of `starcounter-include` (for example by Chrome DevTools or `<starcounter-layout-html-editor>` in BlendingEditor)

### Small sample

If you have **/app/sub/page/path.html**:
```html
<template>
	<h1>Hello {{username}}</h1>
</template>
```
and merged/blended JSON view-model
```javascript
SubPageViewModel = {
    App: {
        username: "World"
        Html: "/app/sub/page/path.html"
    }
}
```
You can put it on screen with
```html
<starcounter-include view-model="{{ SubPageViewModel }}"></starcounter-include>
```
To produce
```html
<h1>Hello World</h1>
```

## Related custom elements

 - [`<starcounter-layout-html-editor>`](https://github.com/Starcounter/starcounter-layout-html-editor) - editor for Document Fragments

## Features

 - Applies two-way databinding, even for nested asynchronously loaded `<polymer-element>`s,
 - Multiple (concatenated) templates per partial HTML view,
 - Polymer's `<template>` features (binding, repeat, if, etc.),
 - HTML Imports features:
  - Sends request for template only once (HTML Import's caching),
  - Supports `<script>, <link>, <style>` tags to be executed once,
  - Supports `<script>, <style>` tags per template instance.
 - Easy way to attach presentation expressed in declarative Shadow DOM


### wiki
 - https://github.com/StarcounterPrefabs/Launcher/wiki/Partials
 - https://github.com/StarcounterPrefabs/Launcher/wiki/Layout-setup
 - https://github.com/StarcounterPrefabs/Launcher/wiki/include-template-in-Polyjuice

### Partial HTML views limitations

 - It should be W3C compliant Document body,
 - It should contain at least one `<template>` tag in root node.

### Partial JSON view-model conventions

 - View-model contains `Html` property with path to file (:construction:, or just inline markup).

## Install

Starcounter has it already pre-installed, under `/sys/starcounter-include/starcounter-include.html`, but if you want to use it separately as well.

Install the component using [Bower](http://bower.io/):

```sh
$ bower install starcounter-include --save
```

Or [download as ZIP](https://github.com/Starcounter/starcounter-include/archive/master.zip).

## Usage

1. Import Web Components' polyfill (if needed):

    ```html
    <script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="bower_components/starcounter-include/starcounter-include.html">
    ```

3. Start using it!

    ```html
    <starcounter-include view-model="{{ViewModel}}"></starcounter-include>
    ```
    or without mustache-style data-binding:
    ```js
    document.querySelector("starcounter-include").viewModel = ViewModel;
    ```
    or with inline JSON:
    ```html
    <starcounter-include view-model="{&quot;Html&quot;: &quot;/path/to/file.html&quot;, &quot;some&quot;: &quot;data&quot;}"></starcounter-include>
    ```

## Attributes

Attribute     | Options  | Default      | Description
---           | ---      | ---          | ---
`partial`     | *JSON*   |              | Set to provide partial JSON view-model. It's also a `partial` property.
`partial-id`  | *String* |              | **Read-only** attribute that represents `PartialID` fetched from `partial` JSON. It's also a `partialId` property.
`view-model`  | *JSON*   |              | Alias for `partial`

## Properties

Property   | Options           | Default | Description
---         | ---               | ---     | ---
`partial`   | *Object*          |         | Object containing partial JSON view-model, bindable with Polymer
`partialId` | *String*          |         | Partial Id used to identify partial, usually it's fetched from `partial.{compositionProvider}.PartialId`.
`viewModel` | *Object*          |         | Alias for `partial`
`compositionProvider` | *String* | `CompositionProvider_0` | Key/app name of composition provider. could be overwritten per instance `scInclude.compositionProvider` or globally by changing the prototype, like: `customElements.get('starcounter-include').prototype.compositionProvider = 'CustomProvider_7'`

## Events

Name                                    | Detail                 | Description
---                                     | ---                    | ---
`starcounter-include-composition-saved` | *String* stored composition | Triggered once composition is saved
`partial-changed`                       | *Object* `{value: storedComposition, path: 'partial.{compositionProvider}.Composition$'}` | Polymer notification protocol compliant event to notify about `partial.{compositionProvider}.Composition$` change, triggered once composition is saved.
`view-model-changed`                       | *Object* `{value: storedComposition, path: 'viewModel.{compositionProvider}.Composition$'}` | Polymer notification protocol compliant event to notify about `partial.{compositionProvider}.Composition$` change, triggered once composition is saved.

## Test suite

 - start mock server  and simple dev static files server `npm run serve`
 - open local browser at [`127.0.0.1:8081/components/starcounter-include/test/`](http://127.0.0.1:8081/components/starcounter-include/test/)

## Caveats

### ShadyCSS

In browsers with Shadow DOM polyfilled using [ShadyDOM](https://github.com/webcomponents/shadydom) and [ShadyCSS](https://github.com/webcomponents/shadycss), styles may still leak. This seems to be related to the limitation in the polyfill and its API.
 - it does not cover Vanilla JS custom elements automatically and API does not provide sufficient methods to cover our case,
 - shadow roots provided without template (compositions from DB) and different for every instance of the element seems not to be covered by polyfill at all,
 - style scoping methods that transform HTML markup seems to be broken when element is being upgraded.
ShadyCSS is going to be refactored soon, so we prefer to wait with heavy workarounds.

Please prepare your selectors more carefully. Feel free to report issues with your specific use-cases. We will try to provide a solution that works now, and make sure we will eventually cover them in a nice way.

## [Contributing and Development](CONTRIBUTING.md)

## History

For detailed changelog, check [Releases](https://github.com/Starcounter/starcounter-include/releases).

## License

MIT
