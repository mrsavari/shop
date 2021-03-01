const mongoose = require('mongoose'),
Payment = mongoose.Schema({
    customerId : {type : mongoose.Types.ObjectId , require : true , ref : 'users'} ,
    paymentName : {type : String , default : 'parsian'} , //For Example :  Parsian - Saman
    bankToken : {type : String }, 
    token : {type : String},
    price : {type : Number , require : true} , 
    payedPrice : {type : Number , default : 0 , require : true} ,
    date : {type : Date , require : true} ,
    status : {type : String , default : "PaymentFailed"} , // PaymentFailed - Paid
    statusBankCode : {type : Number} , 
    hashCardNumber : {type : String} , 
    message : {type : String }
})

Payment.pre('save',function(next){
    this.date = new Date()
    next()
})

module.exports = mongoose.model('payment',Payment)

