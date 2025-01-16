import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    products: [],
    searchTerm: "",
    filteredProducts:[]
}

const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers:
    {
        setProduct: (state, action) => {
            state.products= action.payload
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload
            state.filteredProducts= state.products.filter(product=>product.name.toLowerCase().includes(state.searchTerm.toLowerCase()))
        }
    }
})

export const { setProduct , setSearchTerm} = productSlice.actions
export default productSlice.reducer