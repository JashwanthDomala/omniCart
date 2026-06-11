
// port
try{
    exports.port = process.env.PORT
}catch (error){
    console.log("port is not mentioned in env " + error )
}

//mongo_uri
try{
    exports.mongoURI = process.env.MONGODB_URI;
}catch(error){
    console.log("mongo uri is not mentioned in env");
}

// jwt
try{
    exports.jwt_access_secret = process.env.JWT_ACCESS_SECRET
    exports.jwt_refresh_secret = process.env.JWT_REFRESH_SECRET
}catch{
    console.log("jwt secret not found in env")
}