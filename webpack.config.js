var path = require('path')

// 使用 html-webpack-plugin 插件需要配置
var htmlWebpackPlugin = require('html-webpack-plugin')

// vue-loader 15.x之后版本的vue-loader还需要配置插件
//var VueLoaderPlugin = require('vue-loader/lib/plugin') 

module.exports = {
    // 入口
    entry : path.join(__dirname,'./src/main.js'),

    // 出口
    output : {
        path : path.join(__dirname,'./dist'),
        filename : 'bundle.js'
    },

    // 配置所有插件的节点 plugins
    plugins: [
        // 配置 html-webpack-plugin 插件
        new htmlWebpackPlugin({
            template : path.resolve(__dirname,'src/index.html'), // 配置模板路径
            filename : 'index.html' // 自动生成的 HTML 文件的名称
        }),
        // vue-loader 15.x之后版本的vue-loader还需要配置插件
        //new VueLoaderPlugin() 
    ],

    // 配置所有第三方 loader 模块的节点 module
    module : {
        // 模块匹配规则
        rules : [
            { test : /\.css$/ , use : ['style-loader' , 'css-loader'] }, // 处理 css 文件的 loader
            { test : /\.less$/ , use : ['style-loader' , 'css-loader', 'less-loader'] }, // 处理 less 文件的 loader
            { test : /\.scss$/ , use : ['style-loader' , 'css-loader', 'sass-loader'] }, // 处理 scss 文件的 loader
            { test : /\.(jpg|png|gif|bmp|jpeg)$/ , use : 'url-loader' }, // 处理图片路径的 loader ， 可以通过 url-loader?limit=7631&name=[hash:8]-[name].[ext] 的方式传值
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader

            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 处理完整 ES6 语法的 loader
            // exclude的意思是，除了node_modules下的js文件，其他js都使用babel-loader解析，
            // 原因是，node_modules下js文件太多，都打包耗费性能，并且没必要打包，打包之后最终生成的代码会出错

            {test: /\.vue$/, use: 'vue-loader'} // 处理 .vue 的loader
        ]
    },

    resolve:{
        // alias:{ // 修改 Vue 被导入时候的包的路径
        //     "vue$":"vue/dist/vue.js"
        // }
    }
}