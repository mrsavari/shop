const express = require('express')
const app = express()
const http = require('http')
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')
const globalVariable = require('config/globalVariable')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const Cronjob = require('cron').CronJob
const fs = require('fs')
const https = require('https')
const _ = require('underscore')

const moment = require('moment')
const momentJalali = require('moment-jalaali')

const schedule = require('node-schedule')

const privatekey = fs.readFileSync('bin/ssl/server.key' , 'ascii')
const certificate = fs.readFileSync('bin/ssl/server.cert' , 'ascii')

const credential = {
    key: privatekey ,
    cert: certificate
};
  

class Application{
    constructor(){
        this.serverConfigure()
        this.dbConfigure()
        this.expressConfigure()
        this.RouteAndErrorConfigure()
        this.ConfigureSchedule()
        LOGGER.info(`FullName : ${CONFIG.fullName}`)
    }

    ConfigureSchedule(){
        const persenceSchedule = schedule.scheduleJob({hour: CONFIG.Schedule.Persence[0] , minute: CONFIG.Schedule.Persence[1]} , async () => {
            LOGGER.info(`Time : ${CONFIG.Schedule.Persence[0]}:${CONFIG.Schedule.Persence[1]} And PersenceSchadule Worked`)
            const OneDayLaterAd = moment(new Date()).add(1 , 'd')._d , 
                TwoDayLaterAd = moment(OneDayLaterAd).add(1 , 'd')._d ,
                ThreeDayLaterAd = moment(OneDayLaterAd).add(2 , 'd')._d

            let DaysDay = [
                { dayName : momentJalali(OneDayLaterAd).format('dddd') , dateJalali : momentJalali(OneDayLaterAd).format('jYYYY/jMM/jDD') , dateAd : OneDayLaterAd } ,
                { dayName : momentJalali(TwoDayLaterAd).format('dddd') , dateJalali : momentJalali(TwoDayLaterAd).format('jYYYY/jMM/jDD') , dateAd : TwoDayLaterAd } ,
                { dayName : momentJalali(ThreeDayLaterAd).format('dddd') , dateJalali : momentJalali(ThreeDayLaterAd).format('jYYYY/jMM/jDD') , dateAd : ThreeDayLaterAd}    
            ]

            //TakeOut Friday From Those Days
            DaysDay = _.filter(DaysDay , function(day) { return day.dayName !== "Friday" })

            _.forEach(DaysDay , async day => {
                const dayResult = await UTILS.getOne("Persence" , {date : day.dateJalali})
                if(!dayResult) {
                    await UTILS.new('Persence' , {date : day.dateJalali , dayName : day.dayName })
                    LOGGER.info(`${day.dateJalali} Created in Database`)
                } else LOGGER.warn(`${day.dateJalali} Alerdy Added in Database`)
            })
        });
    }

    async dbConfigure(){
        mongoose.connect(CONFIG.mongoDB,
        {useNewUrlParser:true,useUnifiedTopology:true})
        mongoose.set('useFindAndModify', false);
        LOGGER.info(`Mongoose : ${CONFIG.mongoDB}`)
    }

    serverConfigure(){
        // app.listen(
        //     CONFIG.port ,
        //     CONFIG.host ,
        //     ()=>{LOGGER.info(`App Started On Api Mod , http://${CONFIG.host}:${CONFIG.port}`)})
        // http.createServer(app);

        https.createServer(credential , app).listen(4750 , CONFIG.host)
        LOGGER.info(`App Started On Production Mod , https://${CONFIG.host}:${CONFIG.port}`)   
    }

    expressConfigure(){
        app.set('view engine' , 'ejs')
        app.use(session({
            secret:'mysecretkey',
            resave:true,
            saveUninitialized:true,
            cookie:{maxAge:3600000}
        }))
        app.use(cookieParser('mysecretkey'))
        app.use(flash())
        app.use(bodyParser.urlencoded({extended : true}));
        app.use(bodyParser.json())
        app.use((req,res,next)=>{
            app.locals = new globalVariable(req,res,next)
            next()
        })
        app.set('views' , './views')
        app.use(express.static('public'))
        app.use(expressLayout)
        app.set('layout','master')
        app.set("layout extractScripts",true)
        app.set("layout extractStyles", true)
    }

    RouteAndErrorConfigure(){
        app.use(require('../routes'))
        // app.all('*' , (req,res) => FUNC.ApiResponse(res , 500 , CONSTANT.RouteNotFound))
        // app.use(function (err, req, res, next) {
        //     LOGGER.error(err)
        //     FUNC.ApiResponse(res , 500 , CONSTANT.InternalErrorMessage)})
    }

    Initialize(){
        FUNC.initData()
    }

    ConfigureYargs(arg){
        CONFIG.isApi = true
    }
}

module.exports = Application