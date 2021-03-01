let wholeObject = {}

const User = require('models/Users')
const Admin = require('models/Admin')
const Product = require('models/Products')
const Order = require('models/Orders')
const Payment = require('models/Payment')
const UsesIntroduce = require('models/UsesIntroduce')
const RequestProduct = require('models/RequestProduct')
const Categories = require('models/Categories')
const CategoryChild = require('models/CategoryChild')
const Provider = require('models/Providers')
const Comment = require('models/Comments')
const Brand = require('models/Brands')
const Role = require('models/Roles')
const Page = require('models/Page')
const Slider = require('models/Slider')
const Persence = require('models/Persence')
const Reserve = require('models/Reserves')

//-------[Features_Electronic_Devices]-----------
const Accessories = require('models/features/Electronic_Devices/Accessories')
const GameConsole = require('models/features/Electronic_Devices/GameConsole')
const Laptop = require('models/features/Electronic_Devices/Laptop')
const Mobile = require('models/features/Electronic_Devices/Mobile')

//-------[Features_Home_Appliances]-----------
const Carpet = require('models/features/Home_Appliances/Carpet')
const Furniture = require('models/features/Home_Appliances/Furniture')
const Refrigerator = require('models/features/Home_Appliances/Refrigerator')
const Television = require('models/features/Home_Appliances/Television')

Object.assign(wholeObject , {User , Admin , Product , Order , Payment , UsesIntroduce ,
    Role , RequestProduct , Categories , CategoryChild , Comment , Provider , Brand , Accessories , Reserve ,
    GameConsole , Laptop , Mobile , Carpet , Furniture , Refrigerator , Television , Page , Slider , Persence})


module.exports = {
    get : async (db , params = {} , option = {}) => {
        try { 
            return await wholeObject[db].find(params,option)
        } catch (e) { 
            LOGGER.error('Error In UTILS [1]')
            throw new Error(e) }
    } ,

    getOne : async (db , params = {} , option = {}) => {
        try { 
            return await wholeObject[db].findOne(params,option)
        } catch (e) {
            LOGGER.error('Error In UTILS [2]')
            throw new Error(e) }
    } ,

    set : async (db , query , set) => {
        try { 
            return await wholeObject[db].updateOne(query , set , (e , result) => {if(e || result.ok != 1) throw e} )
        } catch (e) { 
            LOGGER.error('Error In UTILS [3]')
            throw new Error(e) }
    } ,

    new : async (db , params ) => {
        try {
            return await new wholeObject[db](params).save()
        } catch (e) { 
            LOGGER.error('Error In UTILS [4]')
            throw new Error(e) }
    },

    delOne : async (db , query) => {
        try {
            return await wholeObject[db].deleteOne(query)
        } catch (e) { 
            LOGGER.error('Error In UTILS [5]')
            throw new Error(e) }
    } ,

    paginate : async ( db , option = {}, params = {})=>{
        try { 
            return await wholeObject[db].paginate(params,option)
        } catch (e) { 
            LOGGER.error('Error In UTILS [6]')
            throw new Error(e) }
    } ,

    populate : async (db , query = {} , params) => {
        try { 
            return await wholeObject[db].find(query).populate(params)
        } catch (e) { 
            LOGGER.error('Error In UTILS [7]')
            throw new Error(e) }
    } ,


    getAndSet : async (db , query , update) => {
        try { 
            return await wholeObject[db].findOneAndUpdate(query , update)
        } catch (e) { 
            LOGGER.error('Error In UTILS [8]')
            throw new Error(e) }
    } ,

    sMembers : async (key) => {
        try { 
            return await REDIS.smembers(key , (err , result) => {return result})
        } catch (e) { 
            LOGGER.error('Error In UTILS [9]')
            throw new Error(e) }
    } ,

    createPersences : () => {
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
    } ,
}