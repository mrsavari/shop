const {check} = require('express-validator')

module.exports = [
    check('productId').notEmpty().withMessage(CONSTANT.PleaseEnter('کد محصول')) ,
    check('price').notEmpty().withMessage(CONSTANT.PleaseEnter('مبلغ'))
]