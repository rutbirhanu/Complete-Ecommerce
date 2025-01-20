import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";


export const userOrder = createAsyncThunk(
    "order/userOrder",
    async (orderData, thunkAPI) => {
        try {
            const req = await fetch("http://localhost:3500/order/user-order",
                {
                    method: "GET",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(orderData)
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


export const allOrder = createAsyncThunk(
    "order/allOrder",
    async (orderData, thunkAPI) => {
        try {
            const req = await fetch("http://localhost:3500/order/all-orders",
                {
                    method: "GET",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(orderData)
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


let initialState = {
    order: [],
    isPending: false,
    error:false
}


const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    extraReducers: builder => {
        builder
            .addCase(userOrder.pending, state => {
                state.isPending = true
            })
            .addCase(userOrder.fulfilled, (state, action) => {
                state.order = action.order
                state.isPending = false
            })
            .addCase(userOrder.rejected, state => {
                state.error = true
            })
            .addCase(allOrder.pending, state => {
                state.isPending = true
            })
            .addCase(allOrder.fulfilled, (state, action) => {
                state.order = action.order
                state.isPending = false
            })
            .addCase(allOrder.rejected, state => {
                state.error = true
            })
    }
})


export default orderSlice.reducer