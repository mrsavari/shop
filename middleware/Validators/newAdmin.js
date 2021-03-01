const {check} = require('express-validator')
const Admin = require('models/Admin')

module.exports = [
    check('name').notEmpty().withMessage(CONSTANT.PleaseEnter('نام')) , 
    check('lastName').notEmpty().withMessage(CONSTANT.PleaseEnter('نام خانوادگی')) , 

    check('phoneNumber')
    .custom(val => {
        if(val) {
            if(FUNC.zeroValidator(val) === null) throw new Error(CONSTANT.PleaseCorrect('شماره تلفن'))
            else {
                return Admin.findOne({'phoneNumber' : FUNC.zeroValidator(val)} , {}).then(user => {
                    if (user) {
                        return Promise.reject(CONSTANT.AnotherFind('شماره تلفن'));
                    } else return Promise.resolve(FUNC.zeroValidator(val))
                });
            }
        } else throw new Error(CONSTANT.PleaseEnter('شماره تلفن'))
    }) ,
    
    check('password').notEmpty().withMessage(CONSTANT.PleaseEnter('رمز عبور'))
    .isLength({min : 6}).withMessage(CONSTANT.PleaseEnter('رمز عبور')),
]