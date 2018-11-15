# &lt;uni-pagination&gt;

> A simple pagination element that makes your pagination life much easier! 

## Demo

[Check it live!](https://starcounter.github.io/uniform.css/components/uni-pagination)

## Usage

1. Import polyfill:

    ```html
    <script src="bower_components/webcomponentsjs/webcomponent-lite.js"></script>
    ```

2. Import custom element:

    ```html
    <link rel="import" href="bower_components/uniform.css/components/uni-pagination/uni-pagination.html">
    ```

3. Start using it!

    ```html
    <uni-pagination><input type="range" start="1" end="20" value="1" /></uni-pagination>
    ```

## Attributes

Forwarded from decorated [`<input type="range" />`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range) element and observed for later changes.

Attribute       | Options     | Default      | Description
---             | ---         | ---          | ---
`min`         | *Number*    | `1`          | The first page's value (if you have 1 - 5 pages, `min` should be 1)
`max`           | *Number*    | `1`          | The last page's value (if you have 1 - 5 pages, `max` should be 5)
`value`         | *Number*    | `min`      | The current page of your pagination

## License

MIT
