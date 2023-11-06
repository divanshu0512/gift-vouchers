import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";

export const authSlice = createAsyncThunk('authSlice' , async (token) => {

    // console.log('slicetoken : ',token);
    try{
        const fetchApi = await fetch("http://divanshu.local:5000/cards");
        return fetchApi.json();
    }catch(err){
        window.alert("technical issue, we are fixing it..")
    }
})

const auth = createSlice({
    name:"auth",
    initialState:{
        data:null,
        isLoading:false,
        isError:false
    },

    extraReducers:(builder) => {
        builder.addCase(authSlice.pending , (state , action) => {
            state.isLoading=true;
            state.data = null
        });

        builder.addCase(authSlice.fulfilled , (state , action) => {
            state.isLoading= false;
            state.data = action.payload;
        });

        builder.addCase(authSlice.rejected , (state, action) => {
            console.log("error => ",action.payload)
            state.isError = true;
        })
    }
})

export default auth.reducer