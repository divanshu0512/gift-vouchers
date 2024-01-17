import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import env from "react-dotenv";


export const orderSlice = createAsyncThunk("orderSlice" , async (data) => {
    console.log("order token = ",data.token)
    const token = data.token
    const userData = data.userDetails

    const url = env.REACT_APP_UAPI_URL;

    try{

        const api = await fetch(`${url}/eezibapi/order`, {
            method:"POST",
            headers:{
                "Content-Type":'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify(userData)
        })
        return api.json();
    }catch(err){
        console.log("err")
    }

})

const order = createSlice({
    name:"order",
    initialState:{
        item:null,
        isLoading:false,
        isError:false
    },
    extraReducers:(builder) => {
        builder.addCase(orderSlice.pending , (state , action) => {
            state.isLoading=true;
            state.item=null;
        });

        builder.addCase(orderSlice.fulfilled , (state , action) => {
            state.item = action.payload;
            state.isLoading = false;
        });
        
        builder.addCase(orderSlice.rejected , (state ,action) => {
            state.isError = action.payload;
            state.isLoading = false;
        })
    }
})

export default order.reducer