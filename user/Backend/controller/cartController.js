require("dotenv").config()
const userModel = require("../model/user")


const addToCart = async (req, res) => {
  try {
    const {userId}=req.user
    const { itemId} = req.body
    const user = await userModel.findById(userId)
    let cartData = await user.cartData

    if (cartData[itemId]) {

      cartData[itemId] += 1
    }
    else {
      cartData[itemId] = 1
    }
    await userModel.findByIdAndUpdate(userId, { cartData })
    res.status(200).json("added to cart")
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}


const updateCart = async (req, res) => {
  try {
    const { itemId, userId, quantity } = req.body
    const user = await userModel.findById(userId)
    let cartData = await user.cartData
    cartData[itemId] = quantity

    await userModel.findByIdAndUpdate(userId, { cartData })
    res.status(200).json("cart updated successfully")

  }
  catch (err) {
    res.status(500).json(err.message)

  }
}


const getUserCart = async (req, res) => {
  try {
    const {userId}=req.body
    const user = await userModel.findById(userId)
    res.status(200).json({data:user.cartData, message:"user cart"})
  }
  catch (err) {
    res.status(500).json(err.message)
  }
}


module.exports ={getUserCart, updateCart, addToCart}