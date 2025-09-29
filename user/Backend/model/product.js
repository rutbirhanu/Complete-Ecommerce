const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    price: String,
    brand: String,
    image:String
}
)

module.exports= mongoose.model("productSchema", productSchema)