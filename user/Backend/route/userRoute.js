const express = require("express")
const router = express.Router()
const { SignUp, LogIn, SignInWithGoogle, GetAllUsers } = require("../controller/userController")
const verifyGoogleToken= require("../middleware/verifyGoogleToken")


router.route("/sign-up").post(SignUp)
router.route("/login").post(LogIn)
router.route("/signWithGoogle").post(verifyGoogleToken, SignInWithGoogle)

//admin route
router.route("/get-all-users").get(GetAllUsers)

module.exports= router