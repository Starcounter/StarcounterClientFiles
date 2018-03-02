const fs = require('fs');
const path = require('path');
const { Bundler } = require('polymer-bundler');
const bundler = new Bundler();
const parse5 = require('parse5');

const sourceFile = 'wwwroot/sys/polymer-source/polymer.html';
const destFile = 'wwwroot/sys/polymer/polymer.html';

bundler.generateManifest([sourceFile]).then(async manifest => {
  try {
    const result = await bundler.bundle(manifest);
    const doc = result.documents.get(sourceFile);
    const html = parse5.serialize(doc.ast);

    fs.writeFileSync(destFile, html);

    const fileList = doc.files;

    const polymerPath = fileList[0].replace('polymer-source', 'polymer');

    // remove `polymer.html` from bundled files and add polymer-element.html instead
    fileList[0] = fileList[0].replace('polymer.html', 'polymer-element.html');

    for (let filePath of fileList) {
      //some files are to shadycss; skip them
      if (filePath.includes('polymer-source')) {
        filePath = filePath.replace('polymer-source', 'polymer');

        const fileDir = path.dirname(filePath); // path.relative expects `from` to be a directory

        const pathRelative = path
          .relative(fileDir, polymerPath)
          .replace(/\\/g, '/'); // Windows paths to urls;

        fs.writeFileSync(
          filePath,
          `<link rel="import" href="${pathRelative}">`
        );
      }
    }
    console.log('Vulcanizing Polymer is now complete.');
  } catch (error) {
    console.error('Vulcanizing Polymer has failed, error:', error);
    process.exit(1);
  }
});
