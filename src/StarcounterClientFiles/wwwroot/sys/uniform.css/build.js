/**
 * This script runs after Webpack finishes bundling
 */

const fs = require('fs');
const postcss = require('postcss');
const path = require('path');

console.log('PostCSS script started..');

// see https://github.com/Starcounter/uniform.css/issues/146
function removeTransparentLinks(from) {
  return postcss().use(function(css) {
    css.nodes.forEach(node => {
      if(node.selector === 'a') {
        if(node.nodes.length && node.nodes[0].prop === 'background-color' && node.nodes[0].value === 'transparent') {
          node.nodes[0].remove();
        }
        if(node.nodes.length === 0) { // if the ruleset is empty now (has no properties left) remove it all
          node.remove();
        }
      }
    })
  }).process(from).css;
}

function convertSlottedToNormal(css) {
  return postcss()
    .use(function(css) {
      const lightDOMRules = [];
      css.nodes.forEach(node => {
        if (node.selector && node.selector.includes('::slotted')) {
          const clone = node.clone();
          clone.selector = clone.selector.replace(/::slotted\((.*?)\)/gi, '$1');
          lightDOMRules.push(clone);
        }
      });
      css.nodes.push(...lightDOMRules);
    })
    .process(css).css;
}

function duplicateRootRulesToHost(from) {
  /* 
    :root -> :host
    uni- -> lumo  
  */
  // process css
  return postcss()
    .use(function(css) {
      css.nodes.forEach(node => {
        if (node.selector === ':root') {
          /* :root -> :host */
          const copy = node.cloneAfter();
          copy.selector = ':host';
        }
      });
    })
    .process(from).css;
}

function createCSSPropsList(css) {
  const props = [];
  postcss()
    .use(function(css) {
      css.nodes.forEach(rule => {
        if (rule.selector === ':root') {
          const lumoNodes = [];
          rule.nodes.forEach(node => {
            if (
              node.prop &&
              node.prop.includes('--') &&
              !node.prop.includes('lumo')
            ) {
              props.push({ name: node.prop.replace('-default', ''), value: node.value });
            }
          });
        }
      });
    })
    .process(css).css;
  return props;
}

try {
  if (fs.existsSync('./dist/uniform-bundle.js')) {
    fs.unlinkSync('./dist/uniform-bundle.js');
  }
  if (fs.existsSync('./dist/commando-bundle.js')) {
    fs.unlinkSync('./dist/commando-bundle.js');
  }
  if (fs.existsSync('./dist/underwear-bundle.js')) {
    fs.unlinkSync('./dist/underwear-bundle.js');
  }
  if (fs.existsSync('./dist/bundle.js')) {
    fs.unlinkSync('./dist/bundle.js');
  }
  

  [
    './uniform.css',
    './dist/uniform.css',
    './dist/uniform.unminified.css',
    './dist/underwear.css',
    './dist/underwear.unminified.css'
  ].forEach(file => {
    const content = fs.readFileSync(file, { encoding: 'utf8' });
    const processedContent = duplicateRootRulesToHost(content);
    const lightDOMSupportingContent = convertSlottedToNormal(processedContent);
    const withoutTransparentLinks = removeTransparentLinks(lightDOMSupportingContent);
    fs.writeFileSync(file, withoutTransparentLinks, { encoding: 'utf8' });
  });

  ['./dist/uniform.css', './dist/underwear.css'].forEach(file => {
    const content = fs.readFileSync(file, { encoding: 'utf8' });
    const props = createCSSPropsList(content);
    fs.writeFileSync(
      `./assets/${path.basename(file)}.props.json`,
      JSON.stringify(props),
      { encoding: 'utf8' }
    );
  });

} catch (e) {
  console.log('After build script failed:', e);
}