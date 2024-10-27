import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const addProduct = createAsyncThunk(
    async (product, thunkAPI) => {
        try {
            const req = await fetch("http://localhost:3500/product/add-product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(product)
            })
            const response = await req.json()
            console.log(response)
            return response
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.error)
        }
    }
)


export const fetchProduct = createAsyncThunk(
    async (_, thunkAPI) => {
        try {
            const request = await fetch("http://localhost:3500/product/all-products",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            const response = await request.json()
            console.log(response)
            return response
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.error)
        }
    }
)



const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.products = action.payload
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export default productSlice.reducer