const bcrypt = require('bcrypt')
module.exports = {
    encrypt : (text ,cb) => {
        bcrypt.genSalt(CONFIG.genSalt , (err , salt) => { 
            bcrypt.hash(text , salt , (err , hash)=>{
                cb(err , hash)
            })
        })
    },

    checkPassword : (password1 , password2) => {
        return bcrypt.compare(password1 , password2);
    }
}