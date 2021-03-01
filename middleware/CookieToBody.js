module.exports = {
    handle(req,res,next){ 
        if(req.cookies.Token) req.body.Token = req.cookies.Token
        if(req.cookies.limitedToken) req.body.limitedToken = req.cookies.limitedToken
        if(req.headers.limitedToken) req.body.limitedToken = req.headers.limitedToken
        if(req.headers.limitedToken) req.body.limitedToken = req.headers.limitedToken
        next();
    }
}