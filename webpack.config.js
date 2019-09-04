const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');
const webpack = require("webpack");

const dist = "docs";

module.exports = {
  entry: {
    main: ["./src/js/app.ts"]
  },
  output: {
    filename: "[name].[hash].js",
    path: __dirname + "/" + dist,
    publicPath: ""
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([dist]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    }),
    new CopyWebpackPlugin([
      {
        from:'src/img',
        to:'img'
      } 
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new WorkboxPlugin.GenerateSW({     
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  devServer: {
    contentBase: "./" + dist,
    compress: true,
    hot: true
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
};
