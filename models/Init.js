const initData = require('config/initData')
const autobind = require('auto-bind')
const moment = require('moment')
const momentJalali = require('moment-jalaali')
const _ = require('underscore')

class DataInitializer {
    constructor(){
        autobind(this)
        this.init()
    }

    async init(){
        
        initData.user.forEach(async user => {
            console.log(await UTILS.new("User" , user))
        })

        initData.admin.forEach(async admin => {
            console.log(await UTILS.new("Admin" , admin))
        })

        initData.product.forEach(async product => {
            console.log(await UTILS.new("Product" , product))
        })

        initData.order.forEach(async order => {
            console.log(await UTILS.new("Order" , order))
        })

        initData.payment.forEach(async payment => {
            console.log(await UTILS.new("Payment" , payment))
        })

        initData.usesIntroduce.forEach(async usesIntroduce => {
            console.log(await UTILS.new("UsesIntroduce" , usesIntroduce))
        })

        initData.usesIntroduce.forEach(async usesIntroduce => {
            console.log(await UTILS.new("UsesIntroduce" , usesIntroduce))
        })

        initData.requestProduct.forEach(async requestProduct => {
            console.log(await UTILS.new("RequestProduct" , requestProduct))
        })

        initData.category.forEach(async category => {
            console.log(await UTILS.new("Categories" , category))
            REDIS.hmset('categories' , category.EnglishName , category.PersianName)
        })

        initData.categoryChild.forEach(async categoryChild => {
            console.log(await UTILS.new("CategoryChild" , categoryChild))
            REDIS.hmset("childs", categoryChild.EnglishName , categoryChild.father );
        })

        initData.provider.forEach(async provider => {
            console.log(await UTILS.new("Provider" , provider))
        })

        initData.comment.forEach(async comment => {
            console.log(await UTILS.new("Comment" , comment))
        })

        initData.brand.forEach(async brand => {
            console.log(await UTILS.new("Brand" , brand))
            REDIS.hmset('brands' , brand.name , brand.persianName)
            brand.category.forEach(cat => {
                REDIS.get(`${cat}_brands` , (err , result) => {
                    if(!result) REDIS.set(`${cat}_brands` , brand.name)
                    else REDIS.set(`${cat}_brands` , result + ' , ' + brand.name)
                })
            })
        })

        initData.page.forEach(async page => {
            console.log(await UTILS.new("Page" , page))
        })

        this.initPersence()

        console.log(await UTILS.new('Slider' , initData.slider))

    }

    initPersence(firstDay = new Date()){
        const OneDayLaterAd = moment(firstDay).add(1 , 'd')._d , 
            TwoDayLaterAd = moment(OneDayLaterAd).add(1 , 'd')._d ,
            ThreeDayLaterAd = moment(OneDayLaterAd).add(2 , 'd')._d

        let DaysDay = [
            { dayName : momentJalali(OneDayLaterAd).format('dddd') , dateJalali : momentJalali(OneDayLaterAd).format('jYYYY/jMM/jDD') , dateAd : OneDayLaterAd } ,
            { dayName : momentJalali(TwoDayLaterAd).format('dddd') , dateJalali : momentJalali(TwoDayLaterAd).format('jYYYY/jMM/jDD') , dateAd : TwoDayLaterAd } ,
            { dayName : momentJalali(ThreeDayLaterAd).format('dddd') , dateJalali : momentJalali(ThreeDayLaterAd).format('jYYYY/jMM/jDD') , dateAd : ThreeDayLaterAd}    
        ]
        
        DaysDay = _.filter(DaysDay , function(day) { return day.dayName !== "Friday" })

        _.forEach(DaysDay , async day => {
            const dayResult = await UTILS.getOne("Persence" , {date : day.dateJalali})
            if(!dayResult) {
                await UTILS.new('Persence' , {date : day.dateJalali , dayName : day.dayName })
                LOGGER.info(`${day.dateJalali} Created in Database`)
            } else LOGGER.warn(`${day.dateJalali} Alerdy Added in Database`)
        })
    }

}

module.exports = DataInitializer