const mongoose = require("mongoose")
const {mongoURI} = require("./env")
async function connectDB(){
    try{
        await mongoose.connect(mongoURI);
        console.log("Db connected successfully")
    }catch(error){
        console.log("failed to connect DB " + error)
    }
}

module.exports = connectDB