const fs = require('fs');
const { spawn, spawnSync } = require('child_process');
const path = require('path');

// restore original files if they exist
if (
  fs.existsSync('src\\StarcounterClientFiles\\wwwroot\\sys\\polymer-source')
) {
  fs.renameSync(
    'src\\StarcounterClientFiles\\wwwroot\\sys\\polymer-source',
    'src\\StarcounterClientFiles\\wwwroot\\sys\\polymer'
  );
} else {
  // back up original if not
  const copy = spawnSync('xcopy', ['/I', '/E',
    'src\\StarcounterClientFiles\\wwwroot\\sys\\polymer',
    'src\\StarcounterClientFiles\\wwwroot\\sys\\polymer-source'
  ]);
  const out = (copy.stdout || copy.stderr).toString();
}

// vulcanize polymer
const vulcanizePolymer = spawn('cmd.exe', [
  '/c',
  'vulcanize --inline-scripts --out-request-list urls.txt --inline-css --strip-comments --polymer2 src\\StarcounterClientFiles\\wwwroot\\sys\\polymer\\polymer.html > src\\StarcounterClientFiles\\wwwroot\\sys\\polymer\\polymer.min.html'
]);

vulcanizePolymer.on('exit', doneCallback('polymer'));

function doneCallback(name) {
  return function(exitCode) {
    if (exitCode === 0) {
      fs.renameSync(
        'src\\StarcounterClientFiles\\wwwroot\\sys\\polymer\\polymer.min.html',
        'src\\StarcounterClientFiles\\wwwroot\\sys\\polymer\\polymer.html'
      );

      // replace every vulcanized file to an import of `polymer.html`
      const fileListRaw = fs
        .readFileSync('urls.txt')
        .toString()
        .trim();

      let fileList = fileListRaw
        .split('\n')
        .map(filePath => path.normalize(filePath));

      // execlude JS files
      fileList = fileList.filter(name => name.endsWith('.html'));

      const polymerPath = fileList[0];

      // remove `polymer.html` from bundled files and add polymer-element.html instead
      fileList[0] = fileList[0].replace('polymer.html', 'polymer-element.html');

      fileList.forEach(filePath => {
        const fileDir = path.dirname(filePath); // path.relative expects `from` to be a directory

        const pathRelative = path
          .relative(fileDir, polymerPath)
          .replace(/\\/g, '/'); // windows paths to urls;

        fs.writeFileSync(
          filePath,
          `<import rel="import" href="${pathRelative}">`
        );
      });

      console.log(`Vulcanizing ${name} complete.`);
    } else {
      console.log(
        `Vulcanizing ${name} did not succeed and exited with code:`,
        exitCode
      );
    }
  };
}
