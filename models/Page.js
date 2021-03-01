const mongoose = require('mongoose')

Pages = mongoose.Schema({
    pageName : {type : String } , 
    pageTitle : {type : String } ,
    pageBody : {type : String} ,
    viewCount : {type : String}
})

module.exports = mongoose.model('pages',Pages)

