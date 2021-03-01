const smsHelper = require('helpers/sms')
const uniqueString = require('unique-string')
const paymentHelper = require("helpers/payment")
const moment = require('moment')
const autobind = require('auto-bind')

class Order {
    constructor(){
        autobind(this)
    }

    constructor(){autobind(this)}

    async NewOrder(req,res){
        const user = await UTILS.getOne('User' , {_id : req.token.userId})
        const params = {
            userId : req.token.userId ,
            productId : user.Cart ,
            price : req.body.price , 
            name : req.body.name || "",
            lastName : req.body.lastName || req.token.uName ,
            Status : "NotPaid" ,
            address : req.body.address ,
            phoneNumber1 : req.body.phoneNumber1 || req.token.uPhoneNumber ,
            phoneNumber2 : req.body.phoneNumber2 || req.token.uPhoneNumber ,
            token : uniqueString() ,
            IntroduceCode : FUNC.GenerateIntroduceCode(10)
        }
        if(FUNC.CheckOrderValidation(user.Cart , req.body.price)) {    
            await UTILS.new("Order" , params)
            await UTILS.set("User" , {_id : params.userId} , {Cart : []})
            FUNC.ApiResponse(res , 200 , CONSTANT.Success('سفارش جدید') ,
             {TokenForStartPayment : params.token , UrlForStartPayment : `/api/v1/StartPayment/${params.token}`})
            CONFIG.sendSMS.NewOrder ? smsHelper.SendSMS(req.body.uPhoneNumber , 'تست' , '2012') : ('')
        } else {
            LOGGER.warn(`Not Valid Order / ip : ${req.connection.remoteAddress} / userId : ${req.token.userId}`)
            FUNC.ApiResponse(res , 404 , 'در سفارش شما خطایی وجود دارد یا سبد خرید شما خالی است')
        }
    }

    async startPayment(req,res){
        let order = await UTILS.getOne("Order" , {token : req.params.token})
        const params = {
            amount : order.price , 
            token : req.params.token , 
        }
        if(order && order.Status === "NotPaid"){
            const price = order.price
            paymentHelper.getTokenForPayment(params , async (err , result) => {
                if(err) FUNC.ApiResponse(res , 500 , 'خطایی وجود دارد')
                else {
                    const payment = await UTILS.new("Payment" , {
                        customerId : order.userId , 
                        token : req.params.token ,
                        price : order.price , 
                        bankToken : result.SalePaymentRequestResult.Token ,
                        status : 'StartPayment'
                    })
                    await UTILS.set("Order" , {token : req.params.token} , {payId : payment._id , Status : "StartPay"})
                    res.redirect(`https://pec.shaparak.ir/NewIPG/?token=${result.SalePaymentRequestResult.Token}`)
                }
            })
        } else { 
            FUNC.ApiResponse(res , 403 , "شما قبلا برای پرداخت این سفارش وارد درگاه شده اید , برای سفارش جدید آن را به سبد خرید خود اضافه کنید")
        }
    }

    async PaymentCallback(req,res){
        console.log(req.body)
        const data = {
            statusBankCode : req.body.status , 
            status : parseInt(req.body.status) !== 0 ? ("PaymentFailed") : ("Paid") , 
            message : parseInt(req.body.status) !== 0 ? (CONSTANT.payment.failed) : (CONSTANT.payment.success) , 
        }
        if(req.body.status !== '0') {this.paymentFailed("PaymentFailed" , data , req.query.token , res , req); return;}
        paymentHelper.ConfirmPayment(req.body.Token , async (err , result) => {
            if(err) this.paymentFailed("PaymentFailed" , data , req.query.token , res , req); 
            else {
                if(result.ConfirmPaymentResult.Status === -1533) res.send("تراکنش از قبل تایین تکلیف شده است");
                else if (result.ConfirmPaymentResult.Status === 0) this.paymentSuccess("PaymentSuccess" , data , req.query.token , res , req)
                else {this.paymentFailed("PaymentFailed" , data , req.query.token , res , req);}
            }
        })
    }

    async paymentFailed(Status , data , token , res , req){
        console.log("Payment Failed")
        const payment = await UTILS.getAndSet('Payment' , {token} , {statusBankCode : data.statusBankCode , status : data.status , message : data.message})
        const order = await UTILS.getAndSet('Order' , {token} , {Status})
        data.price = req.body.Amount || payment.price
        data.date = order.Date
        data.id = payment._id
        data.token = token
        res.render('backToSite' , {layout : 'empty' , data , fullName : CONFIG.fullName , pageTitle : data.message}); 
    }

    async paymentSuccess(Status , data , token , res , req){
        console.log("Payment Success")
        const payment = await UTILS.getAndSet('Payment' , {token} , {statusBankCode : data.statusBankCode , status : data.status , message : data.message})
        const order = await UTILS.getAndSet('Order' , {token} , {Status : "Paid"})
        data.price = req.body.Amount
        data.date = order.Date
        data.id = payment._id
        data.token = token
        res.render('backToSite' , {layout : 'empty' , data , fullName : CONFIG.fullName , pageTitle : data.message}); 
    }
}

module.exports = new Order