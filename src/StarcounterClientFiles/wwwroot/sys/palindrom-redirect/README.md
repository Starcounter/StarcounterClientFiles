# &lt;palindrom-redirect&gt;

> Custom Element that redirects to a new URL when an attribute is changed. It can be configured to work using window location or History API.

## Demo

[Check it live!](http://Palindrom.github.io/palindrom-redirect)

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install palindrom-redirect --save
```

Or [download as ZIP](https://github.com/Palindrom/palindrom-redirect/archive/master.zip).

## Usage

1. Import Web Components' polyfill, if needed:

    ```html
    <script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="bower_components/palindrom-redirect/palindrom-redirect.html">
    ```

3. Start using it!

    ```html
    <palindrom-redirect url=""></palindrom-redirect>
    ```

## Attributes

Attribute      | Options            | Default  | Description
---            | ---                | ---      | ---
`url`          | *String*           |          | Destination URL
`url`          | `current`          |          | If a string `"current"` is provided as the URL, the component reloads the page
`history`      |                    |          | If attribute `history` is present, the History API `pushState` is used instead of `window.location`
`target`       | *String*           | `_self`  | Target where to open the link. Use `"_blank"` to open in new tab.

## Events

Name                       | Details             | Bubbles  | Description
---                        | ---                 | ---      | ---
`palindrom-redirect-pushstate`| `{url: "/new/path"}` |   yes    | Triggers every tie `history.state` is changed by the element. This event is being listened by Palindrom, and triggers updating its state.

## Methods

Name       | Parameters     | Returns                            | Description
---        | ---            | ---                                | ---
`redirect` | _{String}_ url | _{String}_ exact redirect location | Performs redirect to given url programmatically

## [Contributing and Development](CONTRIBUTING.md)

## History

For detailed changelog, check [Releases](https://github.com/Palindrom/redirect/releases).

## License

MIT
