const path = require("path")
const webpack = require("webpack")
const nodeExternals = require("webpack-node-externals")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

const serverConfig = {
    target: "node",
    optimization: {
        minimize: true,
    },
    output: {
        libraryTarget: "commonjs2",
        path: path.resolve(__dirname, "dist"),
        filename: "lib.node.js"
    },
    plugins: [
    ],
    externals: [nodeExternals()]
}

const clientConfig = {
    target: "web",
    optimization: {
        minimize: true,
    },
    output: {
        library: "PascalMnemonic",
        libraryTarget: "umd",
        path: path.resolve(__dirname, "dist"),
        filename: "lib.web.js"
    },
    plugins: [
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: "static",
            reportFilename: "../tests/webpack-stats.html"
        })
    ],
    node: {
    }
}

module.exports = [ serverConfig, clientConfig ]
