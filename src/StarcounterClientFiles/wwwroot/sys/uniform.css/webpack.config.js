const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

function generateConfig(fileName) {
  const plugins = [new ExtractTextPlugin(`${fileName}.unminified.css`)];

  const pluginsWithMinification = [
    new ExtractTextPlugin(`${fileName}.css`),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: { removeAll: false },
        mergeRules: false
      },
      canPrint: true
    })
  ];

  const config = {
    entry: path.resolve('./src', `${fileName}.js`),
    output: {
      filename: `${fileName}-bundle.js`,
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      loaders: [
        {
          test: /\.txt$/,
          use: 'raw-loader'
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          loader: 'file-loader',
          options: {
            name: './fonts/[name].[ext]'
          }
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        }
      ]
    }
  };

  const configUnminified = { ...config, plugins };
  const configMinified = { ...config, plugins: pluginsWithMinification };

  return [configUnminified, configMinified];
}

const configs = ['underwear', 'commando', 'uniform'].reduce((acc, name) => {
  acc.push(...generateConfig(name));
  return acc;
}, []);

// this will generate two configurations for root-dir-uniform.css (unminified and minified)
const rootDirUniformCSSConfig = generateConfig('uniform')[1] // we want only the minified one

// change the path so Webpack resolves the fonts path correctly
rootDirUniformCSSConfig.output.path = path.resolve(__dirname);
rootDirUniformCSSConfig.module.loaders[1].options.name = './dist/fonts/[name].[ext]'

configs.push(rootDirUniformCSSConfig);

module.exports = configs;
