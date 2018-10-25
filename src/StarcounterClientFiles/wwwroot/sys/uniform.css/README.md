# Uniform

Opinionated CSS library that plays nicely within Shadow DOM, plus a set of elements to be used as wrappers in Shadow DOM for distributed native elements.

It is a set of helper CSS classes to implement:

- contextual look &amp; feel for native HTML elements using classes such as `.uni-primary-button`, `.uni-alert-success`, etc
- typical UI patterns using classes such as `.uni-section-primary`, `.uni-card`, etc.

If you are looking for UI Components library check [Uniform components](components/).

📖 There are two GitHub repos:

- [uniform](https://github.com/Starcounter/uniform) is used to discuss the design system: guidelines, components, look and feel
- [UniformDocs](https://github.com/Starcounter/UniformDocs) is used to discuss the sample app and changes in that app

## Demo

[Check it live!](https://starcounter.github.io/uniform.css/)

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
    <link rel="stylesheet" href="/sys/uniform.css/uniform.css">
    <style>
        .app-header{
            color: var(--uni-info);
        }
    </style>
    <div class="app-header"><slot name="app/some"></slot></div>
    <div class="uni-alert-info"><slot name="app/content"></slot></div>
</template>
```

When Uniform.css is used in more than one shadow root, you will need to load it more than once. This results in multiple network requests unless `link rel="preload"` is used. Preload leverages the web browser's caching mechanism to skip the consecutive requests to the same URL.

```html
<link rel="preload" href="/sys/uniform.css/uniform.css">
```

### Load stylesheet and element in custom element definition
You can as well use Uniform.css and components in your custom element definitions.

```HTML
<!-- load Uniform component -->
<link rel="import" href="/sys/uniform.css/components/uni-date-picker/uni-date-picker.html">
<script>
customElements.define('my-element', class extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'}).innerHTML = `
            <!-- load Uniform.css -->
            <link rel="stylesheet" href="/sys/uniform.css/uniform.css"/>
            <style>
                :host{display: block;}
                /* use Uniform CSS Variables */
                span{color: var(--uni-default-primary);}
            </style>
            <!-- use Uniform classes -->
            <div class="uni-section-secondary"><div class="uni-alert-success"><div><slot></slot></div></div></div>
            <span>--uni-default-primary</span>
            <!-- use Uniform component -->
            <uni-date-picker><inupt type="date"></uni-date-picker>
        `;
    }
});
</script>
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
.uni-primary-button > ::slotted(button) {
   /* ... */
}
.uni-primary-button > button  {
   /* ... */
}
```

We are actually forced to do so because some browsers, which do not support Shadow DOM, fail to read entire selector and rule if they encounter an unsupported part. Having `::slotted` in
```CSS
.uni-primary-button > button,
.uni-primary-button > ::slotted(button) {
    /*...*/
}
```
would make entire rule unreachable. You don't need to provide those duplicated rules manually. Write ones for modern browsers - with `::slotted`, then the polyfill alternative will be automatically generated in the build process.

Also, we do provide both selectors, even for browsers that support SD natively, to be able to style elements within the same root.

## Contributing

If you modify CSS, please make sure to modify only files in `src` directory.

## FAQ

### I can't simplify my DOM element to be just a childness slottable element. How I should handle styling in that case?
You can either:
1. Style your element using light DOM classes (remember to prefix your class names, not to collide with other apps).
2. Create shadow root (for a native or a custom element) and put Uniform.css in its styling.
3. Use `starcounter-include` with a nested view inside.
4. We consider supporting the [`declarative-shadow-dom` custom element](https://tomalec.github.io/declarative-shadow-dom/), that will work anywhere in HTML.

   If you feel the need for it please express it at [Starcounter/RebelsLounge#78](https://github.com/Starcounter/RebelsLounge/issues/78) with a GitHub reaction, or a comment with your use-case.

   If you would also like to see this as a native feature check [whatwg/dom#510](https://github.com/whatwg/dom/issues/510).

### Can I use Uniform.css classes in the light DOM?
Technically you can import the stylesheet in the main document tree and use it there. But we do not recommend such use. It would become hard-coded into your app view. Then, a solution designer will not be able to change those classes and visual effects in his/her custom composition.

### How should I approach customising CSS variables provided by Uniform.css?

See the example at [starcounter.github.io/uniform.css](https://starcounter.github.io/uniform.css/)

You can edit Uniform.css variables by adding new values in specific selector in `declarative-shadow-dom` of your page.

See the [Smashing Magazine article](https://www.smashingmagazine.com/2017/04/start-using-css-custom-properties/) for more information about CSS variables, including scoping and inheritance.

To change the values for the entire shadow host you can use `:host` selector, but it does not work in the polyfilled browsers.
```html
<link rel="stylesheet" href="/sys/uniform.css/uniform.css">
<style>
    :host {
          --uni-section-padding-horizontal: 100px;
    }
</style>
<div class="uni-section-primary">
    <!-- this will get 100px padding -->
    <slot name="myapp/header"></slot>
</div>
```

A solution that works in all browsers is to specify the values at an element level.
```html
<link rel="stylesheet" href="/sys/uniform.css/uniform.css">
<style>
    .myapp-big-padded-section {
          --uni-section-padding-horizontal: 100px;
    }
</style>
<div class="myapp-big-padded-section">
    <div class="uni-section-primary">
        <!-- this will get 100px padding -->
        <slot name="myapp/header"></slot>
    </div>
</div>
<div class="uni-section-primary myapp-big-padded-section">
    <!-- this will get 100px padding -->
    <slot name="myapp/header"></slot>
</div>
```

### Are elements slottable if they are part of a nested `<template>`, such as `<template is="dom-if">`?


[`dom-if`](https://www.polymer-project.org/2.0/docs/devguide/templates) is a Polymer feature that stamps the content of the template as the sibling of that template. Therefore, it is fine to have the following code:

```html
<!-- light DOM -->
<template is="dom-if" if="{{model.IsBirthday}}" restamp>
    <div slot="appname/alert">Happy Birthday!</div>
</template>

<!-- shadow DOM -->
<div class="uni-alert-success"><slot name="appname/alert"></slot></div>
```
