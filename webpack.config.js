const path = require('path')
const webpack = require('webpack')
module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
        `${__dirname}/app/main.js`
	],
    output: {
        filename: '[name].bundle.js',
        path: `${__dirname}/build`,
		publicPath: '/build/'
    },
	plugins: [
		new webpack.HotModuleReplacementPlugin(), // 启用 HMR
		new webpack.NamedModulesPlugin(),
		// prints more readable module names in the browser console on HMR updates
	],
	resolve: {
		// 定义了解析模块路径时的配置，常用的就是extensions，可以用来指定模块的后缀，这样在引入模块时就不需要写后缀了，会自动补全
		extensions: ['.js', '.jsx']
	},
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["env", "react","babel-preset-env","stage-2"],
						plugins:  [
							["import", [{"libraryName": "antd", "style": true}]],
							["transform-class-properties", { "spec": true }]
						]
                    }
                }
            },
			{
				test: /\.css$/,   //加载css
				use: ['style-loader','css-loader'],
				//内联打包css
				/* use: ExtractTextPlugin.extract({     //独立打包css
					 fallback:"style-loader",
					 use:"css-loader"
				 }),*/

			},
			{                  //加载jsx
				test:/\.jsx$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{                       //css和less不能使用exclude --node_module 否则加载会出错
				test:/\.less$/,
				use: [
					{loader:"style-loader"},
					{loader:"css-loader"},
					{
						loader: "less-loader",
					/*	options: {
							modifyVars: themeVariables    //加载自定义主题
						}*/
					}
				]
			},{
        		test:/\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {}
					}
				]
			}

        ]
    },
	devServer: {
		hot: true,
		host: 'localhost',
		port: 3000,
		contentBase: path.resolve(__dirname, 'build')
	}
}