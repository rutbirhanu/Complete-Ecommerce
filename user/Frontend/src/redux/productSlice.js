import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchAllProducts = createAsyncThunk(
    "product/fetchAllProducts",
    async (productData, thunkAPI) => {
        try {
            const req = await fetch("http://localhost:3500/product/all-products",
                {
                    method: "GET",
                    credentials: "include"
                }
            )

            const res = await req.json()
            console.log(res.products)
            return res.products

        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.error)
        }
    }
)


export const searchProducts = createAsyncThunk(
    "product/searchProducts",
    async (searchTerm, thunkAPI) => {
        try {
            const req = await fetch(`http://localhost:3500/product/search?query=${searchTerm}`,
                {
                    method: "GET",
                    credentials: "include"
                }
            )

            const res = await req.json()
            console.log(res.products)
            return res.products

        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.error)
        }
    }
)

export const fetchProductDetail = createAsyncThunk(
    "product/fetchSingleProduct",
    async (productId, thunkAPI) => {
        try {
            const req = await fetch(`http://localhost:3500/product/get-product/${productId}`,
                {
                    method: "GET",
                    credentials: "include"
                }
            )

            const res = await req.json()
            return res

        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.error)
        }
    }
)



let initialState = {
    products: [],
    product: {},
    isPending: false,
    searchTerm: "",
    searchedProducts: [],
    filteredProducts: []
}


const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchAllProducts.pending, state => {
                state.isPending = true
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isPending = false
                state.products = action.payload
            })
            .addCase(fetchAllProducts.rejected, state => {
                state.isPending = false
            })
            .addCase(fetchProductDetail.pending, state => {
                state.isPending = true
            })
            .addCase(fetchProductDetail.fulfilled, (state, action) => {
                state.isPending = false
                state.product = action.payload
            })
            .addCase(fetchProductDetail.rejected, state => {
                state.isPending = false
            })
            .addCase(searchProducts.pending, state => {
                state.isPending = true
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.isPending = false
                state.searchedProducts = action.payload
            })
            .addCase(searchProducts.rejected, state => {
                state.isPending = false
            })

    }

})


// const productSlice = createSlice({
//     name: "product",
//     initialState: initialState,
//     reducers:
//     {
//         setProduct: (state, action) => {
//             state.products= action.payload
//         },
//         setSearchTerm: (state, action) => {
//             state.searchTerm = action.payload
//             state.filteredProducts= state.products.filter(product=>product.name.toLowerCase().includes(state.searchTerm.toLowerCase()))
//         }
//     }
// })

// export const {setProduct, setSearchTerm} = productSlice.actions
export default productSlice.reducer
