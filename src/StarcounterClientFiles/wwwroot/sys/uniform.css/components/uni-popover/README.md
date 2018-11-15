# &lt;uni-popover&gt;

> A simple popover with an arrow to your target element. It figures out the arrow direction automatically. Built around [`juicy-popover`](https://github.com/Juicy/juicy-popover).

## Demo

[Check it live!](https://starcounter.github.io/uniform.css/components/uni-popover)

## Usage

1. Import polyfill:

   ```html
   <script src="bower_components/webcomponentsjs/webcomponent-lite.js"></script>
   ```

2. Import custom element:

   ```html
   <link rel="import" href="bower_components/uniform.css/components/uni-popover/uni-popover.html">
   ```

3. Start using it!

   ```html
   <uni-popover><input type="range" start="1" end="20" value="1" /></uni-popover>
   ```

## Slots

`uni-popover` handles two slots, `handle` and `expandable`. To be used as:

```html
<uni-popover>
    <button slot="handle">Click me!</button>
    <div slot="expandable">Hello, i'm popovered content DOM</div>
</uni-popover>
```

## Attributes and properties

| Name | Default value |   Acceptable values    |
| ---- | :-----------: | :--------------------: |
| mode |   `baloon`    | `baloon` and `compact` |

## CSS Properties

| Name                        |              Default value               |
| --------------------------- | :--------------------------------------: |
| --uni-popover-background    |                  white                   |
| --uni-popover-padding       |                   10px                   |
| --uni-popover-border        |              1px solid #eee              |
| --uni-popover-shadow        | 5px 5px 10px -4px rgba(176, 176, 176, 1) |
| --uni-popover-border-radius |                   15px                   |

For more code samples see [demos](https://starcounter.github.io/uniform.css/components/uni-popover).

## License

MIT
