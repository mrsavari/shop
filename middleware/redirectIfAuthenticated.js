
module.exports = {
    handle(req,res,next){
        if(req.cookies.PortalToken){
            const Token = req.cookies.PortalToken
            FUNC.decodeJWT(Token , (err , decodedToken) => {
                if(!err) {
                    res.redirect('/dashboard') 
                }
            })
        } 
        else next()
    }
}