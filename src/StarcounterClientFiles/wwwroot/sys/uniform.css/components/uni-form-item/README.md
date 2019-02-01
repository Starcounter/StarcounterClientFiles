# &lt;uni-form-item&gt;

Custom element decorating an optional native `<label>`, any native or custom
form control element, and an optional `<output>` message as a form item.

## Demo

[Check it live!](https://starcounter.github.io/uniform.css/components/uni-form-item)

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install uniform.css --save
```

Or [download as ZIP](https://github.com/Starcounter/uniform.css/archive/master.zip).

## Usage

1. Import polyfill:

    ```html
    <script src="bower_components/webcomponentsjs/webcomponents.min.js"></script>
    ```

2. Import custom element:

    ```html
    <link rel="import" href="bower_components/uniform.css/components/uni-form-item/uni-form-item.html">
    ```

3. Start using it:

    ```html
    <uni-form-item>
        <label>Label</label>
        <input>
        <output>Message</output>
    </uni-form-item>
    ```

    Supports using with Shadow DOM slots:

    ```html
    <label slot="MyApp/FormItemEmail">Email</label>
    <input type="email" slot="MyApp/FormItemEmail">

    <template is="declarative-shadow-dom">
        <uni-form-item>
            <slot name="MyApp/FormItemEmail"></slot>
        </uni-form-item>
    </template>
    ```

## Features

### Label element

- Optional
- Specified using a `<label>` element in the light DOM
- Automatically bound to the control, no need to manually specify
    `<label for="">`

### Form control element

- Required
- Supports an element of any kind, including, but not limited to: `<input>`,
    `<textarea>`, `<select>`, custom elements.

### Message element

- Optional
- Specified using an `<output>` element in the light DOM
- Automatically set as an ARIA description of the control
- Neutral by default, but can be presented as an error or a success message
    depending on the validity state

### Validity state

- Optional
- Specified using an `aria-invalid` attribute on the control
- Examples:
    - Default: `aria-invalid` is empty or omitted, means valid, neutral message:
        ```html
        <uni-form-item>
            <label>Search the map</label>
            <input type="Search">
            <output>Example: “restaurants near me”</output>
        </uni-form-item>
        ```
    - `aria-invalid="true"` means invalid with error message:
        ```html
        <uni-form-item>
            <label>Email</label>
            <input type="email" value="foo" aria-invalid="true">
            <output>Invalid email</output>
        </uni-form-item>
        ```
    - `aria-invalid="false"` means valid with success message:
        ```html
        <uni-form-item>
            <label>Username</label>
            <input type="text" value="Someone" aria-invalid="false">
            <output>The username is free</output>
        </uni-form-item>
        ```

### Custom CSS Properties

The following CSS Custom Properties are supported:

- `--uni-form-item-gap-content`, fallback value: `none`

    By default, the item does not have empty columns on the sides. Set to `''`
    to enable empty column spacing on the side (on the right in LTR
    and left in RTL). Used by `<uni-form-item-group>` to make gaps between
    the horizontally stacked `<uni-form-item>` elements.

- `--uni-form-item-control-border`, fallback value: none

    Override the border style on the control element. Used
    by `<uni-form-item-group>` to make red borders for the invalid group state.

## View-model

```json
{
    "FieldName$": "",
    "FormItemMetadata": {
        "FieldName": {
            "Message": "",
            "Invalid": ""
        }

    }
}
```

Example view:

```html
    <template>
        <dom-bind>
            <template>
                <label slot="MyApp/FieldName">My field</label>
                <input slot="MyApp/FieldName"
                    value="{{model.FieldName$::change}}"
                    aria-invalid$="{{model.FormItemMetadata.FieldName.Invalid}}">
                <output slot="MyApp/FieldName">{{model.FormItemMetadata.FieldName.Message}}</output>
            </template>
        </dom-bind>
        <template is="declarative-shadow-dom">
            <uni-form-item>
                <slot name="MyApp/FieldName"></slot>
            </uni-form-item>
        </template>
    </template>
```

## Caveats

By default `uni-form-item` width is set to `100%`, so it could occupy entire (grid) area given (for example by the simple composition editor).
To achieve intrinsic size, you can use `max-content`:
```css
uni-form-item{
    width: -moz-max-content;
    width: max-content;
}
```

However MS Edge, does not support it. Therefore, the intrinsic size of `uni-form-item` falls back to `100%`.

Feel invited to cast your vote for `width: max-content` in Edge:
 - https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6263702-css-intrinsic-sizing
 - https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/9100963-max-content

## History

For detailed changelog, check [Releases](https://github.com/Starcounter/Uniform.css/releases).

## License

MIT
