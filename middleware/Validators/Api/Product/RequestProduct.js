const {check} = require('express-validator')

module.exports = [
    check('productName').notEmpty().withMessage(CONSTANT.PleaseEnter('نام محصول'))
]