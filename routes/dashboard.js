const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')
let storage = multer.diskStorage(CONFIG.multerStorage)
let upload = multer({storage : storage})

//Import Controllers
const homeController = require('controller/Dashboard/homeController')
const UsersController = require('controller/Dashboard/UsersController')
const ProductsController = require('controller/Dashboard/ProductsController')
const OrdersController = require('controller/Dashboard/OrdersController')
const UsesIntroduceController = require('controller/Dashboard/UsesIntroduceController')
const PaymentController = require('controller/Dashboard/PaymentController')
const RequestedProductController = require('controller/Dashboard/RequestedProductController')
const ProviderController = require('controller/Dashboard/ProviderController')
const AdminController = require('controller/Dashboard/AdminController')
const PageController = require("controller/Dashboard/PageController")
const PersenceController = require("controller/Dashboard/PersenceController")

//Import MiddleWares
const NewUser = require('middleware/Validators/NewUser')
const newAdmin = require('middleware/Validators/newAdmin')
const CheckUploadPath = require('middleware/CheckUploadPath')

const HandleDashboardValidation = require('middleware/HandleDashboardValidation')

router.get('/',homeController.getDashboard)

//-----------------[Admins Routes]----------------------
router.get('/Admins' , AdminController.getAdmins)
router.get('/newAdmin' , AdminController.getNewAdmin)

router.post('/newAdmin' , 
     newAdmin , 
     HandleDashboardValidation.handle , 
     AdminController.postNewAdmin)

router.get('/Report' , AdminController.getReport)

router.post('/newReport' , CheckUploadPath.handle ,
     upload.array('ErrorPic' , 1)
     , AdminController.newReport)


//-----------------[Users Routes]----------------------

router.get('/Users' , UsersController.getUsers)
router.get('/newUser' , UsersController.getNewUser)

router.post('/newUser' ,
 NewUser ,
 HandleDashboardValidation.handle , 
 UsersController.postNewUser)

router.get('/delete_user/:id' , UsersController.DeleteUser)
router.get('/getUser/:id' , UsersController.GetEditUser)
router.post('/editUser/:id' , UsersController.PostEditUser)

//-----------------[Products Routes]----------------------
router.get('/Products' , ProductsController.getProducts)
router.get('/NewProduct' , ProductsController.GetNewProducts)
router.post('/NewProduct' ,
     CheckUploadPath.handle ,
     upload.array('gallery' , 6) , 
     ProductsController.PostNewProducts)
router.get('/delProduct/:id' , ProductsController.DeleteProduct)
router.get('/getProduct/:id' , ProductsController.GetEditProduct)
router.post('/setProduct/:id' , ProductsController.SetProduct)
router.get('/Comments' , ProductsController.getComments)

router.get('/getInterView/:id' , ProductsController.getInterView)

router.post('/postInterView' , 
     CheckUploadPath.handle ,
     upload.array('image' , 3) ,
     ProductsController.postInterView)
// getInterView

//-----------------[Orders Routes]----------------------
router.get('/Orders' , OrdersController.getOrders)
router.get('/getOrder/:id' , OrdersController.getOrder)

//-----------------[UsesIntroduce Routes]----------------------
router.get('/UsesIntroduces' , UsesIntroduceController.getUsesIntroduces)

//-----------------[Payments Routes]----------------------
router.get('/Payments' , PaymentController.getPayments)
router.get('/getPayment/:id' , PaymentController.getPayment)

//-----------------[RequestProduct Routes]----------------------
router.get('/RequestProducts' , RequestedProductController.getRequestedProduct)
router.get('/requestProduct_chagngeStatus' , RequestedProductController.changeRequestedProduct)
router.post('/changeRequestedProductEnglishName' , RequestedProductController.changeRequestedProductEnglishName)

//-----------------[Providers Routes]----------------------
router.get('/Providers' , ProviderController.getProviders)

router.get('/newProvider' , ProviderController.getNewProvider)
router.post('/newProvider' , ProviderController.postNewProvider)

router.get('/getProvider/:id' , ProviderController.getProvider)
router.post('/setProvider/:id' , ProviderController.setProvider)

router.get('/delProvider/:id' , ProviderController.delProvider)

//-----------------[Pages Routes]----------------------
router.get('/Pages' , PageController.getPages)

router.get('/Page/:pageName' , PageController.getPage)
router.post('/newPage' , PageController.postNewPage)
router.post('/editPage/:pageName' , PageController.editPage) 
router.get('/newPage',PageController.newPage)

router.get('/Sliders' , PageController.getSliders)
router.post('/Sliders' , 
     CheckUploadPath.handle ,
     upload.array('gallery' , 5) ,
     PageController.postSliders)

//-----------------[Persence Routes]----------------------
router.get("/Persences" , PersenceController.getPersences)
router.get('/delPersence/:id' , PersenceController.delPersence)
router.get('/addPersences' , PersenceController.addPersences)

module.exports = router