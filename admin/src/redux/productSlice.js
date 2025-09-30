import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const addProduct = createAsyncThunk(
    "product/addProduct",
    async (productFormData, thunkAPI) => {
        try {
            const req = await fetch("http://localhost:3500/product/add-product", {
                method: "POST",
                body: productFormData
            })
            if (!req.ok) {
                const errorData = await req.json();
                console.log(errorData)
                return thunkAPI.rejectWithValue(errorData.error || "Something went wrong");
            }
            const response = await req.json()
            console.log(response)
            return response
        }
        catch (err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err.response.data.error)
        }
    }
)


export const fetchProduct = createAsyncThunk(
    "product/fetchProductData",
    async (_, thunkAPI) => {
        try {
            const request = await fetch("http://localhost:3500/product/all-products",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                }
            )
            const response = await request.json()
            console.log(response.products[0])
            return response.products
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
        error: null,
        success: false
    },

    reducers: {
        resetStatus: (state) => {
            state.isLoading = false;
            state.error = null;
            state.success = false;
        },
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

            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
                state.success = false;
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.isLoading = false;
                state.success = true;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.success = false;
            });
    }
})

export const { resetStatus } = productSlice.actions;
export default productSlice.reducer