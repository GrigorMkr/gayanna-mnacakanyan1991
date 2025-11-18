const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/main/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
      clean: true,
      assetModuleFilename: 'assets/[name][ext]',
      publicPath: process.env.GITHUB_PAGES ? '/gayanna-mnacakanyan1991/' : '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name][ext]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]'
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: 'body',
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true
        } : false
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'images'),
            to: path.resolve(__dirname, 'dist/images'),
            noErrorOnMissing: true
          },
          {
            from: path.resolve(__dirname, 'favicon.svg'),
            to: path.resolve(__dirname, 'dist/favicon.svg'),
            noErrorOnMissing: true
          },
          {
            from: path.resolve(__dirname, 'favicon.ico'),
            to: path.resolve(__dirname, 'dist/favicon.ico'),
            noErrorOnMissing: true
          }
        ]
      }),
      ...(isProduction ? [
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash].css'
        })
      ] : [])
    ],
    devServer: {
      static: [
        {
          directory: path.join(__dirname, 'dist'),
          watch: true
        },
        {
          directory: path.join(__dirname, 'images'),
          publicPath: '/images',
          watch: true
        },
        {
          directory: path.join(__dirname),
          publicPath: '/',
          watch: false,
          staticOptions: {
            index: false
          }
        }
      ],
      compress: true,
      port: 8080,
      hot: true,
      open: ['http://localhost:8080'],
      historyApiFallback: true,
      client: {
        overlay: {
          errors: true,
          warnings: false
        }
      }
    },
    resolve: {
      extensions: ['.js', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@presenters': path.resolve(__dirname, 'src/presenters'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@main': path.resolve(__dirname, 'src/main')
      }
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10
          }
        }
      }
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map'
  };
};

