const moment = require('moment-jalaali')
module.exports = {
    port : process.env.port , 
    host : process.env.host,
    fullName : `${process.env.siteProtocol}shop.ir:${process.env.port}`,
    api_version : process.env.API_VERSION ,
    mongoDB : `mongodb://localhost:27017/${process.env.mongoDB}` ,
    expireTime : ((60 * 60) * 24 ) * 10, //1 hour = 60 * 60 sec & 1 day = hour * 24 & 10 day = day * 10
    Schedule : {
        Persence : [9 , 0]
    } ,
    sendSMS : {
        Register : true , 
        Login : false , 
        ForgotPassword : false ,
        NewOrder : true , 
        Paid : true
    },
    genSalt : 10 ,
    jwt : {
        expire: { expiresIn: '10d' } ,
        secret : 'secret key'
    },
    Email : {
        service: 'gmail',
        auth: {
        user: "shopservice@gmail.com",
        pass: "zaqZAQ12345!@#$%"
        }
    },
    SMS : {
        Url : 'https://rest.payamak-panel.com/api/SendSMS/BaseServiceNumber' ,
        Username : 'aria5763' , 
        Password : '3769'
    } ,
    multerStorage : { 
        destination: function (req, file, cb) {
            const year = moment().format('jYYYY') ,
            month = moment().format('jM') ,
            day = moment().format('jD')

            cb(null, `public/uploads/${year}/${month}/${day}`)
        },
        filename: function (req, file, cb) {
            cb(null, moment().format('HHmmss') + '-' + file.originalname)
        }
    } , 
    payment : {
        pec : {
            LoginAccount : "1a6IdHC7UXbhPD4d1E7f" , 
            CallBackUrl : 'https://shop.ir:4750/api/v1/callback_payment'
        }
    }
}