const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

reservedPersence = mongoose.Schema({
    userId : {type : mongoose.Types.ObjectId , ref : 'users'} ,
    Date : {type : Date , require : true} , 
    reservedDate : {type : String} , 
    reservedTime : {type : Number}
})

reservedPersence.pre('save',function(next){
    this.Date = new Date()
    next();
})

module.exports = mongoose.model('reservedPersence',reservedPersence)

