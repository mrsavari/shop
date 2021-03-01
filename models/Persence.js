const mongoose = require('mongoose'),

Persence = mongoose.Schema({
    date : {type : String , require : true} , // 1399/03/07
    dayName : {type : String , require : true} , // شنبه
    times : {type : Array , require : true} // [10 , 11 , 12]
})

module.exports = mongoose.model('persence',Persence)

