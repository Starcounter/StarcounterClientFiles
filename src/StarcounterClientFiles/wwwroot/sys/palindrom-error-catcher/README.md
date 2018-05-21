# &lt;palindrom-error-catcher&gt; [![Build Status](https://travis-ci.org/Palindrom/palindrom-error-catcher.svg?branch=gh-pages)](https://travis-ci.org/Palindrom/palindrom-error-catcher)

---

> Handles palindrom-client disconnection events and creates the needed UI to give the user control over them

Custom Element that binds with [palindrom-client](https://github.com/Palindrom/palindrom-client) connection events and shows a simple UI that allows the user to interact with the events. It is can be used as an example of designing your own error-preseting UI.

Please check the code at `palindrom-error-catcher.html` file to see how events are handled. 

## Creating your own

If you want to gain control over the appearance of your errors UI. You can fork this element, put it in the `wwwroot/sys/` folder of your app. And edit it as desired. Once you have an element in this folder with the same name, it will supersede the default one and your UI will be shows. 

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install palindrom-error-catcher --save
```

Or [download as ZIP](https://github.com/Palindrom/palindrom-error-catcher/archive/master.zip).

## Usage

1. Import polyfill:

    ```html
    <script src="bower_components/webcomponentsjs/webcomponent-lite.js"></script>
    ```

2. Import custom element:

    ```html
    <link rel="import" href="bower_components/palindrom-error-catcher/palindrom-error-catcher.html">
    ```

3. Start using it!

    ```html
    <palindrom-error-catcher></palindrom-error-catcher>
    ```

## Options

Attribute     | Options     | Default      | Description
---           | ---         | ---          | ---
`target-selector`         | *string*    | `palindrom-client`        | CSS selector of `palindrom-client` element.

## Methods

Method        | Parameters   | Returns     | Description
---           | ---          | ---         | ---
`cancelReloading()`   | None.        | Nothing.    | Cancels reloading timer and hides the disconnection bar.

## [Contributing and Development](CONTRIBUTING.md)

## History

For detailed changelog, check [Releases](https://github.com/Palindrom/palindrom-error-catcher/releases).

## License

MIT
