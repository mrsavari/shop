const mongoose = require('mongoose'),
bcryptHelper = require('helpers/bcrypt')

adminSchema = mongoose.Schema({
    name : {type : String},
    lastname : {type : String},
    phoneNumber : {type : String , required : true},
    username : {type : String , required : true},
    status : {type : Boolean , default : true},
    access : {type : Array , default : ['dashboard']},
    password : {type : String} ,
    RegistredBy : {type : String } ,
    thumbnail : {type : String , default : 'https://img.favpng.com/23/0/3/computer-icons-user-profile-clip-art-portable-network-graphics-png-favpng-YEj6NsJygkt6nFTNgiXg9fg9w.jpg'} 
})

adminSchema.pre('save',function(next){
    bcryptHelper.encrypt(this.password , (err , hashed)=>{
        this.password = hashed
        next();
    })
})

module.exports = mongoose.model('administrator',adminSchema)

