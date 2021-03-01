const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

Comments = mongoose.Schema({
    userId : {type : mongoose.Types.ObjectId , ref : 'users'} , 
    productEnglishName : {type : String , require : true} , 
    status : {type : String , default : 'New'} , // New | Accepted | Waste
    PublishDate : {type : Date } , 
    Body : {type : String , default : 'تنظیم نشده'}
})

Comments.plugin(mongoosePaginate)

Comments.pre('save' , function(next) {
    REDIS.incr('commentCounts' , (err , id) => {
        if(err) throw err
        else { 
            this.PublishDate = new Date()
            next()
        }
    })
})

Comments.pre('deleteOne' , function (next) { 
    REDIS.decr('commentCounts' , (err , id) => {
        if(err) throw err
        else next()
    })
 })

module.exports = mongoose.model('comments',Comments)

