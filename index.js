require('app-module-path').addPath(__dirname)
require('dotenv').config()
// require('moment/locale/fa')
const app = require('bin')
const argv = require("yargs").argv
const redis = require('redis')

global.LOGGER = require('config/logger')
global.FUNC = require('bin/functions')
global.CONFIG = require('config/config')
global.CONSTANT = require('config/constant')
global.REDIS = redis.createClient()
global.UTILS = require('bin/Utility')
global.DIR = __dirname

const App = new app()
if(argv.init) App.Initialize()
if(argv.isDev) {
    CONFIG.host = 'localhost'
    LOGGER.warn("Dev Mode")
    App.ConfigureYargs()
}