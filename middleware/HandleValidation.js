const {validationResult} = require('express-validator')
module.exports = {
    handle(req,res,next){
        const errors = FUNC.HandleValidateErrors(validationResult(req))
        if(errors) {
            FUNC.ApiResponse(res , 401 , CONSTANT.ValidationError , errors)
        } else next()
    }
}

