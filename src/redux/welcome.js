import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import env from "react-dotenv";


export const welcomeSlice = createAsyncThunk("welcomeSlice", async (token) => {


    const url = env.REACT_APP_UAPI_URL;
    try{
        const api = await fetch(`${url}/eezibapi/auth` , {
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify()
        })
        return api.json();
    }catch(error){
        console.log(error)
    }
})

const welcome = createSlice({
    name:"welcome",
    initialState:{
        data:null,
        isLoading:false,
        isError:false
    },

    extraReducers:(builder)=>{

        builder.addCase(welcomeSlice.pending , (state , action) => {
            state.isLoading=true;
            state.data = null
        });

        builder.addCase(welcomeSlice.fulfilled , (state , action) => {
            state.isLoading= false;
            state.data = action.payload;
        });

        builder.addCase(welcomeSlice.rejected , (state, action) => {
            console.log("error => ",action.payload)
            state.isError = true;
        })

    }
})

export default welcome.reducer