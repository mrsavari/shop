const express = require('express')
const router = express.Router()
const cors = require('cors')
const morgan = require('morgan')
const winston = require('winston')
const LoggerStream = require('middleware/LoggerStream')

const dashboardRoutes = require('routes/dashboard')
const publicRoutes = require('routes/public')
const apiRoutes = require('routes/api')
const apiPrivateRoutes = require('routes/api_private')

//Middlewares
const redirectIfNotAuthenticated = require('middleware/redirectIfNotAuthenticated')
const ApiEssentialAccess = require('middleware/ApiEssentialAccess')
const CookieToBody = require('middleware/CookieToBody')
const JwtAuthorization = require('middleware/JwtAuthorization')
const AccessControl = require('middleware/AccessControl')

const API_VERSION = CONFIG.api_version

router.use(ApiEssentialAccess.handle)
router.use(cors({origin: /shop/,credentials: true}))

router.use('/dashboard' , redirectIfNotAuthenticated.handle , AccessControl.handle , dashboardRoutes)

router.use(`/api/v${API_VERSION}` ,
    morgan(":method :url :status :remote-addr :res[content-length] - :response-time ms" ,{stream : LoggerStream}),
    apiRoutes)

router.use(`/api/v${API_VERSION}` ,
    JwtAuthorization.handle ,
    apiPrivateRoutes)
    
router.use('/',publicRoutes)

module.exports = router