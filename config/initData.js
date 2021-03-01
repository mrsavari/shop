const admin = require('config/init/admin')
const user = require('config/init/user')
const brand = require('config/init/Brand')
const category = require('config/init/category')
const categoryChild = require('config/init/categoryChild')
const comment = require('config/init/comment')
const order = require('config/init/order')
const payment = require('config/init/payment')
const product = require('config/init/product')
const provider = require('config/init/Provider')
const requestProduct = require('config/init/requestProduct')
const usesIntroduce = require('config/init/usesIntroduce')
const page = require('config/init/page')

module.exports = {
    SimpleMetaForProduct : 'محصول - فلان - بیثار - محصول در هالف پی - هالف پی - محصولات - تخفیف 50 درصد - تخفیف 50 درصدی برای محصول - محصول با 50 درصد' , 
    admin,
    user , 
    brand ,
    category , 
    categoryChild , 
    comment ,
    order , 
    payment , 
    product , 
    provider , 
    requestProduct , 
    usesIntroduce ,
    page , 
    slider : {
        _id : "5ece0eda9620641e049eed6c" , 
        Sliders : ['http://shop.ir/static/media/1.bb877d49.jpg' , 'http://shop.ir/static/media/2.d5ae3a76.jpg'] ,
        constantSlider1 : "http://shop.ir/static/media/1.bb877d49.jpg" , 
        constantSlider2 : "http://shop.ir/static/media/1.bb877d49.jpg"
    }
}