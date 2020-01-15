const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // 用于解析entry和module.rules.loader选项
    context: path.resolve(__dirname, '../src'),
    // 入口配置
    entry: './main.js',
    // 输入配置
    output: {
        path: path.resolve(__dirname, '../dist'),
        // 文件名前面挂上hash
        filename: '[chunkhash].bundle.js'
    },
    devServer: {
        // 给server提供内容的目录
        contentBase: path.resolve(__dirname, '../dist'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 9000
    },
    resolve: {
        extensions: ['.js', '.vue', '*'],
        alias: {
            '@': path.resolve(__dirname, '../src'),
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    // loaders
    module: {
        rules: [
            {
                test: /\.js$/,
                // 结合context选项
                include: '/',
                loader: 'babel-loader'
            },
            // 处理.vue文件
            {
                test: /\.vue$/,
                include: '/',
                loader: 'vue-loader'
            },
            // 处理css文件
            {
                test: /\.css$/,
                include: '/',
                use: [
                    'style-loader', 
                    {
                        loader: 'css-loader',
                        options: { 
                            importLoaders: 1 
                        }
                    }, 
                    'postcss-loader'
                ]
            },
            // 处理less
            {
                test: /\.less$/,
                include: '/',
                use: [
                    'style-loader', 
                    {
                        loader: 'css-loader',
                        options: { 
                            importLoaders: 1 
                        }
                    }, 
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    },
    // plugins
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            // 页面title
            title: 'learning webpack',
            // 指定模版
            template: 'index.html'
        }),
        // 配合vue-loader使用
        new VueLoaderPlugin(),
        // 抽离css
        // new ExtractTextPlugin('[md5:contenthash:hex:20].style.css'),
    ],
    mode: 'development'
};

