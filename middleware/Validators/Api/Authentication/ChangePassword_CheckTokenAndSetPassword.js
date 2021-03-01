const {check} = require('express-validator')

module.exports = [    
    check('NewPassword').notEmpty().withMessage(CONSTANT.PleaseEnter('رمز عبور جدید'))
]