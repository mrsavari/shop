const mongoose = require('mongoose')

usesIntroduce = mongoose.Schema({
    customerId : {type : mongoose.Types.ObjectId , require : true , ref : 'users'} , 
    productId : {type : mongoose.Types.ObjectId , require : true , ref : 'products'} , 
    code : {type : String , require : true} , 
    finalPrice : {type : Number , require : true } , 
    incomedPrice : {type : Number , require : true}
})

usesIntroduce.pre('save',function(next){
    next()
})

module.exports = mongoose.model('usesIntroduce',usesIntroduce)

