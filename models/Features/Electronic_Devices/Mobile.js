const mongoose = require('mongoose'),

Mobile = mongoose.Schema({
    productId : {type : mongoose.Types.ObjectId , ref : 'products'} ,
    Weight : {type : Object , require : true} , // (g) 1000 - 500 - 200
    CommunicationNetwork : {type : Object , require : true} ,  // 2G - 3G - 4G - 5G
    Os : {type : Object , require : true } , // Android - Ios - Windows
    OsVersion : {type : Object , require : true} , // 1 , 2 , 3 , 4 , 5 , 6 , 7 --- 9
    Ram : {type : Object , require : true } ,  // 128mb - 256mb - 512mb - 1024mb - 2048mb --- 1gb - 2gb - 3gb - 4gb
})

module.exports = mongoose.model('feature_mobile',Mobile)

