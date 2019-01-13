const path = require('path');
const nodeExternals = require('webpack-node-externals');
const moduleConfig = require('./webpack/module.config');
const plugins = require('./webpack/plugins.config');

module.exports = function(env) {
  const mode = env === 'dev' ? 'development' : 'production';
  return {
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    mode,
    entry: ['./server/index.js'],
    stats: {
      colors: true,
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist/server'),
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            { loader: 'babel-loader' },
            {
              loader: 'eslint-loader',
              options: { emitError: true },
            },
          ],
        },
      ],
    },
    externals: [nodeExternals()],
    // plugins: plugins(...arguments),
  };
};
