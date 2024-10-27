import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchUsers = createAsyncThunk(
    "user/fetchUserData",
    async (_, thunkAPI)=>{
        try {
            const req = await fetch("http://localhost:3500/user/get-all-users",{
                method: "GET",
                headers: {
                    "Content-Type":"application/json"
                }
            })
            const response = await req.json()
            return response.users
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.error)
        }
   }
)


const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        isLoading:false
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, state => {
                state.isLoading=true
            })
        
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.users=action.payload
            })
            .addCase(fetchUsers.rejected, state => {
                state.isLoading=false
            })
    }
})


export default userSlice.reducer