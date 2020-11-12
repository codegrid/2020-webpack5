const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  name: 'my-app',
  // target: ['web', 'es2015'], // デフォルトはbrowserslistがあれば、それが設定が使用される
  entry: {
    index: './src/index.js',
    about: './src/about.js',
  },
  output: {
    filename: '[name].bundle.js',
  },
  // 永続的キャッシュを利用
  cache: {
    // ファイルシステムを指定
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.temp_cache'),
    buildDependencies: {
      // 設定が変更された際にキャッシュが無効になるための指定
      config: [__filename ]
    }
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /(\.js$|\.jsx$)/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[path][name]__[local]--[hash:base64:5]', // https://github.com/rails/webpacker/issues/2197
            }
          }
        }, {
          loader: 'sass-loader'
        }]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    // chunkIds: 'named' // デフォルトは、development時は "named"、production時は "deterministic"
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['index'],
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['about'],
      filename: 'about.html',
      template: 'src/about.html'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  // Top Level Await の設定
  experiments: {
    topLevelAwait: true
  },
  devServer: {
    host: '0.0.0.0'
  }
};
