const express = require('express')
const router = express.Router()

//------------[Controllers]----------------
const Authentication = require('controller/Api/Authentication')
const Helper = require('controller/Api/Helper')
const ProductController = require('controller/Api/Product')
const OrderController = require('controller/Api/Order')
const PageController = require('controller/Api/Page')
const PersenceController = require('controller/Api/Persence')

const HandleValidation = require('middleware/HandleValidation')

//------------[Validation MiddleWares]----------------
const NewUserValidator = require('middleware/Validators/Api/Authentication/Register')
const LoginValidator = require('middleware/Validators/Api/Authentication/Login')
const VerifyValidator = require('middleware/Validators/Api/Authentication/Verify')
const ChangePassword_SendSms = require('middleware/Validators/Api/Authentication/ChangePassword_SendSms')
const ChangePassword_Verify = require('middleware/Validators/Api/Authentication/ChangePassword_Verify')
const ChangePassword_CheckTokenAndSetPassword = require('middleware/Validators/Api/Authentication/ChangePassword_CheckTokenAndSetPassword')

router.post('/login' ,
 LoginValidator ,
 HandleValidation.handle ,
 Authentication.login)

router.post('/register' ,
    NewUserValidator ,
    HandleValidation.handle ,
    Authentication.register)

router.post('/verify' , 
    VerifyValidator , 
    HandleValidation.handle ,
    Authentication.Verify)

router.post('/ChangePassword/SendSms' , 
    ChangePassword_SendSms , 
    HandleValidation.handle ,
    Authentication.ChangePassword_SendSms)

router.post('/ChangePassword/Verify' , 
    ChangePassword_Verify , 
    HandleValidation.handle ,
    Authentication.ChangePassword_Verify)

router.post('/ChangePassword/CheckTokenAndSetPassword' , 
    ChangePassword_CheckTokenAndSetPassword , 
    HandleValidation.handle ,
    Authentication.ChangePassword_CheckTokenAndSetPass)

router.post('/CheckToken' , Helper.CheckToken)

router.all('/Products/:child' , ProductController.GetProducts)

router.post('/Product' , ProductController.GetProduct)

router.get('/Comments/:productEnglishName' , ProductController.getComment)

router.get('/StartPayment/:token' , OrderController.startPayment)

router.post('/callback_payment' , OrderController.PaymentCallback) // This is Just Use By Bank

router.get('/Page/:pageName' , PageController.getPage)

router.get('/Slider' , PageController.getSlider)

router.get('/Persences' ,
    PersenceController.getPersences)

module.exports = router