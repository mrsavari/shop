const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

Brands = mongoose.Schema({
    name : {type : String , require : true},
    persianName : {type : String , require : true} , 
    category : {type : Array , require : true} ,
    PublishDate : {type : Date}
})

Brands.plugin(mongoosePaginate)

Brands.pre('save' , function(next) {
    this.PublishDate = new Date()
    next()
})

module.exports = mongoose.model('brands',Brands)

