&lt;starcounter-include&gt;
==============

`<starcounter-include>` is a custom element that let's you load HTML partials into your Starcounter page, it uses [`<imported-template>`](https://github.com/Juicy/imported-template), so, you can take full control over loaded `<script>`s and `<link rel="import">`s. Thanks to HTML Imports - caching, script execution, etc. is completely native.
g
### Small sample

If you have **/app/sub/page/path.html**:
```html
<template>
	<h1>Hello {{username}}</h1>
</template>
```
and JSON view-model
```javascript
SubPageViewModel = {
  username: "World"
  html: "/app/sub/page/path.html"
}
```
You can put it on screen with
```html
<starcounter-include partial="{{ SubPageViewModel }}"></starcounter-include>
```
To produce
```html
<h1>Hello World</h1>
```

## Demo/Examples
:construction:
[Example in Starcounter Fiddle!]()

### [`<imported-template>` Demo/Example](https://github.com/Juicy/imported-template#demoexamples)

### [Test/Use cases](http://polyjuice.github.io/starcounter-include/tests)

## Features

 - Applies two-way databinding, even for nested asynchronously loaded `<polymer-element>`s,
 - Multiple (concatenated) templates per partial, 
 - Polymer's `<template>` features (binding, repeat, if, etc.),
 - HTML Imports features: 
  - Sends request for template only once (HTML Import's caching),
  - Supports `<script>, <link>, <style>` tags to be executed once,
  - Supports `<script>, <style>` tags per template instance.

### HTML Partial limitations

 - It should be W3C compliant Document body,
 - It should contain at least one `<template>` tag in root node.

### Partial conventions

 - View-model contains `Html` property with path to file (:construction:, or just inline markup).

## Install

Starcounter has it already pre-installed, under `/sys/starcounter-include/starcounter-include.html`, but if you want to use it separately as well.

Install the component using [Bower](http://bower.io/):

```sh
$ bower install Polyjuice/starcounter-include --save
```

Or [download as ZIP](https://github.com/Polyjuice/starcounter-include/archive/master.zip).

## Usage

1. Import Web Components' polyfill (if needed):

    ```html
    <script src="bower_components/webcomponentsjs/webcomponents.js">
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="bower_components/starcounter-include/starcounter-include.html">
    ```

3. Start using it!

    ```html
    <starcounter-include partial="{{ViewModel}}"></starcounter-include>
    ```
    or without mustache-style data-binding:
    ```js
    document.querySelector("starcounter-include").partial = ViewModel;
    ```
    or with inline JSON:
    ```js
    <starcounter-include partial="{&quot;Html&quot;: &quot;/path/to/file.html&quot;, &quot;some&quot;: &quot;data&quot;}"></starcounter-include>
    ```

## Test suite

 - local browser `./tests/index.html`
 - [online](http://polyjuice.github.io/starcounter-include/tests)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

For detailed changelog, check [Releases](https://github.com/Polyjuice/starcounter-include/releases).
