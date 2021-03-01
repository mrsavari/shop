const express = require('express')
const router = express.Router()

//-----------------[Controllers]----------------
const UserController = require('controller/Api/User')
const OrderController = require('controller/Api/Order')
const ProductController = require('controller/Api/Product')
const PersenceController = require('controller/Api/Persence')

//-----------------[MiddleWares]----------------
const NewOrderValidator = require('middleware/Validators/Api/Order/newOrder')
const RequestProductValidator = require('middleware/Validators/Api/Product/RequestProduct')
const HandleValidation = require('middleware/HandleValidation')

router.post('/Profile' , UserController.getProfile )
router.post('/EditProfile' , UserController.editProfile)
router.delete('/Logout' , UserController.logout)

router.post('/Cart' , UserController.addCard ) // For add A Product To Cart For init
router.get('/Cart' , UserController.getCard ) // For Get All Products
router.patch('/Cart' , UserController.patchCard ) // For mm or pp Cart

router.post('/CreateOrder' , 
    // NewOrderValidator , 
    // HandleValidation.handle ,
    OrderController.NewOrder )

router.post('/RequestProduct' ,
    RequestProductValidator ,
    HandleValidation.handle ,
    ProductController.RequestProduct)

router.post('/newComment' , 
    ProductController.newComment)

router.post('/reservePersence' ,
    PersenceController.reservePersence)

module.exports = router