const request = require('request')
class sms {
    constructor(){
        this.Err = ''
    }

    SendSMS(MobileNumber , Message , BodyId){
        var url = CONFIG.SMS.Url;
        var args = {
        "username": CONFIG.SMS.Username,
        "password": CONFIG.SMS.Password,
        "to": "0" + MobileNumber,
        "bodyId": BodyId || "16882",
        "text": Message
        };
        request({
            url: url,
            method: "POST",
            json: true,   // <--Very important!!!
            body: args
        }, function (error, response, body) {
            if(error) console.log(error)
            this.Err = error
        });
        return this.Err
    }
    
    CreateCode(){
        return Math.floor(Math.random() * 999999)
    }
}

module.exports = new sms