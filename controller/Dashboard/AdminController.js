const mailHelper = require('helpers/email')
class AdminController {
    async getAdmins(req,res){
        let data = await UTILS.get('Admin')
        res.render('Admin/getAdmins' , {data})
    }

    getNewAdmin(req,res){
        //TODO Get Available Access From DB
        res.render('Admin/newAdmin' , {type : "New"})
    }

    async postNewAdmin(req,res){
        req.body.phoneNumber = FUNC.zeroValidator(req.body.phoneNumber)
        await UTILS.new('Admin' , req.body)
        req.flash('success' , "عملیات با موفقیت انجام شد")
        res.redirect('/dashboard/newAdmin')
    }

    async getRoles(req,res){
        // Implement it Soon....
    }

    async getReport(req,res){
        res.render('Admin/report')
    }

    async newReport(req,res){
        let imageUrl = ""
        if(req.files[0]){
            const image = req.files[0]
            const dest = image.destination.replace("public/" , '/')
            imageUrl = `${CONFIG.fullName}${dest}/${image.filename}`
        }
        const ErrorDesc = req.body.ErrorDesc || 'ندارد'
        const ErrorBody = req.body.ErrorBody || 'ندارد'
        const message = `
            <b>گزارش مشکلی جدید</b>
            <hr>
            توضیحات : ${ErrorDesc}
            <hr>
            ارور : ${ErrorBody}
            <hr>
            تصویر : ${imageUrl}
            <hr>    
        `
        const SendResult = mailHelper.sendEmail('پشتیبانی به نصف' , 'mahdipakravan79@gmail.com' , 'مشکلی پیش آمده' , '' , message)

        if(SendResult) FUNC.Redirect(req,res,'/dashboard/Report' , CONSTANT.Success('') , 'success' )
        else FUNC.Redirect(req,res,'/dashboard/Report',CONSTANT.Failure('') , 'error')
    }

}

module.exports = new AdminController