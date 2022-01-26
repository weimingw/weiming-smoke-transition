const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const { DefinePlugin } = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'], // with these presets (also optional)
                            plugins: ['@vue/babel-plugin-jsx'],
                        },
                    },
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'vue-style-loader',
                    'css-loader', // translates CSS into CommonJS
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                        },
                    }, // compiles Sass to CSS, using Node Sass by default
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg|mp3|ttf|woff2?|mp4)$/i,
                loader: 'file-loader',
                options: {
                    name: 'assets/files/[name].[ext]',
                },
            },            
            {
                test: /\.(frag|vert|glsl)$/,
                exclude: /node_modules/,
                use: ['raw-loader', 'glslify-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.mjs', '.js', '.json'],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new DefinePlugin({
            __VUE_PROD_DEVTOOLS__: true,
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        hot: true,
    },
};
