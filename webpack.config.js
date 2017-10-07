 var path = require("path")
 var webpack = require("webpack")
 var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';
var getHtmlConfig = function(name,title){
return {
template:'./src/view/'+name+'.html',
	filename:'view/'+name+'.html',
  title:title,
	inject:true,
	hash:true,
	chunks:['common',name]
};
};
var config={
entry:{
	'common':['./src/page/common/index.js'],
  'index':['./src/page/index/index.js']
},
output:{
	path: path.resolve(__dirname, 'dist'),
	publicPath:"../",
	filename:'js/[name].js'
},
externals:{
	'jquery':'window.jQuery'
},
module: {
    rules: [
    {
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        },
     {
      test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
      loader: 'url-loader?limit=100&name=resource/[name].[ext]',
       options:{
       publicPath:'/'
                }
       },
     { test: /\.string$/, loader: 'html-loader'}
    ]
  },
  resolve:{
  	alias:{
  		      node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
  	}
  },
plugins:[
	new webpack.optimize.CommonsChunkPlugin({
		name:'common',
		filename: 'js/base.js'
	}),
	new ExtractTextPlugin("css/[name].css"),
	new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
	/*new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
  new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
  new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
  new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
  new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人中心')),*/

]	
};
if('dev' === WEBPACK_ENV){
   config.entry.common.push('webpack-dev-server/client?http://localhost:8087/');
}

module.exports=config;
