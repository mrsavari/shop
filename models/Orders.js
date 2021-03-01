const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const moment = require('moment')

Orders = mongoose.Schema({
    userId : {type : mongoose.Types.ObjectId , require : true , ref : 'users' } , 
    productId : {type : Array , require : true} , // User Carts
    payId : {type : mongoose.Types.ObjectId , ref : 'payment'} ,
    price : {type : Number , require : true} , 
    Status : {type : String , default : 'NotPaid'} , //NotPaid - StartPay - PayFaild - Paid - Recived - Canceled
    Date : {type : Date , require : true } , 
    ReciveDate : {type : Date , require : true} ,
    IntroduceCode : {type : String} ,
    token : {type : String}
})

Orders.plugin(mongoosePaginate)

Orders.pre('save',function(next){
    this.Date = new Date()
    this.ReciveDate = moment(this.ReciveDate).add(1 , 'M')
    next()
})

module.exports = mongoose.model('orders',Orders)

