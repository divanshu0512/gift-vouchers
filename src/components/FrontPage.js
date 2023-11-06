import { Box, CircularProgress, Snackbar, Typography } from '@mui/material'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import env from "react-dotenv";


function FrontPage() {

  const [headerVerification , setHeaderVerification] = React.useState('');
  const [verification, setVerification] = React.useState("");
  const [userId, setUserid] = React.useState("");
  const [name , setName] = React.useState('')


  const navigate = useNavigate();
  const location = useLocation();
 
  const webLocation = window.location.search
  const token = webLocation.replace("?home=", "")
  console.log("token : ",token)

  async function getData() {
    console.log("get data called")
    
    if(location.state && !token ){

      const token = location.state.login.user;
      setVerification(token)

      const id = location.state.login.user_id
      setUserid(id)

      const uName = location.state.login.name
      setName(uName);

     // window.alert(`welcome ${uName}`)
      navigate("/products", { state: { data: [{ "jwt": token, "userDetails": id, "name": uName }] } });
      
    }
    else if(!token){
      navigate("/products", { state: { data: "fresh_user" } })
    }
    else if(token){

      console.log("web location called")

      try {      
        // const api = await fetch(`http://sapna.local/eezib_prod/public/api/validate_user`, {
          // const api = await fetch(`http://divanshu.local:5000/auth`, {
  
          const base = env.REACT_APP_UAPI_URL
          
          const api = await fetch(`${base}/eezibapi/auth`,{
            
          method: "POST",
          headers: {
            "Accept":"application/jsons",
            "Authorization":`Bearer ${token}`
          },
          body: JSON.stringify()
        });
        const respo = await api.json();
        console.log("token : ",respo)
     
        if (respo.message === "Unauthenticated."){
          navigate(-1)
        }else if(respo.exception){
          window.alert("site under maintainance, please login soon")
          navigate(-1)
        }else if(respo.error){
          window.alert("site under maintainance, please login soon")
          navigate(-1)
        }
  
        const jwt = respo.access_token.original.access_token;
        console.log("landing token: " , jwt)
        setVerification(jwt);
        const userDetails = respo.access_token.original.user.id;
        console.log("landing userId: " , userDetails)
        setUserid(userDetails);
        const usrName = respo.access_token.original.user.name;
        console.log("landing userName: " , usrName)
        setName(usrName)
  
        
  
  
        jwt && userDetails ? navigate("/products", { state: { data: [{ "jwt": jwt, "userDetails": userDetails, "name": usrName }] } }) : window.alert("cant send proper data not sent")
  
      } catch (error) {
        window.location.replace(`${env.REACT_APP_UAPI_URL}/login`);
        console.log(error)
      }

    }

     }

    

    React.useEffect(() => {
   getData()
  }, []);



  return (
    <Box sx={{display:'flex' , alignItems:'center' , justifyContent:'center'}} >
      <Box sx={{display:'flex' , alignItems:'center' , justifyContent:'center', marginTop:'10%'}} >
          <span style={{ display:'flex' , alignItems:'center' , justifyContent:'center' , flexDirection:'column' }} >
            <CircularProgress size="12rem" thickness={1.5} />
              <Typography sx={{fontFamily:'montserrat' , fontSize:'1rem' , marginTop:"0.5rem"}} >Redirecting to Eezib Cards Mania...</Typography>
          </span>
          
      </Box>

     
    </Box>
  )
}

export default FrontPage