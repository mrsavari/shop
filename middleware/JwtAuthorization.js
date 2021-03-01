module.exports = {
	handle(req, res, next) {
		let Token;
		CONFIG.isApi !== undefined ? (Token = req.headers.token) : (Token = req.cookies.Token);
		if (Token) {
			REDIS.hget('token_blacklist' , Token , (err , reply) => {
				FUNC.decodeJWT(Token, (err, decodedToken) => {
					if (err || reply){
						LOGGER.warn('a user tried With BlackList Token')
						return FUNC.ApiResponse(res, 401, CONSTANT.AccessDenied);
					} else {
						req.token = decodedToken.data;
						next();
					}
				});
			})
		} else {
			LOGGER.warn('User Token is null');
			FUNC.ApiResponse(res, 401, CONSTANT.AccessDenied);
		}
	},
};
