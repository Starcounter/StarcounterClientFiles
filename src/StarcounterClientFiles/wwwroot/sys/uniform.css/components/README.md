# <🥋/> Uniform components
> Collection of UI components that are used as wrappers over native elements.
> Custom elements that work well in light DOM as well as in shadow DOM to render custom UI controls based on data from native elements distributed from a different tree.

## Principles

1. We embrace the separation of content from presentation. The content of an app view cannot be changed, but the presentation can.
2. Developers are able to deliver their app rich in semantic content with good-looking presentation,
3. It is easy to make two or more apps running together look consistent. Preferably they should have consistent look by default. If an app developer is not aiming for an outstanding app-specific look, he/she should be able to use existing building blocks, that could be later changed by solution owners,
4. Starcounter can change the implementation of those building blocks without a need to change app's source code,
5. Solution owners should be able to change the final presentation of all apps combined, as well as changing the implementation of used building blocks.

## Solution


### Content vs. presentation boundary

To meet the first principle, we already established the convention to keep the content in light DOM and presentation in shadow DOM. shadow DOM presentation could be provided for every partial view, either in a source code of an app (`declarative-shadow-dom` element used by app devs), or from the database for an app or solution of apps (used by solution owners).
Thanks to such implementation, principle 2. is also met as App devs could still provide any kind of HTML content and any kind of HTML presentation, we just ask them to separate those two.

### Speaking of Consistency - Native HTML as the API

There are many disjoined parties involved in delivering the end result of many apps blended together on the same screen:
1. Solution owner, who mixes all apps,
2. Starcounter, who delivers a platform and building blocks,
3. App A developers,
...
N. App N developers.

To deliver any consistent result they all need to speak the same language. In that case, the language is HTML. Given the content needs to be heavily processed by all those parties and also by many different recipients, as
1. Customers,
2. Browsers,
3. Web crawlers, bots,
4. Mobile apps,
The content should preferably be **native** HTML. This will increase the chance that every party will know what given content element actually is. There is higher chance to find a web developer who knows how to use `<input type="range">`,  than someone who will know what to do with `<hypeact-awesome-picker>`.

Therefore we recommend expressing the content in native HTML semantics.

### Consistent Building Blocks - Look and feel achieved by the wrapper pattern

If we can assume most of the content is expressed with native HTML elements, we can safely say, their UI is really consistent.
However, I suspect, we can all agree it's rather limited (not to say boring or ugly).

That's why Starcounter provides Uniform Components - a set of custom elements to be used in a shadow DOM presentation capable of decorating (distributed) native elements, to create common UI widgets. Those elements share a consistent look and feel between each other, based on Uniform.css lightweight framework. Starcounter can either implement them, create wrappers for existing elements (like `paper-` or `vaadin-`), or delegate some elements to 3rd parties.

The goal is to cover most common UI widgets available in other component libraries, so app authors will have freedom of expression, and ease of building from blocks.

Also, thanks to the fact we have more control over this set of elements, we can assure easier theming.

### Replaceable blocks - Inversion of control implements replaceable components

As we settled native HTML semantics as the source of data, the biggest part of "API" is already established and stable. Therefore components themselves have minimal to no specific API. That lets Starcounter and solution owners change and improve the underlying implementation later, without affecting existing apps code. In worst case, the presentation will have to be updated. The content will never have to be updated.

### Solution owner's last word

As we put as much UI as we could to the shadow DOM presentation, the solution owner can now control almost every aspect of it. He/she can still use our blocks - just rearrange them, theme them differently, even change their underlying implementation making every `<uni-pagination>` render Nyancat. Finally, he/she can provide a completely new presentation that uses different custom elements.

## Example
Consider, you would like to provide a date picking control. As an app developer, you use a native HTML semantic to express the content, then put a single custom element in shadow DOM presentation to decorate it to look like a modern date picker.
```HTML
<lable slot="birth-date-label">Birthday</label>
<input slot="birth-date-input" type="date" value="{{model.BirthDate$}}" max="{{model.Today}}" lang="se-SV" disabled>

<template is="declarative-shadow-dom">
  <uni-date-picker>
    <slot name="birth-date-label"></slot>
    <slot name="birth-date-input"></slot>
  </uni-date-picker>
</template>
```
`uni-date-picker` implementation can for example use `<vaadin-date-picker label="Birthday" max="2018-04-06" value="1985-01-01" disabled></vaadin-date-picker>`, plus ca. 30 lines of JavaScript to setup locale.

## Techy details

Uniform components closely follow [Web Components Gold Standard](https://github.com/webcomponents/gold-standard/wiki), especially the point about [responding to content and **distributed** content changes](https://github.com/webcomponents/gold-standard/wiki/Content-Changes).
Elements reflect data changes to play well with data binding systems.

Naturally, sometimes apps could come up with presentation components that are not covered by Uniform library. As long as they are in shadow DOM, they still play well as they are easily changeable by solution owners, only consistency becomes a problem. But still, those more advanced elements could also use Uniform components inside.



Also, some apps could provide advanced elements as part of their content. `<canvas-drawing-sketch-pad>` is probably a feature of its own. We should not pretend it isn't and try to re-implement it with a bunch of `<input>`s


Unfortunately, the wrapper pattern is not so popular yet in custom element development, but given the lack of support for customized built-ins (`is=""`) that should change soon.
Also, not many currently available custom elements follow the gold standard, especially the part about distributed elements. We believe this will improve as Web Components ecosystem and platform matures.


## Additional Benefits
- SEO + bots  -  As we put only native elements in light DOM, and push specific custom elements to shadow DOM, SEO and robots will see the full content, and will be able to reason about every single element,
- accessibility & form submission  -  By wrapping native form controls, instead of hiding them in the shadow DOM of a `<custom-input>`, we overcome many problems that Web Components faces due to form submission and a11y. The native elements already have these features, and we do not have to die trying to re-implement on our own.
