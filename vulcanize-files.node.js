const fs = require('fs');
const { spawn } = require('child_process');
const vulcanizer = spawn(
  'cmd.exe',
  [
    '/c',
    'vulcanize --inline-scripts --inline-css --strip-comments --polymer2 --out-request-list urls.txt src\\StarcounterClientFiles\\wwwroot\\sys\\starcounter.max.html > src\\StarcounterClientFiles\\wwwroot\\sys\\starcounter.min.html'
  ]);

const distServiceWorkerWarning = `/** Please do not modify this file, instead modify service-worker.src.js in the root of this project */\n\n`;

vulcanizer.on('exit', code => {
  if (code === 0) {
    console.log('Vulcanizing complete. Now processing URL list..');

    const filePathsRaw = fs
      .readFileSync('urls.txt')
      .toString()
      .trim();
    const filePaths = filePathsRaw.split('\n');

    // vulcanize outputs absolute paths, we need to remove the first part eg C:\Files\StarcounterClientFiles...
    const folderPathLength = filePaths[0].indexOf('wwwroot') + 8;

    const urls = filePaths.map(path => path.substr(folderPathLength));
    const serviceWorkerSourece = fs
      .readFileSync('service-worker.src.js')
      .toString();

    const injectedServiceWorker =
      distServiceWorkerWarning +
      serviceWorkerSourece.replace(
        'TO_BE_AUTOMATICALLY_REPLACED_WITH_URLS_ARRAY',
        JSON.stringify(urls)
      );

    fs.writeFileSync(
      'src\\StarcounterClientFiles\\wwwroot\\service-worker.js',
      injectedServiceWorker
    );

    fs.unlinkSync('urls.txt');

    console.log('All done.')
  } else {
    console.log('Vulcanizing did not succeed and exited with code:', code);
  }
});
