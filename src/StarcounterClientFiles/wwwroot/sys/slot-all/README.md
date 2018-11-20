# &lt;slot-all&gt;

A custom element to distribute all elements regardless of their slot name

## Demo

[Check it live!](http://Juicy.github.io/slot-all)

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install slot-all --save
```

Or [download as ZIP](https://github.com/Juicy/slot-all/archive/master.zip).

## Usage

1. Import polyfill:

    ```html
    <script src="bower_components/webcomponentsjs/webcomponent-lite.js"></script>
    ```

2. Import custom element:

    ```html
    <link rel="import" href="bower_components/slot-all/slot-all.html">
    ```

3. Start using it!

    ```html
    <div>
        #shadow-root
            <slot-all></slot-all>
        <div slot="foo">Named slot</div>
    </div>
    ```

## Caveats

## Observing slottable elements in polyfilled browsers
WebComponentsJS Shadow DOM polyfill has some limitations.
It does ignore `node.remove()` and `.insertAdjacentElement()` calls,
meaning it cannot be observed or reflected in shadow root. This result in `slot-all` element being unable to react on child nodes been added or removed using these methods. If you are targeting polyfilled environments try using `node.parentNode.removeChild(node)` and `insertBefore`.
See issues https://github.com/webcomponents/shadydom/issues/260, https://github.com/webcomponents/shadydom/issues/261, https://github.com/webcomponents/shadydom/issues/262, https://github.com/webcomponents/shadydom/issues/263.

## NOT observing slots in runtime
This custom element creates slots once it's connected and observes host's children. But it does **not observe other slot elements** in the same tree. Meaning, if you add or remove some slot elements after `<slot-all>` did its job, the element will not correct the list of its slots. For example
```
<div slot="foo">Foo</div>
<div slot="bar">Bar</div>
#shadow root
    <slot name="foo"></slot>
    <slot-all><slot-all>
#/shadow root
```
will distribute "Foo" and "Bar", then if you later remove `<slot name="foo"></slot>` by yourself, `Foo` will no longer be distributed.

## [Contributing and Development](CONTRIBUTING.md)

## History

For detailed changelog, check [Releases](https://github.com/Juicy/slot-all/releases).

## License

MIT
