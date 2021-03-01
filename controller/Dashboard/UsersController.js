class UsersController {
    async getUsers(req,res){
        let page = req.query.page || 1 ,
        query = {}
        typeof req.query.phoneNumber != undefined ? query = {"" : req.query.uPhoneNumber} : ('')
        let data = await UTILS.paginate('User' , {limit : 20 , page , sort : {RegistredAt : - 1}} , query)
        res.render('Users/getUsers' , {data})
    }

    getNewUser(req,res){ res.render('Users/getUser' , {type : 'New'})}

    async postNewUser(req,res){
        await UTILS.new(req.body)
        res.render('Users/getUser' , { type : 'AfterAdd' , success : 'عملیات ثبت نام با موفقیت انجام شد'})
    }

    async DeleteUser(req,res){
        await UTILS.delOne('User',{"_id" : req.params.id})
        req.flash('message' , 'عملیات حذف این کاربر با موفقیت انجام شد')
        res.redirect('/dashboard/Users')
    }

    async GetEditUser(req,res){
        //TODO Fix id On Querys
        let data = await UTILS.get('User',{"_id" : req.params.id})
        res.render('Users/getUser' , {data : data[0], type : "Edit"})
    }

    async PostEditUser(req,res){
        await UTILS.set('User' , {"_id" : req.params.id} , req.body)
        res.redirect('/dashboard/Users')
    }
}

module.exports = new UsersController