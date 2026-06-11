require("dotenv").config()
const app = require("./src/app")
const connectDB = require("./src/config/db")
const { port } = require("./src/config/env")
const dns = require("dns")
dns.setServers(['1.1.1.1','8.8.8.8'])

connectDB()

app.listen(port,()=>{
    console.log("server is running in port : "+ port)
})