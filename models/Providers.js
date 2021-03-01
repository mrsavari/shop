const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

Providers = mongoose.Schema({
    name : {type : String , require : true} , 
    englishName : {type : String , require : true} , 
    registredAt : {type : Date , require : true} , 
    BuyCount : {type : Number , default : 0}
})

Providers.plugin(mongoosePaginate)

Providers.pre('save' , function(next) {
    this.PublishDate = new Date()
    next()
})

module.exports = mongoose.model('providers',Providers)

