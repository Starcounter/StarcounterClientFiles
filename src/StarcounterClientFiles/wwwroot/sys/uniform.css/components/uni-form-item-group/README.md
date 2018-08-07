# &lt;uni-form-item-group&gt;

Custom element providing grouping for `<uni-form-item>` form items, support
an optional native `<label>` group label, and an optional `<output>` message.

## Demo

[Check it live!](https://starcounter.github.io/uniform.css/components/uni-form-item-group)

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
    <link rel="import" href="bower_components/uniform.css/components/uni-form-item-group/uni-form-item-group.html">
    ```

3. Start using it:

    ```html
    <uni-form-item-group>
        <label>Full name</label>
        <uni-form-item>
            <label>First name</label>
            <input>
            <output>Example: Jane</output>
        </uni-form-item>
        <uni-form-item>
            <label>Last name</label>
            <input>
            <output>Example: Doe</output>
        </uni-form-item>
        <output>Required</output>
    </uni-form-item-group>
    ```

    Supports using with Shadow DOM slots:

    ```html
    <label slot="MyApp/full-name-group">Full name</label>
    <output slot="MyApp/full-name-group">Required</output>

    <label slot="MyApp/first-name-item">First name</label>
    <input slot="MyApp/first-name-item">
    <output slot="MyApp/first-name-item">Example: Jane</output>

    <label slot="MyApp/last-name-item">Last name</label>
    <input slot="MyApp/last-name-item">
    <output slot="MyApp/last-name-item">Example: Doe</output>

    <template is="shadow-root">
        <uni-form-item-group>
            <slot name="MyApp/full-name-group"></slot>

            <uni-form-item>
                <slot name="MyApp/first-name-item"></slot>
            </uni-form-item>

            <uni-form-item>
                <slot name="MyApp/last-name-item"></slot>
            </uni-form-item>
        </uni-form-item-group>
    </template>
    ```

## Features

### Label element

- Optional
- Specified using a `<label>` element in the light DOM

### Form items

- Two or more items, the number is not strictly required
- Supports `<uni-form-item>` elements in the light DOM

### Message element

- Optional
- Specified using an `<output>` element in the light DOM
- Neutral by default, but can be presented as an error or a success message
    depending on the validity state

### Validity state

- Optional
- Specified using an `aria-invalid` attribute on the message element
- Examples:
    - Default: `aria-invalid` is empty or omitted, means valid, neutral message:
        ```html
        <uni-form-item-group>
            <!-- ... -->
            <output>Example: “Stockholm” / “111 48”</output>
        </uni-form-item-group>
        ```
    - `aria-invalid="true"` means invalid with error message:
        ```html
        <uni-form-item-group>
            <!-- ... -->
            <output aria-invalid="true">The post code does not match the city</output>
        </uni-form-item-group>
        ```
    - `aria-invalid="false"` means valid with success message:
        ```html
        <uni-form-item-group>
            <!-- ... -->
            <output aria-invalid="false">Looks good</output>
        </uni-form-item-group>
        ```

## View-model

```json
{
    "FirstItem$": "",
    "SecondItem$": "",
    "FieldGroupName": "",
    "FormItemMetadata": {
         "FieldGroupName": {
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
                <uni-form-item-group>
                    <label>{{model.FieldGroupName}}</label>

                    <uni-form-item>
                        <label>First item label</label>
                        <input value="{{model.FirstItem$::change}}">
                    </uni-form-item>

                    <uni-form-item>
                        <label>Second item label</label>
                        <input value="{{model.SecondItem$::change}}">
                    </uni-form-item>

                    <output aria-invalid$="{{model.FormItemMetadata.FieldGroupName.Invalid}}">{{model.FormItemMetadata.FieldGroupName.Message}}</output>
                </uni-form-item-group>

            </template>
        </dom-bind>
    </template>
```

## History

For detailed changelog, check [Releases](https://github.com/Starcounter/Uniform.css/releases).

## License

MIT
