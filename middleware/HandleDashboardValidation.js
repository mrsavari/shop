const {validationResult} = require('express-validator')
module.exports = {
    handle(req,res,next){
        const errors = validationResult(req);
        const option = {title : "Error"}
        if(errors.errors.length != 0) { 
            res.render('Error' , { err : errors.errors , ErrType : 'validation' , option })
        } else next()
    }
}

