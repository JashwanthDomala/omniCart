const express = require("express")
const app = express()
const adminRouter = require("./routers/admin.router")
const publicRouter = require("./routers/public.router")
const vendorRouter = require("./routers/vendor.router")
const buyerRouter = require("./routers/buyer.router")
const authenticate = require("./middlewares/authenticate")
const cookieParser  = require("cookie-parser")


app.use(express.json())
app.use(cookieParser())

app.use(authenticate())

app.use("/" , publicRouter)
app.use("/admin",adminRouter)
app.use("/vendor",vendorRouter)
app.use("/",buyerRouter)


module.exports = app
