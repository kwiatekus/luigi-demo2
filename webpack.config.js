const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    resolve: {
        modules: ['src', 'node_modules'],
    },
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath : '/'
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new CopyWebpackPlugin(
            [
              {
                context: 'src',
                to: '',
                from: {
                  glob: 'assets/**/*',
                  dot: true
                }
              },
              {
                context: 'src',
                to: '',
                from: {
                  glob: 'index.html',
                  dot: true
                }
              },
              {
                context: 'node_modules/@kyma-project/luigi-core',
                to: './luigi-core',
                from: {
                  glob: '**',
                  dot: true
                }
              },
              {
                context: 'node_modules/fundamental-ui/dist',
                to: './fundamental-ui',
                from: {
                  glob: '**',
                  dot: true
                }
              },
              {
                context: 'node_modules/jquery/dist',
                to: './jquery',
                from: {
                  glob: '**',
                  dot: true
                }
              }
            ])
        
      ]
};