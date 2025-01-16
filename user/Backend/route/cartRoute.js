const express = require("express")
const {getUserCart, updateCart, addToCart } = require("../controller/cartController")
const router = express.Router()
const verifyToken= require("../middleware/verifyToken")

router.route("/get-user-cart").get(verifyToken, getUserCart)
router.route("/update-cart").put(updateCart)
router.route("/add-to-cart").post(verifyToken, addToCart)

module.exports= router