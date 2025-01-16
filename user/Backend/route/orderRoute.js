const express = require("express")
const { createCheckOut, verifyStripe, userOrder, allOrders, getOrders } = require("../controller/orderController")
const verifyToken = require("../middleware/verifyToken")

const router = express.Router()

router.route("/checkout").post(verifyToken, createCheckOut)
router.route("/verify").post(verifyToken, verifyStripe)
router.route("/user-order").post(verifyToken, userOrder)

//admin route
// router.route("/all-orders").get(allOrders)
router.route("/all-orders").get(getOrders)

module.exports= router