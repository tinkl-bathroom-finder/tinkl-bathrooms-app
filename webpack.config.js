const path = require('path');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
    ],
}
