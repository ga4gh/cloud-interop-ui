const path = require('path');

module.exports = {
    target: "node",
    entry: {
        'server': './src/server.js',
        'public/js/reactApp': './src/reactApp.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            assets: path.resolve(__dirname, 'src', 'assets')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ],
                    plugins: [
                        [
                            "@babel/transform-runtime"
                            
                        ],

                        [
                            "@babel/plugin-proposal-class-properties"
                        ]

                    ]
                }
            },

            {
                test: /\.css$/i,
                loader: 'css-loader'
            }           
        ]
    }
}