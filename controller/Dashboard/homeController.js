const bcrypt = require('bcrypt')
const fs = require('fs')
const os = require('os')
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

class homeController {

    async getDashboard(req,res){
        const Total = (( os.freemem() / 1024 ) / 1024 ) / 1024 , 
        usageRam = Total.toString().substr(0 , 4) ,
        WeekUsers = await UTILS.get("User" , {
            RegistredAt : {
                $gte: moment().day(-7)._d,
                $lt: moment()._d}
        }) ,
        WeekOrders = await UTILS.get("Order" , {ReciveDate : moment()._d}),
        RequestProduct = await UTILS.get('RequestProduct' , {Date : moment()._d})
        res.render('dashboard' , {usageRam , WeekUsers , WeekOrders , RequestProduct} )
    }

    login(req,res){res.render('login' , {layout : 'publicMaster'})}

    async loginPost(req,res){
        let admin = await UTILS.getOne('Admin' , {"username" : req.body.username})
        if(!admin) { req.flash('error' , 'کاربری با این اطلاعات یافت نشد'); res.redirect('/'); return ; }
        bcrypt.compare(req.body.password , admin.password , (errs , resultOfPassword) => {
            if(errs || !resultOfPassword) {
                req.flash('error' , 'کاربری با این اطلاعات یافت نشد')
                res.redirect('/')
            } else {
                FUNC.jwtSign(FUNC.Reformaters.Administrator(admin) , (err , token) => {
                    res.cookie("PortalToken" , token)
                    res.redirect('/dashboard')
                })
            }
        })
    }
}

module.exports = new homeController