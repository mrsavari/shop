const mongoose = require('mongoose'),

Laptop = mongoose.Schema({
    productId : {type : mongoose.Types.ObjectId , ref : 'products'} ,
    Weight : {type : Object , require : true} , // (g) 500 - 600 - 2000
    Type : {type : Object , require : true } , // Gaming - Programming - Multimedia - Tin 
    TouchScreen : {type : Boolean , default : false} , // Touch Or Matte
    ScreenSize : {type : Object , require : true }, // 8 , 9 --- 10.1 , 15.2 
    RamType : {type : Object , require : true } , // DDR2 - DDR3 - DDR4
    Os : {type : Object , require : true} , // None - Win7 - Win8 - Win9 - Win10
    GraphicBrand : {type : Object , require : true} , // Nvidia - Intel - AMD - ATI - ROCKCHIP
    Graphic : {type : Object , require : true} , // 256 - 512 - 1024 - 2048 
    internalMemory : {type : Object , require : true} , // 64g - 128g - 256g - 512g - 1t - 2t - 3t
    hardType :  {type : Object , require : true } , // SHD - NVME - SSD - HDD
    Ram : {type : Object , require : true} , //2g - 4g - 8g - 16g - 32g
    Cpu : {type : Object , require : true} , // CoreI3 - CoreI5 - CoreI7 --- Pentium 
})

module.exports = mongoose.model('feature_laptop',Laptop)