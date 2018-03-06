require("normalize.css");
require("./src/font-import.css");
//require("sakura.css");
require("./src/underwear.css");
//require("./src/uniform.css");

// require it so webpack watches it, it has no effect
const html = require('raw-loader!./src/index.html');