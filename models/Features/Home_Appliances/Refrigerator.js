const mongoose = require('mongoose'),

Refrigerator = mongoose.Schema({
    productId : {type : mongoose.Types.ObjectId , ref : 'products'} ,
    EnergyConsumption : {type : Object , require : true} ,
    Weight : {type : Object , require : true} ,
    RefrigeratorStorage : {type : Object , require : true} ,
    FreezerStorage : {type : Object , require : true} ,
    Floors : {type : Object , require : true} , 
    KidLock : {type : Object , require : true} ,
})

module.exports = mongoose.model('feature_refrigerator',Refrigerator)
