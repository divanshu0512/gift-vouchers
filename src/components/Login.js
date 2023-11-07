import { Box, Button, CardMedia, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material';
import env from "react-dotenv";
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';



import React from 'react'

function Login() {

  const [userName , setUserName] = React.useState('');
  const [password , setPassword] = React.useState('');

  async function getData(){
    const callData = await fetch("https://uat.eezib.in/api/login",{
      method:'post',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({"email":userName , "password":password})
    })

    const json = await callData.json();
    console.log(json)

    console.log("user name : ",userName + " password : ",password )
  }


  return (
    <Box className="loginImg" sx={{ display:'flex' , alignItems:'center' ,justifyContent:'center' }}  >

      <Box sx={{ display:'flex' , alignItems:'center' ,justifyContent:'center', flexDirection:'column', borderRadius:2 , gap:"0.5rem" , backdropFilter:"blur(20px)", boxShadow:"0px 0px 10px 1px white" , padding:"1rem 2rem" }} >
        <Typography sx={{fontFamily:'montserrat' , fontWeight:700 , fontSize:"1.5rem" , color:'#2670bf', marginTop:"1rem"}} >Login</Typography>


          <TextField onChange={(e) => setUserName(e.target.value) } value={userName} InputProps={{ endAdornment:( <InputAdornment position='end' > <PersonIcon sx={{ color:'white'}} /> </InputAdornment> ) }} className='loginInput' sx={{width:'15rem' , color:'white' , fontFamily:'montserrat', fontSize:'0.4rem' , marginTop:'1rem'}} variant='standard'  placeholder=" username" />
          <TextField onChange={(e) => setPassword(e.target.value) } value={password} InputProps={{ endAdornment:( <InputAdornment position='end' > <PasswordIcon sx={{ color:'white'}} /> </InputAdornment> ) }} className='loginInput' sx={{width:'15rem' , color:'white' , fontFamily:'montserrat', marginTop:'1rem'}}  variant='standard'  placeholder=" password" />
          <Typography onClick={() => window.location.replace(`${env.REACT_APP_UAPI_URL}/password/reset`)} sx={{color:'white', fontFamily:'montserrat',fontSize:"0.7rem" , marginLeft:"auto", cursor:'pointer'}} >forget password ?</Typography>

          <Button onClick={() => getData()} fullWidth size='medium' variant='contained' sx={{fontFamily:'montserrat' , marginTop:'1.5rem' , fontWeight:500}} >submit</Button>

          <Typography onClick={() => window.location.replace(`${env.REACT_APP_UAPI_URL}/register`)} sx={{fontFamily:'montserrat' , fontSize:"14px" , fontWeight:500 , marginTop:'1rem' , color:'white' , cursor:'pointer'}} >not registered yet ?</Typography>
      </Box>  

    </Box>
  )
}

export default Login