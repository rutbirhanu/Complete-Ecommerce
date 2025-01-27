import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";


// export const addToCart = createAsyncThunk(
//     "cart/addToCart",
//     async (cartData, thunkAPI) => {
//         try {
//             const req = await fetch("http://localhost:3500/cart/add-to-cart",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type":"application/json"
//                     },
//                     body:JSON.stringify(cartData)
//                 }
//             )

//             const res = await req.json()
//             console.log(res)
//             return res
//         }
//         catch (err) {
//             return thunkAPI.rejectWithValue(err.response.data.error)
//         }
//     }
// )

// export const removeFromCart = createAsyncThunk(
//     "cart/removeFromCart",
//     async (cartData, thunkAPI) => {
//         try {
//             const req = await fetch("http://localhost:3500/cart/remove-from-cart",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type":"application/json"
//                     },
//                     body:JSON.stringify(cartData)
//                 }
//             )

//             const res = await req.json()
//             console.log(res)
//             return res
//         }
//         catch (err) {
//             return thunkAPI.rejectWithValue(err.response.data.error)
//         }
//     }
// )

// export const increaseQuantity = createAsyncThunk(
//     "cart/increaseQuantity",
//     async(itemId, thunkAPI)=> {
//     try {
//         const req = await fetch("http://localhost:3500/cart/increase-quantity",
//             {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type":"application/json"
//                 },
//                 body:JSON.stringify(itemId)
//             }
//         )
//         const res = await req.json()
//         console.log(res)
//         return res

//     }
//     catch (err) {
//         return thunkAPI.rejectWithValue(err.response.data.error)
//     }
//     }
// )


// export const decreaseQuantity = createAsyncThunk(
//     "cart/decreaseQuantity",
//     async(itemId, thunkAPI)=> {
//     try {
//         const req = await fetch("http://localhost:3500/cart/decrease-quantity",
//             {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type":"application/json"
//                 },
//                 body:JSON.stringify(itemId)
//             }
//         )
//         const res = await req.json()
//         console.log(res)
//         return res

//     }
//     catch (err) {
//         return thunkAPI.rejectWithValue(err.response.data.error)
//     }
//     }
// )



let initialState = {
    products: [],
    totalPrice: 0,
    totalQuantity: 0,
    isPending: false,
    error:false
}


// const cartSlice = createSlice({
//     name: "cart",
//     initialState: initialState,
//     extraReducers: builder => {
//         builder
//             .addCase(addToCart.pending, state => {
//                     state.isLoading= true
//             })
//             .addCase(addToCart.fulfilled, (state, action) => {
//                 state.products = action.payload
//             })
//             .addCase(addToCart.rejected, state => {
//                 state.error= true
//             })
//             .addCase(removeFromCart.pending, state => {
//                 state.isLoading= true
//             })
//             .addCase(removeFromCart.fulfilled, (state, action) => {
//                  state.products=action.payload
//             })
//             .addCase(removeFromCart.rejected, state => {
//                  state.error= true
//             })
//             .addCase(increaseQuantity.pending, state => {
//                 state.isPending= true
//             })
//             .addCase(increaseQuantity.fulfilled, (state, action) => {
//                 state.pro
//             })
//     }
// })

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers:
    {
        addToCart: (state, action) => {
            const newItem = action.payload
            const itemIndex = state.products.find(item => item.id === newItem.id)
            if (itemIndex) {
                itemIndex.quantity++
                // state.totalPrice+=newItem.price
            }
            else {
                state.products.push({
                    id: newItem.id,
                    quantity: 1,
                    name: newItem.name,
                    image: newItem.image,
                    price: newItem.price
                })
            }
            state.totalPrice += +newItem.price
            state.totalQuantity++

        },

        removeFromCart: (state, action) => {
            const id = action.payload
            const selectedItem = state.products.find(product => product.id === id)
            if (selectedItem) {
                state.totalPrice -= (+selectedItem.price * selectedItem.quantity)
                state.totalQuantity -= selectedItem.quantity
                state.products = state.products.filter(product => product.id !== id)
            }
        },

        increaseQuantity: (state, action) => {
            const id = action.payload
            const selectedItem = state.products.find(product => product.id === id)
            if (selectedItem) {
                state.totalPrice += +selectedItem.price
                state.totalQuantity++
                selectedItem.quantity++
            }
        },

        decreaseQuantity: (state, action) => {
            const id = action.payload
            const selectedItem = state.products.find(product => product.id === id)
            if (selectedItem) {
                state.totalPrice -= +selectedItem.price
                state.totalQuantity--
                selectedItem.quantity--
            }
        }

    }
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions
export default cartSlice.reducer