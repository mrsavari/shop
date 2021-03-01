const nodemailer = require('nodemailer')
class email {
    async sendEmail(from = 'فروشگاه به نصف' , to , subject = 'وبسایت فروشگاهی به نصف' , text , html) {
        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport(CONFIG.Email);

        let info = await transporter.sendMail({
            from , 
            to ,
            subject , 
            text ,
            html
        });
        if(info.response) {
            LOGGER.info('[emailHelper] Sent Success')
            return true
        }
        else {
            LOGGER.error('[emailHelper] Sent Fail')
            return false
        }
    }
}

module.exports = new email