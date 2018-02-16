# Uniform.css
Lightweight, opinionated CSS library that plays nicely within Shadow DOM.

## Install

Install the component using [Bower](http://bower.io/):
```sh
$ bower install uniform.css
```

Or [download as ZIP](https://github.com/Starcounter/Uniform.css/archive/master.zip).

<!-- [Starcounter 2.4.0.+](https://starcounter.io/) has it already pre-installed, under `/sys/uniform.css/uniform.css`. -->

## Load stylesheet
As this is library is designed to play well within Shadow DOM, we encourage you to use it only in shadow roots not to affect other apps, or outer elements look.

```html
<h3 slot="app/some">Some</h3>
<custom-element slot="app/content">Content</custom-element>
<template is="declarative-shadow-dom">
    <style>
        @import '/sys/uniform.css/uniform.css';
        .app-header{
            color: var(--uni-info);
        }
    </style>
    <div class="app-header"><slot name="app/some"></slot></div>
    <div class="uni-alert-info"><slot name="app/content"></slot></div>
</template>
```



## Usage, Elements, Classes
To see how to use it, what elements and classes we define, check the [demo page](https://starcounter.github.io/uniform.css/).

## Conventions
TBD

## Caveats
There are few caveats you could face due to Shadow DOM polyfill limitations:

### Wrapping slots
We would really love to support short and clean usage:
```html
<button slot="my-slot-for-button">light DOM button</button>
#shadowRoot
    <link rel="stylesheet" href="path/to/uniform.css">
    <slot class="uni-primary-button" name="my-slot-for-button"></slot>
    ...
    <button class="uni-primary-button">shadow DOM button</button>
```
To apply `uni-primary-button` class directly on the `slot` that distributes a button, as it's usually done for the button itself.

Unfortunately, due to the fact [polyfill does not support selecting slot element](https://github.com/webcomponents/shadycss/issues/155), we cannot do that.


Therefore, you have to wrap slot in an element.
```html
<button slot="my-slot-for-button">light DOM button</button>
#shadowRoot
    <link rel="stylesheet" href="path/to/uniform.css">
    <div class="uni-primary-button">
        <slot name="my-slot-for-button"></slot>
    </div>
    ...
    <div class="uni-primary-button">
        <button>shadow DOM button</button>
    </div>
```

In future, when it becomes possible to apply classes on `slot` elements in a cross-browser way, we could introduce classes like `uni-primary-button-element` without breaking backward compatibility and requiring any code change.

### Not so DRY code, duplicated rules
You might notice (especially as a contributor), that we use duplicated rules, like:
```CSS
.uni-label-control > ::slotted(label) {
  text-align: left;
  grid-column: 1 / 2;
}
.uni-label-control > label {
  text-align: left;
  grid-column: 1 / 2;
}
```

We are actually forced to do so because some browsers, which does not support Shadow DOM, fails to read entire selector and rule if it encounters unsupported part. Having `::slotted` in
```CSS
.uni-label-control > label,
.uni-label-control > ::slotted(label) {
```
would make entire rule unreachable. Also, we do not provide both selectors, even for browsers that support SD natively, to be able to style elements within the same root.

## Contributing

If you modify CSS, please make sure to modify only files in `src` directory.
