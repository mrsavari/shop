const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

RequestProduct = mongoose.Schema({
    userId : {type : mongoose.Types.ObjectId , ref : 'users'} ,
    Date : {type : Date , require : true} , 
    productName : {type : String , require : true} ,
    familiar : {type : String} ,
    productEnglishName : {type : String } , 
    supportStatus : {type : String , default : 'new'} //new - watching - finish (if Status = finish ProductEnglishName Should To Set)
})

RequestProduct.plugin(mongoosePaginate)

RequestProduct.pre('save',function(next){
    this.Date = new Date()
    // this.userId != "" ? (this.phoneNumber = FUBC) : ('')
    next();
})

module.exports = mongoose.model('requestProducts',RequestProduct)

