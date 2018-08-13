const webpack = require('webpack');
const path = require('path');
const isProd = process.env.NODE_ENV === 'production'
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

let plugins = [
  new webpack.DefinePlugin({
    API_URL: isProd
      ? "'https://mgrinko.github.io/js-20180614/api/'"
      : "'http://localhost:3000/api/'",
  })
]

if (isProd) {
  plugins.push(
    new UglifyJsPlugin({
      sourceMap: isProd ? false : true,
    })
  )
}

module.exports = {
  mode: 'none',

  entry: './scripts/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'build.js'
  },

  devtool: isProd ? false : 'source-map',

  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
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

  plugins: plugins,

  devServer: {
    contentBase: './public'
  }
};


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

