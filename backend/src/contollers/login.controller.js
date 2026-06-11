const {jwt_access_secret , jwt_refresh_secret} = require("../config/env");
const jwt = require("jsonwebtoken")
const userModel = require("../models/users.model")
const bcrypt = require("bcrypt")

exports.register  = async (req,res) =>{
    try {
        const {userName, phoneNumber ,role, password} = req.body;
        const user = new userModel({
            userName,
            phoneNumber,
            hashedPassword : password,
            role
        })
        await user.validate()

        const salt = await bcrypt.genSalt(10);
        user.hashedPassword = await bcrypt.hash(password,salt);

        await user.save()
        return res.status(201).json({message : "user registered successfully "})

    }catch(error){
        console.log(error)
        return res.status(400).json({
            message : error.message
        })
    }
}

exports.login = async (req,res) =>{
    try{
        const {userName , password} = req.body
        if(!userName || !password) {
            return res.status(400).json({message : "both username and password are required"})
        }
        const user = await userModel.findOne({userName})
        if(!user) return res.status(400).json({message : "user invalid "})
        
        const isMatch = await bcrypt.compare(password,user.hashedPassword);

        if(!isMatch){
            return res.status(400).json({message : "incorrect password"})
        }
        const accessToken =  generateAccessToken(user._id);
        const refreshToken =  generateRefreshToken(user._id);
        
        user.activeRefreshTokens.push(refreshToken);
        await user.save()


        req.cookie("refresh-token" , refreshToken,{
            secure : process.env.NODE_ENV === "production",
            httpOnly : true,
            sameSite : "strict",
            maxAge : 7*24*60*60*1000
        })

        return res.status(200).json({
            success : true,
            message : "login successull",
            accessToken
        })
    }catch(error){
        return res.status(500).json({message : error.message})
    }
}

const generateAccessToken =  (user_id) =>{
    return  jwt.sign({user_id : user_id },jwt_access_secret,{expiresIn : "15m"})
} 
const generateRefreshToken = (user_id) => {
    return jwt.sign({user_id : user_id} , jwt_refresh_secret,{expiresIn : "7d"})
}