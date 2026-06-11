const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    userName : { 
        type : String,
        required : [true, "The User Name is missing"],
        unique : true,
        trim : true
    },
    phoneNumber : {
        type : String,
        required : true,
        match : [/^[6-9]\d{9}$/, "phone number is not valid indian number "],
        unique : true
    },
    hashedPassword : {
        type : String,
        required : true,
        select : false
    },
    role : {
        type : String,
        enum : ["admin", "vendor" ,"buyer"],
        required : true,
    },
    activeRefreshTokens : {
        type : [String],
        default : []
    },
    profilePicture : {
        type : String,
        default : "https://i.pinimg.com/736x/68/fe/3e/68fe3eb79513b33c207d126f89834166.jpg"
    }
},{
    timestamps : true
})

const userModel =  mongoose.model("User",UserSchema);

module.exports = userModel;