const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const bcryptHelper = require('helpers/bcrypt')
const bcrypt = require('bcrypt')

User = mongoose.Schema({
    uName : {type : String},
    uLastName : {type : String},
    uPhoneNumber : {type : String , required : true},
    uStatus : {type : Boolean , require : true , default : false},
    uEmail : {type : String} ,
    uPassword : {type : String} ,
    RegistredBy : {type : String , default : "self"} , 
    uBirthday : {type : Date} ,
    RegistredAt : {type : Date} , 
    SmsCode : {type : String } , 
    ForgotPasswordToken : {type : String} ,
    RegisterToken : {type : String } , 
    LastLogin : {type : Date } ,
    AuthenticationStatus : {type : String , default : 'NotVerifyed'} ,
    Cart : {type : Array , default : []} , 
    uAddress : {type : String}
},{timestamp : true})

User.plugin(mongoosePaginate)

User.pre('save',function(next){
    bcryptHelper.encrypt(this.uPassword , (err , hashed)=>{
        this.uPassword = hashed
        this.RegistredAt = new Date()
        this.LastLogin = new Date()
        next();
    })
})

User.methods.comparePassword = function (pass){
    return bcrypt.compareSync(pass,this.password);
}

module.exports = mongoose.model('users',User)

