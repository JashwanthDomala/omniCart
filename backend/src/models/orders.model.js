const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    product_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required : true
    },
    buyer_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    status : {
        type :String ,
        enum : ["pending","shipped","delivered","failed"],
        default : pending
    },
    payment_type : {
        type : String,
        enum : ["online","cash-on-delivery"],
        required : true
    },
    payment_status : {
        type : String,
        enum : ["pending","completed","failed"],
        default : "pending"
    }
},{
    timestamps : true
})

const oderModel = mongoose.model("Order",OrderSchema)

module.exports = orderModel