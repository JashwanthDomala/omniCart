function authBasedOnRole(...allowedRoles){
    return (req,res,next) => {
        if(!req.isAuth){
            return next("unAuthenticated")
        }
        if(!allowedRoles.includes(req.role)){
            return next("unAuthorized")
        }
        next()
    }
}

module.exports = authBasedOnRole