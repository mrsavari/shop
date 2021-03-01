const {check} = require('express-validator')

module.exports = [
    check('uPhoneNumber')
    .custom(val => {
        if(val) {
            if(FUNC.zeroValidator(val) === null) throw new Error(CONSTANT.PleaseCorrect('شماره تلفن'))
            else return Promise.resolve(FUNC.zeroValidator(val))
        } else throw new Error(CONSTANT.PleaseEnter('شماره تلفن'))
    }) ,
    
    check('uPassword').notEmpty().withMessage(CONSTANT.PleaseEnter('رمز عبور'))
]