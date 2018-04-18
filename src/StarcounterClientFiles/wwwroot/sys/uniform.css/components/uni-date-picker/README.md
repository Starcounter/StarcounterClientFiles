# &lt;uni-date-picker&gt;

> Decorator-like custom element for `input type='date'` -> `vaadin-date-picker`

Let's you decorate native `input type="date"`, with prettier date-picker.

## Demo

[Check it live!](http://tomalec.github.io/uni-date-picker)
[Themed](http://tomalec.github.io/uni-date-picker/index-material.html)
[Integrated with Polymer notification protocol](http://tomalec.github.io/uni-date-picker/index-polymer-binding.html)

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install uni-date-picker --save
```

Or [download as ZIP](https://github.com/tomalec/uni-date-picker/archive/master.zip).

## Usage

1. Import polyfill:

    ```html
    <script src="bower_components/webcomponentsjs/webcomponents.min.js"></script>
    ```

2. Import custom element:

    ```html
    <link rel="import" href="bower_components/uni-date-picker/uni-date-picker.html">
    ```

3. Start using it!

    ```html
    <uni-date-picker><input type="date"></uni-date-picker>
    ```
    Or even in Shadow DOM with distributed child
    ```html
    <host-element>
        <label>Birthday</label>
        <input type="date" placeholder="pick a date">
        <template is="declarative-shadow-dom">
            <uni-date-picker><slot></slot></uni-date-picker>
        </template>
    </host-element>
    ```

## Attributes

### Native translated to [Vaadin API](https://vaadin.com/components/vaadin-date-picker/html-api)
Forwarded from decorated `<input>` element to inner vaadin element.

- `autofocus`
- `disabled`
- `max`      
- `min`      
- `name`     
- `placeholder`
- `readonly`
- `required`
- `value`    

Decorated `<label>`'s `.textContent` gets translated to the `label` attribute of `vaadin-date-picker` element.


## [Contributing and Development](CONTRIBUTING.md)

## History

For detailed changelog, check [Releases](https://github.com/tomalec/uni-date-picker/releases).

## License

MIT
