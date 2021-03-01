const {check} = require('express-validator')
const User = require('models/Users')

module.exports = [
    check('uName').notEmpty().withMessage(CONSTANT.PleaseEnter('نام')) , 
    check('uLastName').notEmpty().withMessage(CONSTANT.PleaseEnter('نام خانوادگی')) , 

    check('uPhoneNumber')
    .custom(val => {
        if(val) {
            if(FUNC.zeroValidator(val) === null) throw new Error(CONSTANT.PleaseCorrect('شماره تلفن'))
            else {
                return User.findOne({'uPhoneNumber' : FUNC.zeroValidator(val)} , {}).then(user => {
                    if (user) {
                        return Promise.reject(CONSTANT.AnotherFind('شماره تلفن'));
                    } else return Promise.resolve(FUNC.zeroValidator(val))
                });
            }
        } else throw new Error(CONSTANT.PleaseEnter('شماره تلفن'))
    }) ,
    
    check('uPassword').notEmpty().withMessage(CONSTANT.PleaseEnter('رمز عبور'))
    .isLength({min : 6}).withMessage(CONSTANT.PleaseEnter('رمز عبور')),
]