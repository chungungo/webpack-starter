
const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports = {

    mode: 'production', //tipo de modo de desarrollo actual.

    output: {
        clean: true, //borrar el contenido de la carpeta dist.
        filename: 'styles.[contenthash].js',
    },
   
    module: { //configuración del webpack.
        rules: [
            { //reglas que debe hacer el webpack.
                test: /\.html$/, //buscar un archivo html y le indica que haga lo que sigue.
                loader: 'html-loader', //que cargue eso.
                options: {
                    sources: false, //manua, false.
                }
            },
            {
                test: /\.css$/,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
            },

        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser(),
        ]
    },
    
    plugins: [
        new HtmlWebPack({
            title: 'Mi webpack app', //colocar el título en la página
            //filename: 'index2.html', //cambiar el nombre del index.
            template: './src/index.html',
        }),

        new MiniCssExtract({
            filename: '[styles].[fullhash].css',
            ignoreOrder: false,
        }),

        new CopyPlugin({
            patterns:[
                {
                    from: 'src/assets/', to: 'assets/',
                }
            ]
        }),
    ]

}