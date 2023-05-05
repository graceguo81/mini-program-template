const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const babel = require('@babel/core')
module.exports = {
    mode:'development',
    watch:true,
    entry:'./src/app.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "main.js"
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns:[
                {
                    from: '**/*.wxml',
                    to:'./',
                    context:'./src'
                },
                {
                    from: '**/*.json',
                    to: './',
                    context: './src'
                },
                {
                    from: '**/*.wxss',
                    to: './',
                    context: './src'
                },
                {
                    from: '**/*.js',
                    globOptions: {
                        dot: true,
                        gitignore: true,
                        ignore: ["**/*.test.js", "**/*.spec.js"],
                    },
                    to: './',
                    transform: {
                        transformer(content, path) {
                            const newCode = babel.transformSync(content, {
                                babelrc: true,
                                "presets": ["@babel/env"]
                            }).code;
                            return Promise.resolve(newCode.toString());
                        },
                    },
                    context: './src'
                },
                // {
                //     from: '**/*.less',
                //     to: './',
                //     context: './src',
                //     transform: {
                //         transformer(content, path) {
                //             return less.render(content.toString()).then(function (output) {
                //                 return output.css;
                //             });
                //         }
                //     },
                //     transformPath: function (target) {
                //         return target.replace('.less', '.wxss');
                //     }
                // }
            ]
        })
    ]
}