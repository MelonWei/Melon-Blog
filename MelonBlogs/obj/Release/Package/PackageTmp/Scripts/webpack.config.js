'use strict';
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var babelrc = {
    "presets": ["react", "es2015", "stage-0"],
    "plugins": []
};
//var HtmlPlugin = require('webpack-html-plugin');
//console.log(JSON.parse(fs.readFileSync('./.babelrc')));


module.exports = {
    entry: {
        main: [path.resolve(__dirname, '..', 'Scripts', 'myJs', 'main.js')],
        mobile: [path.resolve(__dirname, '..', 'Scripts', 'myJs', 'mobile_app.js')],
        m_login: [path.resolve(__dirname, '..', 'Scripts', 'myJs', 'm_login.js')]
    },
    plugins: [
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery"
        })
    ],
    module: {
        loaders: [
            { test: /\.json$/, loader: 'json', },
            { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader?' + JSON.stringify(babelrc)] },
            { test: /\.(jpeg|jpeg|gif|png|tiff)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' },
            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            {
                test: /\.(eot|ttf|svg)$/,
                loader: "file-loader"
            }, {
                test: /\.less$/,
                loaders: ['style', 'css', 'less']
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader?modules", "sass-loader"]
            }
        ]
    },
    output: {
        libraryTarget: 'this',
        path: path.resolve(__dirname, '..', 'Scripts', 'pack'),
        filename: '[name].bundle.js',
        publicPath: '/pack/'
    }
};