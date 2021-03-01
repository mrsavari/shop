const autobind = require('auto-bind')
const momentJalali = require('moment-jalaali')
const moment = require('moment')
const _ = require('underscore')

class PersenceController {
    constructor(){
        autobind(this)
        this.Response = []
    }

    async getPersences(req,res){
        const OneDayLaterAd = moment(new Date()).add(1, 'd')._d,
			TwoDayLaterAd = moment(OneDayLaterAd).add(1, 'd')._d,
			ThreeDayLaterAd = moment(OneDayLaterAd).add(2, 'd')._d;

		let Days = [
			{dateJalali : momentJalali(OneDayLaterAd).format('jYYYY/jMM/jDD') , dayName : momentJalali(OneDayLaterAd).format('dddd')},
			{dateJalali : momentJalali(TwoDayLaterAd).format('jYYYY/jMM/jDD') , dayName : momentJalali(TwoDayLaterAd).format('dddd')},
			{dateJalali : momentJalali(ThreeDayLaterAd).format('jYYYY/jMM/jDD') , dayName : momentJalali(ThreeDayLaterAd).format('dddd')}
		];

		for (let i = 0; i < 3; i++) {
			let result = await UTILS.getOne('Persence', { date: Days[i].dateJalali });
			if (!result) this.Response.push({ date : Days[i].dateJalali , status: 'Closed' , dayName : Days[i].dayName})
			else {
                result.status = 'Open';
                this.Response.push({
                    id : result._id , 
					date : result.date , 
					dayName : result.dayName ,
					times : result.times , 
					status : "Open"
				})
			}
        }
        res.render("Persences/getPersences" , {Persences : this.Response})
        this.Response = []
    }

    async delPersence(req,res) {
        await UTILS.delOne("Persence" , {_id : req.params.id})
        FUNC.Redirect(req , res , '/dashboard/Persences' , CONSTANT.Success('') , 'success') 
    }

    async addPersences(req,res){
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

        FUNC.Redirect(req , res , '/dashboard/Persences' , CONSTANT.Success('') , 'success') 
    }
}

module.exports = new PersenceController