import path from 'path';
import nodeExternals from 'webpack-node-externals';
const CURRENT_WORKING_DIR = process.cwd();
const config = {
    name: "server",
    mode: "development",
    entry: [path.join(CURRENT_WORKING_DIR, './src/index.js')],
    target: "node",
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist/'),
        filename: "main.js",
        publicPath: '/dist/',
        libraryTarget: "commonjs2"
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    }
}
export default config;