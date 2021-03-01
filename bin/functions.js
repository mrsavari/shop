const Init = require('models/Init')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const Reformaters = require('bin/Reformater')

const User = require('models/Users')
module.exports = {
    zeroValidator : (phoneNumber)=>{
        if(phoneNumber[0] === '0' && phoneNumber.length === 11){
            let result = ''
            phoneNumber.replace(/(9|09)([0-3])([0-9])(\d{7})/ , (match , g1 , g2 , g3 , g4 )=>{
                match == "" ? result = null : result = `9${g2}${g3}${g4}`
            })
            return result
        } else if (phoneNumber[0] === '9' && phoneNumber.length === 10) {
            let result = ''
            phoneNumber.replace(/(9|09)([0-3])([0-9])(\d{7})/ , (match , g1 , g2 , g3 , g4 )=>{
                match == "" ? result = null : result = `9${g2}${g3}${g4}`
            })
            return result
        } else return null
    },
    GenerateIntroduceCode : (count) => {
        let symbol = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUNVWXYZ1234567890'
        let str = ''
        for(let i = 0 ; i < count ; i++){
            str += symbol[parseInt(Math.random() * (symbol.length))]
        }
        return str
    },
    initData : () => {
        new Init()
    },

    jwtSign : (params , cb)=>{
        const token = jwt.sign({
            data: params
        }, CONFIG.jwt.secret , CONFIG.jwt.expire);
        if(token== null && token==undefined) cb('err' , '')
        else cb(null , token)
    },
    decodeJWT : (token , callback)=>{
        jwt.verify(token, CONFIG.jwt.secret , function(err, decoded) {
            if(err) callback(err , '')
            else callback(null , decoded)
        });
    },

    ApiResponse : (res , status , message , data = [] ) => {
        res.status(status).json({
            status , 
            message ,
            data
        })
    } ,

    Handle403 : (res) => {
        res.render('403')
    },

    HandleValidateErrors : (errors ) => {
        if(errors.errors.length != 0) { 
            let ValidationErrors = []
            errors.errors.forEach(err => {
                ValidationErrors.push(err.msg)
            })
            return ValidationErrors
        } else return false
    } ,
    
    Validation : (req , res) => {
        const errors = FUNC.HandleValidateErrors(validationResult(req))
        if(errors) {
            FUNC.ApiResponse(res , '401' , CONSTANT.ValidationError , errors)
            return false
        } else return true
    },
    Redirect : (req , res , url , msg = CONSTANT.Success('') , type) => {
        // Types : success & error
        req.flash(type , msg)
        res.redirect(url)
    } ,

    Reformaters ,

    CheckBrandsContain : (brand , child , cb) => {
        REDIS.smembers(`b_${brand}` , (err , result) => {
            if(result.indexOf(child) >= 0) {
                cb(true)
            } else cb(false)
        })
    } ,

    CheckOrderValidation : (basket , price) => {
        let sum = 0 ;
        basket.forEach(item => {
            sum+=parseInt(item.Price) * item.count
        })
        return sum === parseInt(price)
    } ,

    
}