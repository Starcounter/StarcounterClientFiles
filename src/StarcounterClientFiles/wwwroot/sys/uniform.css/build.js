/**	
 * This script runs after Webpack finishes bundling	
 */	
 	
const fs = require('fs');	
 	
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

// copy uniform to root, it's the mainly used file
if (fs.existsSync('./dist/uniform.css')) {	
  fs.copyFileSync('./dist/uniform.css', './uniform.css');	
}
