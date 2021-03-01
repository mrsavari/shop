const mongoose = require('mongoose'),

Furniture = mongoose.Schema({
    productId : {type : mongoose.Types.ObjectId , ref : 'products'} ,
    Detail : {type : Object , require : true}
})

module.exports = mongoose.model('feature_furniture',Furniture)

