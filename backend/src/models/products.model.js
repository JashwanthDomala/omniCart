const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true,
        trim : true,
        lowercase : true,
        minlength : 4,
        unique : true
    },
    description :{
        type : String,
        trim : true,
        maxlength : [150, "the discription should only contain character upto 150"]
    },
    vendor_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    reviews : [{
        user_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        description : {
            type : String,
            maxlength : [150,"the discription should only contain character upto 150"],
            trim : true,
        }
    }],
    count : {
        type : Number,
        min : [0,"Count can not be negetive"],
        default : 0
    },
    price : {
        type : Number,
        min : [0,"Price cannot be negitive"],
    },
    discount : {
        type : Number,
        min : [0,"Discount can not be negetive"],
        max : [100,"you can not give more than 100% discount "]
    },
    category: {
        type: String,
        required: true,
        enum: [
            "electronics",
            "fashion",
            "books",
            "home",
            "sports",
            "beauty",
            "grocery"
        ]
    },
    image_url : {
        type : String ,
        default :"https://i.pinimg.com/736x/f5/e3/9b/f5e39b4d6b6dcd0ddb5c5d26b1e84ca5.jpg"
    }
},{
    timestamps : true
})

const productModel = mongoose.model("Product",ProductSchema);

module.exports = productModel