const find = require('find');
const path = require('path');
const fs = require('fs');
const prettyBytes = require('pretty-bytes');
const { hashElement } = require('folder-hash');

const BLACK_LISTED = [
  'node_modules',
  'polymer-source',
  'test',
  'tests',
  'gruntfile.js',
  'index.html',
  'demo',
  'demos',
  'bower_components',
  'app-shell',
  'test_coverage'
];
function log(msg) {
  console.log('create-service-worker: ' + msg);
}
const hashOptions = {
  folders: { exclude: BLACK_LISTED },
  files: { include: ['*.js', '*.html', '*.css'] }
};

function fileFilter(file) {
  const pathComponents = file.split(path.sep);
  if (
    pathComponents.some(component =>
      BLACK_LISTED.includes(component.toLowerCase())
    )
  ) {
    return false;
  }
  return true;
}

function groomFile(file) {
  file = path.relative(path.resolve(__dirname, 'wwwroot'), file);
  file = file.replace(/\\/g, '/');
  return file;
}

function calcTotalSize(files) {
  return files.reduce((acc, file) => acc + fs.statSync(file).size, 0);
}

async function createServiceWorker(filesJsonArray) {
  const template = fs
    .readFileSync(path.resolve(__dirname, 'service-worker.tmpl.js'))
    .toString();
  const hash = (await hashElement('.', hashOptions)).hash;
  const serviceWorkerCode = template
    .replace('REPLACE_ME_WITH_WITH_PRE_CACHED_FILES_HASH', `'${hash}'`)
    .replace('REPLACE_ME_WITH_WITH_PRE_CACHE_URLS', filesJsonArray);
  fs.writeFileSync(
    path.resolve(__dirname, 'wwwroot', 'service-worker.js'),
    serviceWorkerCode
  );
  return {hash, path: path.resolve(__dirname, 'wwwroot', 'service-worker.js')};
}

log('Look for JS, HTML and CSS files...');

find.file(
  /\.js$|\.html$|\.css$/,
  path.resolve(__dirname, 'wwwroot', 'sys'),
  function(files) {
    log(`Found a total of ${files.length} file, pruning black-listed files`);
    files = files.filter(fileFilter);
    log(`File count after pruning is ${files.length}`);
    const totalSize = calcTotalSize(files);
    log(`Total size of all files ${prettyBytes(totalSize)}`);
    files = files.map(groomFile);
    const array = JSON.stringify(files);
    log(`Hydrating service worker template...`);
    createServiceWorker(array).then(result => {
      log('Service worker created! Cache hash is: ' + result.hash);
      log('Service worker saved at: ' + result.path);
      log('Done');
    });
  }
);
