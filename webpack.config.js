const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require("webpack");

const dist = "docs";
const pathToDist = __dirname + "/" + dist;

module.exports = {
  entry: {
    main: ["./src/js/app.ts"]
  },
  output: {
    filename: "[name].[hash].js",
    path: pathToDist,
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
      },
      {
        test: /\.(ttf|eot|woff2?)$/i,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[hash].[ext]'
                }
            },
            {
                loader: 'img-loader',
                options: {
                    plugins: [
                        require('imagemin-gifsicle')({
                            interlaced: true,
                        }),
                        require('imagemin-mozjpeg')({
                            progressive: true,
                            arithmetic: false,
                        }),
                        require('imagemin-optipng')({
                            optimizationLevel: 5,
                        }),
                        require('imagemin-svgo')({
                            plugins: [
                                {convertPathData: false},
                            ]
                        }),
                    ]
                }
            }
        ]
      },
      {
        test: /\.(css)$/,
        use: [
            {
                loader: 'style-loader',
            },        
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 2,
                    sourceMap: true
                }
            },
            {
                loader: 'resolve-url-loader'
            }           
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([dist]),
    new ImageminWebpWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Phaser game",
      filename: "index.html",
      template: "./src/index.html",
      favicon: "./src/img/favicons/favicon.ico",
      meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      xhtml: true
    }),
    new CopyWebpackPlugin([
      {
        from:'src/img',
        to:'img'
      },
      {
        from:'src/manifest.json',
        to:''
      }
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      precacheManifestFilename: "js/precache-manifest.[manifestHash].js",
      exclude: [
          /\.(png|jpe?g|gif|svg|webp)$/i,
          /\.map$/,
          /^manifest.*\\.js(?:on)?$/,
      ],
      offlineGoogleAnalytics: true,
      runtimeCaching: [
          {
              urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
              handler: "CacheFirst",
              options: {
                  cacheName: "images",
                  expiration: {
                      maxEntries: 20
                  }
              }
          }
      ]
    }),
    new WebpackNotifierPlugin({
      title: 'Webpack', 
      excludeWarnings: true, 
      alwaysNotify: true
    }),
    //new BundleAnalyzerPlugin({reportFilename: 'BundleAnalyzerReport.html',})
  ],
  devServer: {
    contentBase: "./" + dist,
    compress: true,
    hot: true,
    public: process.env.DEVSERVER_PUBLIC || "http://localhost:8080",
    contentBase: pathToDist,
    host: process.env.DEVSERVER_HOST || "localhost",
    port: process.env.DEVSERVER_PORT || 8080,
    https: !!parseInt(process.env.DEVSERVER_HTTPS || false),
    disableHostCheck: true,
    overlay: true,
    watchContentBase: true,
    watchOptions: {
      poll: !!parseInt(process.env.DEVSERVER_POLL || false),
      ignored: /node_modules/,
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
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
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          cache: true,
          parallel: true,
          sourceMap: true,
          extractComments: false,
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {},
            mangle: true,
            module: false,
            output: null,
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_classnames: undefined,
            keep_fnames: false,
            safari10: false,
          },
        }
      ),
      new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
              map: {
                  inline: false,
                  annotation: true,
              },
              safe: true,
              discardComments: true
          },
      })
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
};
