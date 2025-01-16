const express = require("express")
const upload= require("../middleware/multer")
const { addProduct, sendNotification, allProducts, updateProduct, deleteProduct } = require("../controller/productController")

const router = express.Router()

router.route("/notification").post(sendNotification)


//admin route
router.route("/all-products").get(allProducts)
router.route("/update-product/:productId").put(updateProduct)
router.route("/delete-product/:productId").delete(deleteProduct)
router.route("/add-product").post(upload.single("image"), addProduct)


module.exports = router