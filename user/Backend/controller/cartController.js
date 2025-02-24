require("dotenv").config()
const userModel = require("../model/user")


const addToCart = async (req, res) => {
  try {
    const { userId } = req.user

    const {itemId} = req.body
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
    const {userId} = req.user
    const { itemId, quantity } = req.body
    const user = await userModel.findById(userId)
    let cartData = await user.cartData
    cartData[itemId] = quantity

    if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }

    await userModel.findByIdAndUpdate(userId, { cartData })
    res.status(200).json("cart updated successfully")

  }
  catch (err) {
    res.status(500).json(err.message)

  }
}


const getUserCart = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cartData = user.cartData; // { itemId1: quantity1, itemId2: quantity2, ... }
    const itemIds = Object.keys(cartData); // Extract item IDs

    if (itemIds.length === 0) {
      return res.status(200).json({ data: [], message: "Cart is empty" });
    }

    // Fetch product details for the items in the cart
    const products = await productModel.find({ _id: { $in: itemIds } });

    // Merge product details with their respective quantities
    const detailedCart = products.map(product => ({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: cartData[product._id], // Get quantity from cartData
    }));

    res.status(200).json({ data: detailedCart, message: "Cart data fetched successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};



// const getUserCart = async (req, res) => {
//   try {
//     const {userId}=req.body
//     const user = await userModel.findById(userId)
//     res.status(200).json({data:user.cartData, message:"cart data fetched successfully"})
//   }
//   catch (err) {
//     res.status(500).json(err.message)
//   }
// }


module.exports = { getUserCart, updateCart, addToCart}





// const increaseItemAmount = async(req, res) => {
//   try{
//     const { userId } = req.user
//     const { itemId } = req.body
//     const user = await userModel.findById(userId)
//     let cartData = user.cartData
//     if (cartData[itemId]) {
//       cartData[itemId]+=1
//     }
//     await userModel.findByIdAndUpdate(userId,{cartData})
//    res.status(200).json("item amount incremented") 

//   }
//   catch(err){
//     res.status(500).json(err.message)
//   }
// }

// const decreaseItemAmount = async(req, res) => {
//   try{
//     const { userId } = req.user
//     const { itemId } = req.body
//     const user = await userModel.findById(userId)
//     let cartData = user.cartData
//     if (cartData[itemId]) {
//       cartData[itemId]-=1
//     }
//     await userModel.findByIdAndUpdate(userId,{cartData})
//    res.status(200).json("item amount incremented") 

//   }
//   catch(err){
//     res.status(500).json(err.message)
//   }
// }
