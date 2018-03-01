const fse = require('fs-extra');
const path = require('path');
const { Bundler } = require('polymer-bundler');
const bundler = new Bundler();
const parse5 = require('parse5');

const sourceFile = 'wwwroot/sys/polymer-source/polymer.html';
const destFile = 'wwwroot/sys/polymer/polymer.html';

bundler.generateManifest([sourceFile]).then((manifest) => {
    bundler.bundle(manifest).then((result) => {
        var doc = result.documents.get(sourceFile);
        var html = parse5.serialize(doc.ast)
        fse.outputFileSync(destFile, html);

        const fileList = Array.from(manifest._bundleUrlForFile.keys());

        const polymerPath = fileList[0].replace('polymer-source', 'polymer');

        // remove `polymer.html` from bundled files and add polymer-element.html instead
        fileList[0] = fileList[0].replace('polymer.html', 'polymer-element.html');

        fileList.forEach(filePath => {
            if (filePath.indexOf('polymer-source') === -1) {
                return; //some files are to shadycss; skip them
            }
            filePath = filePath.replace('polymer-source', 'polymer');

            const fileDir = path.dirname(filePath); // path.relative expects `from` to be a directory

            const pathRelative = path
                .relative(fileDir, polymerPath)
                .replace(/\\/g, '/'); // windows paths to urls;

            fse.outputFileSync(filePath, `<link rel="import" href="${pathRelative}">`);
        });
    });
});