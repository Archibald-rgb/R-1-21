const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src', 'index.jsx')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: path.join('js', 'bundle.js')
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.jsx?$/,
                enforce: "pre",
                use: [
                    {
                        loader: "source-map-loader",
                        options: {
                            filterSourceMappingUrl: (url, resourcePath) => {
                                if (/broker-source-map-url\.js$/i.test(url)) {
                                    return false;
                                }

                                if (/keep-source-mapping-url\.js$/i.test(resourcePath)) {
                                    return "skip";
                                }

                                return true;
                            },
                        },
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.jsx?$/i,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    plugins: [
                        [
                            "@babel/plugin-proposal-class-properties",
                            { "loose": true }
                        ]
                    ]
                }
            }
        ]
    },
    resolve: {
        alias: {
            '@styles': path.resolve(__dirname, 'src', 'styles'),
            '@components': path.resolve(__dirname, 'src', 'components'),
            '@containers': path.resolve(__dirname, 'src', 'components', 'containers'),
            '@pages': path.resolve(__dirname, 'src', 'pages'),
            '@core': path.resolve(__dirname, 'src', 'Core'),
            '@actions': path.resolve(__dirname, 'src', 'Core', 'Store', 'Actions'),
            '@img': path.resolve(__dirname, 'src', 'resources', 'img'),
            '@func': path.resolve(__dirname, 'src', 'resources', 'functions'),
            '@lib': path.resolve(__dirname, 'src', 'resources', 'libraries'),
            '@midlewares': path.resolve(__dirname, 'src', 'Core', 'Midleware'),
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: path.join('style', '[name].css'),
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ],
    devServer: {
        port: 3300,
        hot: true,
        open: false,
        historyApiFallback: {
            index: 'index.html'
        }
    },
};