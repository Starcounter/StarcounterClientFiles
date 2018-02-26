const fs = require('fs');
const { spawn } = require('child_process');

// restore original files if they exist
if (
  fs.existsSync(
    'src\\StarcounterClientFiles\\wwwroot\\sys\\polymer\\polymer.max.html'
  )
) {
  fs.renameSync(
    'src\\StarcounterClientFiles\\wwwroot\\sys\\polymer\\polymer.max.html',
    'src\\StarcounterClientFiles\\wwwroot\\sys\\polymer\\polymer.html'
  );
}

if (
  fs.existsSync(
    'src\\StarcounterClientFiles\\wwwroot\\sys\\polymer\\polymer-element.max.html'
  )
) {
  fs.renameSync(
    'src\\StarcounterClientFiles\\wwwroot\\sys\\polymer\\polymer-element.max.html',
    'src\\StarcounterClientFiles\\wwwroot\\sys\\polymer\\polymer-element.html'
  );
}

// vulcanize files 
const vulcanizePolymer = spawn('cmd.exe', [
  '/c',
  'vulcanize --inline-scripts --inline-css --strip-comments --polymer2 src\\StarcounterClientFiles\\wwwroot\\sys\\polymer\\polymer.html > src\\StarcounterClientFiles\\wwwroot\\sys\\polymer\\polymer.min.html'
]);

const vulcanizePolymerElement = spawn('cmd.exe', [
  '/c',
  'vulcanize --inline-scripts --inline-css --strip-comments --polymer2 src\\StarcounterClientFiles\\wwwroot\\sys\\polymer\\polymer-element.html > src\\StarcounterClientFiles\\wwwroot\\sys\\polymer\\polymer-element.min.html'
]);

vulcanizePolymer.on('exit', doneCallback('polymer'));
vulcanizePolymerElement.on('exit', doneCallback('polymer-element'));

function doneCallback(name) {
  return function(exitCode) {
    if (exitCode === 0) {
      console.log(`Vulcanizing ${name} complete.`);
      
      // backup original
      fs.renameSync(
        `src\\StarcounterClientFiles\\wwwroot\\sys\\polymer\\${name}.html`,
        `src\\StarcounterClientFiles\\wwwroot\\sys\\polymer\\${name}.max.html`
      );

      // rename the bundle into the original name
      fs.renameSync(
        `src\\StarcounterClientFiles\\wwwroot\\sys\\polymer\\${name}.min.html`,
        `src\\StarcounterClientFiles\\wwwroot\\sys\\polymer\\${name}.html`
      );      
      
    } else {
      console.log(
        `Vulcanizing ${name} did not succeed and exited with code:`,
        exitCode
      );
    }
  };
}


