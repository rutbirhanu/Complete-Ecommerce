const mongoose = require("mongoose")

const user = mongoose.Schema({
    password: String,
    email: String,
    fmcToken:String,
    cartData: { type:Object, default:{}}
})

module.exports = mongoose.model("userModel", user) 