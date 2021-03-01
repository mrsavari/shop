const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

Categories = mongoose.Schema({
    PersianName : {type : String , require : true} , 
    EnglishName : {type : String , require : true} , 
    PublishDate : {type : Date}
})

Categories.plugin(mongoosePaginate)

Categories.pre('save' , function(next) {
    this.PublishDate = new Date()
    next()
})

module.exports = mongoose.model('categories',Categories)

