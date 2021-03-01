const options = require('config/pageOptions')
module.exports = {
    handle(req,res,next){
        let Token = req.cookies.PortalToken,
        path = req.path;
        path.replace(/^(.+?)(\/)/ , (m , g1 , g2) => {path = g1})
        let fPath = path.substring(1)
        if(Token) { 
            FUNC.decodeJWT(Token , (err , decodedToken) => {
                if(err) return FUNC.ApiResponse(res , 401 , CONSTANT.AccessDenied)
                req.user = decodedToken.data
                req.app.locals.adminFullName = decodedToken.data.fullname
                req.app.locals.adminThumbnail = decodedToken.data.thumbnail
                req.app.locals.adminRole = decodedToken.data.role
                REDIS.get('commentCounts' , (err , reply) => {
                    req.app.locals.commentCounts = reply || 'err'
                })
                if(!options[fPath]) fPath = 'Users'
                req.app.locals.pageTitle = options[fPath].title
                req.app.locals.countTitle = options[fPath].countTitle || ''
                req.app.locals.row = options[fPath].row || ''
                next()
            })
        } else FUNC.ApiResponse(res , 401 , CONSTANT.AccessDenied)
    }
}