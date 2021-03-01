const mongoose = require('mongoose'),

Carpet = mongoose.Schema({
    productId : {type : mongoose.Types.ObjectId , ref : 'products'} ,
    Size : {type : Object , require : true } , // (cm) 500*600 - 100*200
    Weight : {type : Object , require : true} , // (g) 1000 - 500 - 200
    HandMade : {type : Boolean , require : true } , // is it Handmade Or No
    Shape : {type : Object , require : true } , // Rectangle - Square - Circle
})

module.exports = mongoose.model('feature_carpet',Carpet)

