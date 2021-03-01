const express = require('express')
const router = express.Router()

const homeController = require('controller/Dashboard/homeController')
const redirectIfAuthenticated = require('middleware/redirectIfAuthenticated')

/*
    if(authenticated) redirect(/dashboard)
    else next() //Login Page
*/
router.get('/',
    redirectIfAuthenticated.handle,
    homeController.login)

router.post('/login',homeController.loginPost)

module.exports = router