class Helper {
	CheckToken(req, res) {
		let Token = '';
		CONFIG.isApi !== undefined
			? (Token = req.headers.token || req.headers.limitedToken)
			: (Token = req.cookies.limitedToken || req.cookies.Token);
		if (Token) {
			FUNC.decodeJWT(Token, (err, decodedToken) => {
				if (err) return FUNC.ApiResponse(res, 401, CONSTANT.AccessDenied);
				else {
					FUNC.ApiResponse(res, 200, 'توکن شما معتبر می باشد', decodedToken.data);
				}
				if (err) return FUNC.ApiResponse(res, 401, CONSTANT.AccessDenied);
			});
		} else FUNC.ApiResponse(res, 401, CONSTANT.AccessDenied);
	}
}

module.exports = new Helper();
