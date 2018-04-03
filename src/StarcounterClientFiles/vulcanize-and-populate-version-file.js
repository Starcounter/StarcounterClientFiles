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

    const dirname = path.dirname(destFile);
    if (!fs.existsSync(dirname)){
        ensurePath(dirname);
    }

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

        if (!fs.existsSync(fileDir)){
            ensurePath(fileDir);
        }

        fs.writeFileSync(
          filePath,
          `<link rel="import" href="${pathRelative}">`
        );
      }
    }
    console.log('Vulcanizing: Vulcanizing Polymer is now complete.');

    populateVersionFile();

  } catch (error) {
    console.error('Vulcanizing: Vulcanizing Polymer has failed, error:', error);
    process.exit(1);
  }
});

function ensurePath(location) {
    let normalizedPath = path.normalize(location);
    let parsedPathObj = path.parse(normalizedPath);
    let curDir = parsedPathObj.root;
    let folders = parsedPathObj.dir.split(path.sep);
    folders.push(parsedPathObj.base);
    for(let part of folders) {
        curDir = path.join(curDir, part);
        if (!fs.existsSync(curDir)) {
            fs.mkdirSync(curDir);
        }
    }
}

function populateVersionFile() {
  console.log('Populating version.txt file');
  const AssemblyInfo = fs.readFileSync("Properties\\AssemblyInfo.cs").toString();
  const version = AssemblyInfo.match(/^\[assembly: AssemblyVersion\(\"(.+)\"\)\]/m)[1];
  fs.writeFileSync("version.txt", version);
}