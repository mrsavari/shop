const smsHelper = require('helpers/sms');
const bcryptHelper = require('helpers/bcrypt');
const bcrypt = require('bcrypt');
class Authentication {
	async login(req, res) {
		let phoneNumber = FUNC.zeroValidator(req.body.uPhoneNumber);
		let user = await UTILS.get('User', { uPhoneNumber: phoneNumber });
		if (!user || !user[0])
			FUNC.ApiResponse(res, 404, 'کاربری با این مشخصات یافت نشد (User Or Pass is Correct)');
		else {
			bcrypt.compare(req.body.uPassword, user[0].uPassword, (errs, resultOfPassword) => {
				if (errs || !resultOfPassword)
					FUNC.ApiResponse(
						res,
						403,
						'کاربری با این مشخصات یافت نشد (User Or Pass is Correct)'
					);
				else {
					FUNC.jwtSign(
						{
							userId: user[0]._id,
							uName: user[0].uName,
							uLastName: user[0].uLastName,
							uPhoneNumber: user[0].uPhoneNumber,
							Status: user[0].uStatus,
						},
						(err, jwt) => {
							if (err) FUNC.ApiResponse(res, 500, CONSTANT.Failure('ورود'));
							else {
								// REDIS.set(`token_${user[0]._id}` , jwt , 'EX' , CONFIG.expireTime)
								FUNC.ApiResponse(res, 200, CONSTANT.Success('ورود'), {
									Token: jwt,
								});
							}
						}
					);
				}
			});
		}
	}

	async register(req, res) {
		req.body.SmsCode = smsHelper.CreateCode();
		req.body.uPhoneNumber = FUNC.zeroValidator(req.body.uPhoneNumber);
		FUNC.jwtSign(
			{ uPhoneNumber: req.body.uPhoneNumber, Status: 'verifying' },
			async (err, Token) => {
				req.body.RegisterToken = Token;
				await UTILS.new('User', req.body);
				CONFIG.sendSMS.Register
					? smsHelper.SendSMS(req.body.uPhoneNumber , req.body.SmsCode , '16882')
					: '';
				FUNC.ApiResponse(res, 200, CONSTANT.Success('ثبت نام'), { limitedToken: Token });
			}
		);
	}

	async Verify(req, res) {
		let Token = req.cookies.limitedToken || req.headers.limitedtoken;
		let user = await UTILS.get('User', { RegisterToken: Token });
		user = user[0];
		if (!user) FUNC.ApiResponse(res, 404, CONSTANT.Failure('تایید شماره تلفن'));
		else if (user.SmsCode === req.body.SmsCode) {
			if (user.AuthenticationStatus === 'Verifyed')
				FUNC.ApiResponse(res, 200, CONSTANT.AlerdyAccepted);
			else {
				await UTILS.set(
					'User',
					{ _id: user._id },
					{ uStatus: true, AuthenticationStatus: 'Verifyed' }
				);
				FUNC.jwtSign(
					{
						userId: user._id,
						uName: user.uName,
						uLastName: user.uLastName,
						uPhoneNumber: user.uPhoneNumber,
						Status: 'Verifyed',
					},
					(err, jwt) => {
						// REDIS.set(`token_${user[0]._id}` , jwt , 'EX' , CONFIG.expireTime)
						FUNC.ApiResponse(res, 200, CONSTANT.Success('تایید شماره تلفن'), {
							Token: jwt,
						});
					}
				);
			}
		} else FUNC.ApiResponse(res, 201, CONSTANT.Failure(''));
	}

	async ChangePassword_SendSms(req, res) {
		req.body.SmsCode = smsHelper.CreateCode();
		const phoneNumber = FUNC.zeroValidator(req.body.uPhoneNumber);
		let UpdateResult = await UTILS.set(
			'User',
			{ uPhoneNumber: phoneNumber },
			{ SmsCode: req.body.SmsCode }
		);
		if (UpdateResult.ok === 1) {
			FUNC.jwtSign(
				{ uPhoneNumber: phoneNumber, Status: 'confirming' },
				async (err, Token) => {
					await UTILS.set(
						'User',
						{ uPhoneNumber: phoneNumber },
						{ ForgotPasswordToken: Token }
					);
					CONFIG.sendSMS.ForgotPassword
						? smsHelper.SendSMS(
								req.body.uPhoneNumber,
								req.body.uPhoneNumber,
								'ForgotPass BodyId'
						  )
						: '';
					FUNC.ApiResponse(res, 200, CONSTANT.Success('ارسال کد'), {
						limitedToken: Token,
					});
				}
			);
		} else FUNC.ApiResponse(res, 404, 'کاربری با این شماره تلفن یافت نشد');
	}

	async ChangePassword_Verify(req, res) {
		const Token = req.cookies.limitedToken || req.headers.limitedtoken;
		let user = await UTILS.get('User', { ForgotPasswordToken: Token });
		user = user[0];
		if (user && user.SmsCode === req.body.SmsCode) {
			await UTILS.set('User', { _id: user._id }, { uStatus: true });
			FUNC.ApiResponse(res, 200, CONSTANT.Success('تایید'));
		} else FUNC.ApiResponse(res, 404, CONSTANT.Failure('تایید'));
	}

	async ChangePassword_CheckTokenAndSetPass(req, res) {
		req.body.limitedToken = req.headers.limitedtoken || req.cookies.limitedToken;
		let { NewPassword, limitedToken } = req.body;
		let user = await UTILS.get('User', { ForgotPasswordToken: limitedToken });
		user = user[0];

		if (!user) FUNC.ApiResponse(res, 404, CONSTANT.Failure('تغییر رمز عبور'));
		else {
			bcryptHelper.encrypt(NewPassword, async (err, hashed) => {
				await UTILS.set(
					'User',
					{ ForgotPasswordToken: limitedToken },
					{ uPassword: hashed, ForgotPasswordToken: '' }
				);
				FUNC.ApiResponse(res, 200, CONSTANT.Success('تغییر رمز عبور'));
			});
		}
	}
}

module.exports = new Authentication();
