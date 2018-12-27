//const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require("webpack");

//const dirNode = path.join(__dirname, "./node_modules");
//const dirApp = path.join(__dirname, "./src");
//const dirAssets = path.join(__dirname, "./assets");

// Phaser webpack config
//const phaserModule = path.join(__dirname, "/node_modules/phaser/");
//const phaser = path.join(phaserModule, "src/phaser.js");

module.exports = {
  entry: {
    main: ["./src/main.ts"]
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist",
    publicPath: ""
  },
  module: {
    rules: [
      // TYPESCRIPT
      {
        test: /\.ts?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        },
        exclude: /node_modules/
      },
      // IMAGES
      /*{
        test: /\.(jpe?g|png|gif)$/,
        loader: "file-loader",
        include: dirAssets,
        exclude: dirNode,
        options: {
          name: "[path][name].[ext]"
        }
      },*/
      // RAW
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    }),
    new CopyWebpackPlugin([
      {from:'src/assets',to:'assets'} 
    ]),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  optimization: {
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
    /*,
    alias: {
      phaser: phaser
    }*/
  }
};
