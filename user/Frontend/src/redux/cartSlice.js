import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (itemId, thunkAPI) => {
        try {
            const req = await fetch("http://localhost:3500/cart/add-to-cart",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({ itemId })
                }
            )

            const res = await req.json()
            console.log(res)
            return res
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.error)
        }
    }
)

export const updateCart = createAsyncThunk(
    "cart/updateCart",
    async (cartData, thunkAPI) => {
        try {
            const req = await fetch("http://localhost:3500/cart/update-cart",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(cartData)
                }
            )

            const res = await req.json()
            console.log(res)
            return res
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.error)
        }
    }
)


export const fetchUserCart = createAsyncThunk(
    "cart/fetchUserCart",
    async (thunkAPI) => {
        try {
            const req = await fetch("http://localhost:3500/cart/get-user-cart",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                }
            )

            const res = await req.json()

            return res.data
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.error)
        }
    }
)

let initialState = {
    products: [],
    totalPrice: 0,
    totalQuantity: 0,
    isPending: false,
    error: false
}


const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    extraReducers: builder => {
        builder
            .addCase(addToCart.pending, state => {
                state.isPending = true
            })
            .addCase(addToCart.fulfilled, (state) => {
                state.isPending = false
                state.error = false
            })
            .addCase(addToCart.rejected, state => {
                state.error = true
                state.isPending = false
            })

            .addCase(updateCart.pending, state => {
                state.isPending = true
            })
            .addCase(updateCart.fulfilled, (state) => {
                state.isPending = false
                state.error = false
            })
            .addCase(updateCart.rejected, state => {
                state.error = true
                state.isPending = false
            })

            .addCase(fetchUserCart.pending, state => {
                state.isPending = true
            })
            .addCase(fetchUserCart.fulfilled, (state, action) => {
                state.isPending = false
                state.products = action.payload
                state.totalQuantity = action.payload.reduce((sum, item) => sum + item.quantity, 0);
                state.totalPrice = action.payload.reduce((sum, item) => sum + item.price * item.quantity, 0);

                state.error = false
            })
            .addCase(fetchUserCart.rejected, state => {
                state.error = true
                state.isPending = false
            })
    }
})


export default cartSlice.reducer







// const cartSlice = createSlice({
//     name: "cart",
//     initialState: initialState,
//     reducers:
//     {
//         addToCart: (state, action) => {
//             const newItem = action.payload
//             const itemIndex = state.products.find(item => item.id === newItem.id)
//             if (itemIndex) {
//                 itemIndex.quantity++
//                 // state.totalPrice+=newItem.price
//             }
//             else {
//                 state.products.push({
//                     id: newItem.id,
//                     quantity: 1,
//                     name: newItem.name,
//                     image: newItem.image,
//                     price: newItem.price
//                 })
//             }
//             state.totalPrice += +newItem.price
//             state.totalQuantity++

//         },

//         removeFromCart: (state, action) => {
//             const id = action.payload
//             const selectedItem = state.products.find(product => product.id === id)
//             if (selectedItem) {
//                 state.totalPrice -= (+selectedItem.price * selectedItem.quantity)
//                 state.totalQuantity -= selectedItem.quantity
//                 state.products = state.products.filter(product => product.id !== id)
//             }
//         },

//         increaseQuantity: (state, action) => {
//             const id = action.payload
//             const selectedItem = state.products.find(product => product.id === id)
//             if (selectedItem) {
//                 state.totalPrice += +selectedItem.price
//                 state.totalQuantity++
//                 selectedItem.quantity++
//             }
//         },

//         decreaseQuantity: (state, action) => {
//             const id = action.payload
//             const selectedItem = state.products.find(product => product.id === id)
//             if (selectedItem) {
//                 state.totalPrice -= +selectedItem.price
//                 state.totalQuantity--
//                 selectedItem.quantity--
//             }
//         }

//     }
// })

// export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions