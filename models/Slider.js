const mongoose = require('mongoose'),

sliderSchema = mongoose.Schema({
    Sliders : {type : Array , default : ['http://shop.ir/static/media/1.bb877d49.jpg' , 'http://shop.ir/static/media/2.d5ae3a76.jpg']} , 
    constantSlider1 : {type : String , default : 'http://shop.ir/static/media/2.d5ae3a76.jpg'} , 
    constantSlider2 : {type : String , default : 'http://shop.ir/static/media/2.d5ae3a76.jpg'}
})

module.exports = mongoose.model('slider',sliderSchema)

