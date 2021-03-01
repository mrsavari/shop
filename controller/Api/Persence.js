const moment = require('moment');
const momentJalali = require('moment-jalaali');
const autobind = require('auto-bind');
const sendSms = require("helpers/sms")

class Persence {
	constructor() {
		this.Response = [];
		autobind(this);
	}

	addToResponse(data) {
		this.Response.push(data);
	}

	async getPersences(req, res) {
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
			if (!result) this.addToResponse({ date : Days[i].dateJalali , status: 'Closed' , dayName : Days[i].dayName});
			else {
				result.status = 'Open';
				this.addToResponse({
					date : result.date , 
					dayName : result.dayName ,
					times : result.times , 
					status : "Open"
				});
			}
		}

		FUNC.ApiResponse(res, 200, CONSTANT.Success(''), this.Response);
		this.Response = [];
	}

	async reservePersence(req, res) {
		let Token = req.cookies.Token || req.headers.token;
		const searchResult = await UTILS.getOne('Persence', { date: req.body.date });
		if (!searchResult) {
			FUNC.ApiResponse(res, 200, 'این تایم در سیستم ثبت نشده است');
		} else {
			if (searchResult.times.indexOf(req.body.time) >= 0) {
				FUNC.ApiResponse(res, 200, 'این تایم قبلا رزرو شده است');
			} else {
				let time = searchResult.times;
				time.push(req.body.time);
				await UTILS.new("Reserve" , {
					userId : Token.userId,
					reservedDate : req.body.date , 
					reservedTime : req.body.time
				})
				await UTILS.set('Persence', { date: req.body.date }, { times: time });
				CONFIG.sendSMS.NewOrder == true ? (sendSms.SendSMS(req.token.uPhoneNumber , `${req.body.date};${req.body.time.toString()}` , '16887')) : ('')
				FUNC.ApiResponse(res, 200, CONSTANT.Success(''));
			}
		}
	}
}

module.exports = new Persence();
