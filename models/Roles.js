const mongoose = require('mongoose')

Roles = mongoose.Schema({
    englishName : String , 
    persianName : String
})

module.exports = mongoose.model('roles',Roles)

