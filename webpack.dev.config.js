const path = require('path')
const HtmlWebpckPlugin = require('html-webpack-plugin')
const UglifyJSPlug = require('uglifyjs-webpack-plugin') // 压缩JS

module.exports = {
    entry:path.join(__dirname,'./src/index.js'), //入口，表示要使用webpack打包哪个文件
    output:{
        path:path.join(__dirname,'./dist'),//指定打包好的文件，输出到哪个目录中去
        filename:'bundle.js' //这是指定 输出的文件的名称
    },
    // 插件 强调事件监听的能力 
    plugins: [
        new HtmlWebpckPlugin({
            template:'./public/index.html'
        }),
        new UglifyJSPlug()
    ],
    devServer:{
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