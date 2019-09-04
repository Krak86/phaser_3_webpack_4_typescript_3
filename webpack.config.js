const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');
const webpack = require("webpack");

module.exports = {
  entry: {
    main: ["./src/main.ts"]
  },
  output: {
    filename: "[name].[hash].js",
    path: __dirname + "/docs",
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
    new CleanWebpackPlugin(["docs"]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    }),
    new CopyWebpackPlugin([
      {
        from:'src/assets',
        to:'assets'
      } 
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new WorkboxPlugin.GenerateSW({     
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  devServer: {
    contentBase: "./docs",
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
