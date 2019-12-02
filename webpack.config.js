const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const fs = require('fs');

module.exports = (env, argv) => {

    const config = {
        devServer: {
            contentBase: `${__dirname}/compiled`,
            open: true,
            index: 'ignition.html',
            before: function(app, server) {
                app.get('/_laracatch/navigator', function(req, res) {
                    res.sendFile(`${__dirname}/compiled/navigator.html`);
                });

                app.get('/_laracatch/api/exceptions', function (req, res) {
                    const contents = JSON.parse(fs.readFileSync(`${__dirname}/compiled/data.json`, 'utf8'));

                    res.json([contents.error]);
                });

                app.get('/_laracatch/api/exceptions/550e8400-e29b-41d4-a716-446655440000', function (req, res) {
                    const contents = JSON.parse(fs.readFileSync(`${__dirname}/compiled/data.json`, 'utf8'));

                    res.json(contents.error);
                });
            }
        },

        entry: {
            laracatcher: './src/js/laracatcher.js',
            navigate: './src/js/navigate.js'
        },

        output: {
            path: `${__dirname}/compiled`,
            publicPath: '/',
            filename: '[name].js',
        },

        module: {
            rules: [
                {
                    test: /\.(js|tsx?)$/,
                    use: 'babel-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        { loader: 'css-loader', options: { url: false } },
                        'postcss-loader',
                    ],
                }
            ],
        },

        plugins: [
            new VueLoaderPlugin(),
            new WebpackAssetsManifest({
                output: 'mix-manifest.json',
                publicPath: true
            })
        ],

        resolve: {
            extensions: ['.css', '.js', '.vue'],
            alias: {
                vue$: 'vue/dist/vue.esm.js',
            },
        },

        stats: 'minimal',

        performance: {
            hints: false,
        },
    };

    return config;
};
