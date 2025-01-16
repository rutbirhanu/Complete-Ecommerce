const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    userId: String,
    items: Array,
    total: Number,
    address: String,
    status: { type: String, default:"Order Placed" },
    payment: { type: Boolean, default: false },
    date:Number
})

module.exports = mongoose.model("orderSchema", orderSchema)