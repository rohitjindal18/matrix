const path = require('path');
const webpack = require('webpack');
const config = {
    entry: {
        index: './index.js'
    },
    output: {
        path: __dirname + "/dist",
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
        ]
    }
}

module.exports = config;