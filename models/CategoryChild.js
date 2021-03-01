const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

CategoryChild = mongoose.Schema({
    PersianName : {type : String , require : true} , //موبایل
    EnglishName : {type : String , require : true} , //Mobile
    father : {type : String , require : true } , //electronic-devices
    PublishDate : {type : Date} 
})

CategoryChild.plugin(mongoosePaginate)

CategoryChild.pre('save' , function(next) {
    this.PublishDate = new Date()
    next()
})

module.exports = mongoose.model('categorychildren',CategoryChild)

