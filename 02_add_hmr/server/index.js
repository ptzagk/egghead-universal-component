const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
// NEW
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const clientConfig = require('../webpack/client.dev')
const serverConfig = require('../webpack/server.dev')

const app = express()

const compiler = webpack([clientConfig, serverConfig])
const clientCompiler = compiler.compilers[0]
const publicPath = clientConfig.output.publicPath
const options = { publicPath, stats: { colors: true } }

app.use(webpackDevMiddleware(compiler, options))
// NEW
app.use(webpackHotMiddleware(clientCompiler))
app.use(webpackHotServerMiddleware(compiler))

app.listen(3000, () => {
  console.log('Listening @ http://localhost:3000')
})
