:neckbeard: This is not a sample app. For the sample app, see [Launcher](https://github.com/StarcounterPrefabs/Launcher).

------

Launcher's &lt;starcounter-include&gt;
==============

This is Launcher's version of [`<starcounter-include>`](https://github.com/Starcounter/starcounter-include).
Launcher overwrites it with is a custom element that not only let's you load HTML partials into your Starcounter page with full control over loaded `<script>`s and `<link rel="import">`s, but also allows you to gently manage output from many apps mixed by Starcounter mappings.

## Demo/Examples
:construction:
[Example in Starcounter Fiddle!]()

## Related custom elements

 - [`<starcounter-include>`](https://github.com/Starcounter/starcounter-include) - includes Starcounter Partial,
 - [`<imported-template>`](https://github.com/Juicy/imported-template) - includes HTML Template,
 - [`<juicy-tile-grid>`](https://github.com/Juicy/juicy-tile-grid),
   - x-browser fallback [`<juicy-tile-table>`](https://github.com/Juicy/juicy-tile-table),
 - [`<juicy-tile-list>`](https://github.com/Juicy/juicy-tile-list),
 - [`<juicy-tile-editor>`](https://github.com/Juicy/juicy-tile-editor),
 - [`<juicy-tiles-setup-sync>`](https://github.com/Juicy/juicy-tiles-setup-sync)

## Related wiki articles:

 - https://github.com/StarcounterPrefabs/Launcher/wiki/Partials
 - https://github.com/StarcounterPrefabs/Launcher/wiki/Layout-setup
 - https://github.com/StarcounterPrefabs/Launcher/wiki/include-template-in-Polyjuice


## Install

[Launcher](https://github.com/StarcounterPrefabs/Launcher) has it already pre-installed, under `/sys/starcounter-include/starcounter-include.html` (overwrites Starcounter's one), but if you want to use it separately as well.

Install the component using [Bower](http://bower.io/):

```sh
$ bower install StarcounterPrefabs/launcher-include --save
```

Or [download as ZIP](https://github.com/StarcounterPrefabs/launcher-include/archive/master.zip).

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
 - [online](http://starcounter.github.io/starcounter-include/tests)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

For detailed changelog, check [Releases](https://github.com/StarcounterPrefabs/launcher-include/releases).
