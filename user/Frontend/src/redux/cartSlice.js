import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    products: [],
    totalPrice: 0,
    totalQuantity: 0
}

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