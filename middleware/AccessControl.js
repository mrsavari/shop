module.exports = {
    handle : (req,res,next) => {
        const path = req.path.toString().replace('/' , '')
        const roles = req.user.role
        if(roles.indexOf(path) >= 0 || roles.indexOf('All') >= 0) next()
        else FUNC.Handle403(res)
    }
}