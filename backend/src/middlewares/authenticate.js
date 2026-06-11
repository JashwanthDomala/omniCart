const jwt = require("jsonwebtoken") 
const {jwt__access_secret , jwt_refresh_secret} = require("../config/env")
const userModel = require("../models/users.model")

async function authenticate(req,res,next){
    
    try{
        const accessToken = req.header("Authorization");
        if(!accessToken){
           return await assignAccessToken(req,res,next)
        }else{
            const {user_id} = jwt.verify(accessToken,jwt_access_secret)
            const user = await userModel.findOne({
                _id : user_id
            },{role : 1 , _id : 0})
            
            if(!user){
                req.isAuth = false;
                return next()
            }

            req.isAuth = true
            req.role = user.role
            return next();
        }
    }catch(error){
        return next(error);
    }

}

async function assignAccessToken(req,res,next){
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) {
            req.isAuth = false
            return next()
        }
        const {user_id} = jwt.verify(refreshToken,jwt_refresh_secret);

        const user = await userModel.findOne({
            _id : user_id
        },{role : 1, _id : 0,activeRefreshTokens : 1})


        if(!user || !user.activeRefreshTokens.includes(refreshToken)){
            req.isAuth = false;
            return next()
        }

        const accessToken = jwt.sign({
            user_id
        },jwt_access_secret,{
            expiresIn : "15m"
        })

        req.isAuth = true,
        req.role = user.role,
        res.setHeader('access-token' , accessToken)
        return next();
    }catch(error){
        return next(error)
    }
}

module.exports = authenticate