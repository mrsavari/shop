
const path = require('path')
module.exports = class globalVariable{
    constructor(req,res){
        return {
            webTitle : 'پنل مدیریتی به نصف' ,
            title : '' ,
            success : '' ,
            error : req.flash('error') ,
            success : req.flash('success'),
            moment : require('moment-jalaali') , 
            ErrType : "UnhandledError" ,
            option : {title : 'به نصف !'}
        }
    }
}