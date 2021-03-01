const {check} = require('express-validator')

module.exports = [
    check('limitedToken').notEmpty().withMessage(CONSTANT.PleaseEnter('توکن')) ,
    
    check('SmsCode').notEmpty().withMessage(CONSTANT.PleaseEnter('کد ارسال شده'))
]