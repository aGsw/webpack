const path = require('path')
const HtmlWebpckPlugin = require('html-webpack-plugin')
const UglifyJSPlug = require('uglifyjs-webpack-plugin') // 压缩JS ES5
const TerserPlugin = require('terser-webpack-plugin')   // 压缩ES6
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin  // 分析器


// 多线程打包方案
// HappyPack
// thread-loader 
module.exports = {
    entry:path.join(__dirname,'./src/index.js'), //入口，表示要使用webpack打包哪个文件
    output:{
        path:path.join(__dirname,'./dist'),//指定打包好的文件，输出到哪个目录中去
        filename:'bundle.js' //这是指定 输出的文件的名称
    },
    // 不解析那个文件
    // noParse://,
    // 压缩
    optimization:{
       minimizer:[new TerserPlugin({
           cache:true,  //加快构建速度
           parallel:true,// 开启多线程
           terserOptions:{
               compress:{
                   unused:true,
                   drop_debugger:true,
                   drop_console:true,
                   dead_code:true 
               }
           }
       })]     
    },
    // 指定后缀  引入app.js  引入app 省略后缀名
    resolve:{

    },
    // 插件 强调事件监听的能力 
    plugins: [ 
        new HtmlWebpckPlugin({
            template:'./public/index.html',
            filename:'index.html'  // 输出的文件名 
        }),
        new UglifyJSPlug(),
        new BundleAnalyzerPlugin()
    ],
    devServer:{
        // 热更新HRM
        contentBase: './dist', //根目录
        open:true,//自动打开浏览器
        port:9007
    },
     // loader  翻译功能
     module:{
        rules:[
            //  解析CSS的loader
            {
                test:/\.css$/,
                use: ["style-loader", "css-loader"],
            }
        ]
    },
}