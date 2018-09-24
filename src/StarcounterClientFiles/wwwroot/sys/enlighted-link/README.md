# &lt;enlighted-link&gt;

> Custom element to enlighten your `<link>`s from Shadow DOM to the Light.

By current spec [HTML Imports do not work in Shadow DOM](https://github.com/w3c/webcomponents/issues/628). That makes it hard to import definitions of custom elements that you use in a shadow root. This element allows you to do that. You could import your dependencies exactly where and when you need them.

## Demo

[Check it live!](http://Juicy.github.io/enlighted-link)

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install enlighted-link --save
```

Or [download as ZIP](https://github.com/Juicy/enlighted-link/archive/master.zip).

## Usage

1. Import polyfill:

    ```html
    <script src="bower_components/webcomponentsjs/webcomponent-lite.js"></script>
    ```

2. Import custom element:

    ```html
    <link rel="import" href="bower_components/enlighted-link/enlighted-link.html">
    ```

3. Start using it!

    ```html
    <div>
        #shadow-root
            <enlighted-link rel="import" href="path/to/some-thing.html"></enlighted-link>
            <!-- now you can use whatever you imported -->
            <some-thing></some-thing>
        #/shadow-root
    </div>
    ```

## Options

The element forwards [`link` element's content attributes](https://dev.w3.org/html5/spec-preview/the-link-element.html), to the eventually created `<link>` in light DOM.

- href
- rel
- media
- hreflang
- type
- sizes
- title

## Properties

Property   | Options           | Default | Description
---        | ---               | ---     | ---
`link`     | *HTMLLinkElement* |         | The reference to created `<link>` element. `null` if not yet created. Please note, that `link` element can be disconnected from document tree when `<enlighted-link>` is disconnected.

## Events

The element forwards following events from created `<link>`:
- `load`,
- `error`

## [Contributing and Development](CONTRIBUTING.md)

## History

For detailed changelog, check [Releases](https://github.com/Juicy/enlighted-link/releases).

## License

MIT
