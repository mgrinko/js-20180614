const webpack = require('webpack');
const path = require('path');
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: 'none',

  entry: './scripts/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'build.js'
  },

  devtool: isProd ? false : 'source-map',
  watch: true,

  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          }
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      API_URL: isProd
        ? "'https://mgrinko.github.io/js-20180614/api/'"
        : "'/api/'",
    }),
  ]
};

// const API_URL = 'https://mgrinko.github.io/js-20180614/api/'
// const API_URL = '/api/'


// const path = require('path');
// const webpack = require('webpack');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
//
// const development = process.env.NODE_ENV === 'development';
//
// module.exports = {
//   mode: 'none',
//   entry: {
//     build: './scripts/app.js',
//   },
//   output: {
//     path: path.resolve(__dirname, 'public'),
//     filename: '[name].js'
//   },
//   devtool: development ? 'source-map' : false,
//
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env'],
//             plugins: ['@babel/plugin-transform-runtime'],
//           }
//         }
//       },
//       {
//         test: /\.hbs/,
//         loader: "handlebars-loader"
//       },
//       {
//         test: /\.css$/,
//         use: [ 'style-loader', 'css-loader' ]
//       }
//     ]
//   },
//
//   plugins: [
//     new UglifyJsPlugin({
//       sourceMap: development ? true : false,
//     }),
//     new webpack.DefinePlugin({
//       BASE_URL: development
//         ? "'https://mgrinko.github.io/js-20180510/api/'"
//         : "'https://mgrinko.github.io/js-20180510/api/'",
//     }),
//   ],
//
//   devServer: {
//     contentBase: './public'
//   },
// };

