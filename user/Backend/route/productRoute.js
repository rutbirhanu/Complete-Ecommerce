const express = require("express")
const upload= require("../middleware/multer")
const { addProduct, sendNotification, allProducts, updateProduct, deleteProduct, fetchSingleProduct } = require("../controller/productController")

const router = express.Router()

router.route("/notification").post(sendNotification)


//admin route
router.route("/all-products").get(allProducts)
router.route("/get-product/:productId").get(fetchSingleProduct)
router.route("/update-product/:productId").put(upload.single("image"),updateProduct)
router.route("/delete-product/:productId").delete(deleteProduct)
router.route("/add-product").post(upload.single("image"), addProduct)


module.exports = router