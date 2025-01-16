const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    price: String,
    brand: String,
    image: Array   
}
)

module.exports= mongoose.model("productSchema", productSchema)