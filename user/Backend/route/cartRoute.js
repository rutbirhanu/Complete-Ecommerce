const express = require("express")
const {getUserCart, updateCart, addToCart,increaseItemAmount, decreaseItemAmount} = require("../controller/cartController")
const router = express.Router()
const verifyToken= require("../middleware/verifyToken")

router.route("/get-user-cart").get(verifyToken, getUserCart)
router.route("/update-cart").put(updateCart)
router.route("/increase-quantity").put(increaseItemAmount)
router.route("/decrease-quantity").put(decreaseItemAmount)
router.route("/add-to-cart").post(verifyToken, addToCart)

module.exports= router