import React from 'react'
import { Alert, AppBar, Box, Breadcrumbs, Chip, CircularProgress, FormControl, InputAdornment, InputLabel, Link, MenuItem, Select, Snackbar, Toolbar, Typography, emphasize } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import LandingMode from './LandingMode';
import BestOffers from './BestOffers';
import CashBackOffer from './FoodCashBackOffer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import image from '../images/eezib2.png';
import image2 from "../images/eezib.png"
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css';
import env from 'react-dotenv';
import eezib from "../images/eezib.png"
import {TextField} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import styled from 'styled-components';




function Landing() {

  const [dialog, setDialog] = React.useState(false);
  const [tkn, settkn] = React.useState('');
  const [id, setId] = React.useState('');
  const [u_name, setUName] = React.useState('');
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [appBarStyle, setAppBarStyle] = React.useState({
    background: 'linear-gradient(20deg, rgb(0, 149, 255), rgb(30, 255, 240))',
    height: "4.9rem",
    transition: "all 0.3rem"
  })
  const [imageSource, setImageSource] = React.useState(image);
  const [scrolling, setScrolling] = React.useState(false);
  const [userName , setUserName] = React.useState('');
  const [password , setPassword] = React.useState('');
  const [name , setName] = React.useState('');
  const [user, setUser] = React.useState([]);
  const [loginDialog , setLoginDialog] = React.useState(false);
  const [user_id, setUserId] = React.useState("");
  const [loading , setLoading] = React.useState(false);
  const [loginUser , setLoginUser] = React.useState(false)

  

  const location = useLocation();



  React.useEffect(() => {
    try{   
      
      if(location.state){
      console.log("landing location : ",location.state.data)

      console.log("landing location : ",location.state.data[0])
      const respo = location.state.data[0];
      console.log("respo : ",respo)
      const tkn = respo.jwt;
      console.log("token : ",tkn)
      const userId = respo.userDetails;
      console.log("token : ",userId)
      const uName = respo.name;
      console.log("token : ",uName)
      setUName(uName)
      setId(userId)
      settkn(tkn);
      if(uName && tkn && userId ){
        setLoginUser(true);
      }

      
    }else{
      window.alert("Hold on! Direct access to this page isn't supported.");
      window.location.reload();
      navigate(-1)

    }

    }catch(err){
      console.log(err)
    }
  }, []);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
    const threshold = 550;
    if (window.scrollY > threshold) {
      setAppBarStyle({
        background: "white",
        height: "4rem",
        transition: "all 0.3s"
      });
      setScrolling(true)
      setImageSource(image2)
    } else {
      setAppBarStyle({
        background: 'linear-gradient(20deg, rgb(0, 149, 255), rgb(30, 255, 240))',
        height: "4.9rem",
        transition: "all 0.3s"
      });
      setImageSource(image);
      setScrolling(false)
    }
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }

    
  }, [])

  function handleClose() {
    setDialog(false)
  }

  const data = [
    {
      index: 1,
      name: "jewelry and lifestyle",
      value: "lifestyle"
    },
    {
      index: 2,
      name: "Books_Magazines & Subscriptions",
      value: "subscriptions"
    },
    {
      index: 3,
      name: "beauty_health",
      value: "health"
    },
    {
      index: 4,
      name: "wellness",
      value: "wellness"
    }, {
      index: 5,
      name: "sports",
      value: "sports"
    },
    {
      index: 6,
      name: "Travel",
      value: "tourism"
    },
    {
      index: 7,
      name: "Beauty_Health & Wellness",
      value: "wellness"
    },

    {
      index: 9,
      name: "Grocery and Retail",
      value: "grocery"
    },
    {
      index: 10,
      name: "Home & Living",
      value: "living"
    },
    {
      index: 11,
      name: "Deals & Subscriptions",
      value: "deals"
    },
    {
      index: 12,
      name: "Mobile Recharge",
      value: "recharges"
    },
    {
      index: 13,
      name: "Restaurants Foods and Drinks",
      value: "restaurants"
    },
    {
      index: 14,
      name: "Music Movies and Entertainment",
      value: "entertainment",
    },
    {
      index: 15,
      name: "Electronics",
      value: "electronics"
    },
    {
      index: 16,
      name: "Cash Cards",
      value: "cash cards"
    },

    {
      index: 18,
      name: "Baby & Kids",
      value: "kids"
    },
    {
      index: 19,
      name: "Apparel_Fashion & Accessories",
      value: "accessories"
    },
    {
      index: 20,
      name: "Sports and Fitness",
      value: "fitness"
    },
    {
      index: 21,
      name: "Automobile",
      value: "automobile"
    },
    {
      index: 22,
      name: "Beauty_Health & Wellness,Sports and Fitness",
      value: "health"
    }
  ]

  const navigate = useNavigate();

  const items = [
    <Box component='img' onClick={() => navigate(`/categories/lifestyle`, { state: { data: [{ "value": 'lifestyle', "token": tkn, "id": id }] } })} sx={{borderRadius:"15px", width:{xs:"18rem" , md:"22rem", lg:'22rem'}}} src="./eezib/alice/ADDIDAS.jpg" />,
    <Box component='img' onClick={() => navigate(`/categories/restaurants`, { state: { data: [{ "value": 'restaurants', "token": tkn, "id": id }] } })} sx={{borderRadius:"15px", width:{xs:"18rem" , md:"22rem", lg:'22rem'}}} src="./eezib/alice/blinkit.jpg" />,
    <Box component='img' onClick={() => navigate(`/categories/lifestyle`, { state: { data: [{ "value": 'lifestyle', "token": tkn, "id": id }] } })} sx={{borderRadius:"15px", width:{xs:"18rem" , md:"22rem", lg:'22rem'}}} src="./eezib/alice/amazon2.jpg" />,
      <Box component='img' onClick={() => navigate(`/categories/restaurants`, { state: { data: [{ "value": 'restaurants', "token": tkn, "id": id }] } })} sx={{borderRadius:"15px", width:{xs:"18rem" , md:"22rem", lg:'22rem'}}} src="./eezib/alice/Starbucks.jpg" />,
      <Box component='img' onClick={() => navigate(`/categories/restaurants`, { state: { data: [{ "value": 'restaurants', "token": tkn, "id": id }] } })} sx={{borderRadius:"15px", width:{xs:"18rem" , md:"22rem", lg:'22rem'}}} src="./eezib/alice/BASKINROBBINS.jpg" />,
    ]

  const responsive = {
      0: {
          items: 1,
      },
      350:{
        items:1,
      },
      750:{
        items:2,
      },
      1028:{
        items:3 ,
       itemsFit: 'contain',

      },

      
      1024: {
        items: 3,
        itemsFit: 'contain',
      },
      1129:{
        items:3,
      },
      
    }

    const closeLoginDialog =() => {
      setLoginDialog(false)
}

    async function getData(){
      setLoading(true)
      try{
          const api = env.REACT_APP_UAPI_URL
          
          const callData = await fetch(`${api}/api/login`,{
            method:'post',
            headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify({"email":userName , "password":password})
          })
      
          const json = await callData.json();
          console.log(json)
          
          
          if(json && json.access_token){
            const id = json.user.id;
            console.log("id : ",id)
            const token = json.access_token;
            console.log("token: ",token)
            const urName = json.user.name;
            setUName(urName)
            console.log("name: ",name)
            setLoading(false)
            navigate("/", {state : {login :{"user":token, "user_id":id , "name":urName }}})

          }else if(json.error){
            setLoading(false)
              window.alert("invalid credentials");
          }     
      }catch(err){
          window.alert(err)
      }
    }






  return (
    <Box className="landing" >
      <Box >

        <AppBar position='sticky' className={scrolling ? 'scrolling' : null} style={appBarStyle} >
          <Toolbar  >
           
            <Box sx={{ width: { lg: "10rem", xs: "8rem" } ,padding: { lg: "0.6rem 0rem 0.6rem 0rem", xs: "0.3rem 0rem 0.3rem 0rem" } }} component='img' onClick={() => window.location.replace(env.REACT_APP_UAPI_URL)} src={imageSource}  />

            {/* <Breadcrumbs>
              <Typography sx={{fontFamily:'montserrat', cursor:'pointer' , fontWeight:500}} >Products</Typography>
              <Link sx={{cursor:'pointer'}} underline="hover" onClick={() => window.scroll(0,500)} color="inherit">
                Voucher 
              </Link>
            </Breadcrumbs> */}

            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginLeft:'auto' }} id="cursor" >
              {
                !u_name ? <Button onClick={() => setLoginDialog(true) } variant='outlined' sx={{fontFamily:'montserrat'}} >Login</Button> :
                 <FormControl size='small' sx={{ width:{lg:"12rem" , xs:"7rem"} }}>
                <InputLabel id="demo-simple-select-label" sx={{ fontFamily: "montserrat", fontWeight: 500 }}> {!u_name ? "Guest" : u_name} </InputLabel>
                <Select
                  label={!u_name ? "Guest" : u_name}
                >
                  <MenuItem onClick={() => setDialog(true)} sx={{fontFamily:'montserrat' , fontWeight:500}} >voucher categories</MenuItem>
                  <MenuItem sx={{fontFamily:'montserrat' , fontWeight:500}} onClick={() => navigate("/") } > <LogoutIcon sx={{color:"#424242"}} />&nbsp; Logout  </MenuItem>
                </Select>
              </FormControl>
              }
            
              


            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{margin:'1.5rem' , textAlign:'center' }} >

          <AliceCarousel
          mouseTracking
           items={items} 
          autoPlay
          animationDuration={800}  
          infinite
          lazyLoading
          renderNextButton={true}
          responsive={responsive}
          disableButtonsControls
          autoPlayInterval={1300} />      
      </Box>

        <LandingMode />
        {/* <LandingMode /> */}
      </Box>

      


      <Dialog
        open={dialog}
        // onMouseEnter={dialog}
        onMouseLeave={handleClose}
        sx={{ top: 0 }}
      >
        <CancelIcon id="cross" onClick={handleClose} sx={{ position: "relative", marginLeft: "auto", color: '#e05c53', cursor: 'pointer' }} />
        <DialogTitle id="alert-dialog-title">
          {"Unveil Your Inner Choice.."}
        </DialogTitle>
        <DialogContent>

          <Box sx={{ display: 'grid', marginTop: "1rem", gridTemplateColumns: { lg: "repeat(4,1fr)", sm: "repeat(2,1fr)", md: "repeat(3,1fr)" }, gridColumnGap: { lg: '2.5rem', sm: "2rem", md: '4rem', xs: '1rem' }, gridRowGap: '0.5rem' }} >

            {
              data?.map((row) => {
                return (
                  <Typography sx={{ cursor: 'pointer', fontFamily: 'montserrat' }} onClick={() => navigate(`/categories/${row.value}`, { state: { data: [{ "value": row.value, "token": tkn, "id": id }] } })} >{row.value}</Typography>
                )
              })
            }
          </Box>
        </DialogContent>
        <DialogActions >

          <Button onClick={handleClose} >
            Agree
          </Button>
        </DialogActions>
      </Dialog>

            
 
        <Dialog
        open={loginDialog}
        onClose={closeLoginDialog}
        aria-describedby="alert-dialog-slide-description"
        sx={{borderRadius:4}}
        >

        <DialogContent  sx={{  backgroundColor:'#e3e3e3'}} >
            {/* <Box component='img' sx={{width:'5rem'}} src={image} /> */}
        <Box  sx={{ display:'flex' , alignItems:'center' ,justifyContent:'center' }}  >
          {
            loading ? <CircularProgress /> : 
            <Box sx={{ backgroundColor:"white", display:'flex' , alignItems:'center' ,justifyContent:'center', flexDirection:'column', borderRadius:2 , gap:"0.5rem" , backdropFilter:"blur(20px)", boxShadow:"0px 0px 10px 1px white" , padding:{lg:"1rem 2rem", xs:"1rem 0.5rem", sm:"2rem 1.5rem"}}} >
            {/* <Typography sx={{fontFamily:'montserrat' , fontWeight:700 , fontSize:"1.5rem" ,  marginTop:"1rem"}} >Login</Typography> */}
            
              <Box component='img' sx={{width:"5rem"}} src={eezib} /> 


                <TextField variant='standard' size='medium' onChange={(e) => setUserName(e.target.value) } value={userName} InputProps={{ endAdornment:( <InputAdornment position='end' > <PersonIcon  /> </InputAdornment> ) }} className='loginInput' sx={{width:'16rem'  , fontFamily:'montserrat', fontSize:'0.4rem' , marginTop:'2rem'}}  placeholder=" username" />
                <TextField variant='standard' onChange={(e) => setPassword(e.target.value) } value={password} InputProps={{ endAdornment:( <InputAdornment position='end' > <PasswordIcon  /> </InputAdornment> ) }} className='loginInput' sx={{width:'16rem' , fontFamily:'montserrat', marginTop:'2rem'}}   placeholder=" password" />
                <Typography onClick={() => window.location.replace(`${env.REACT_APP_UAPI_URL}/password/reset`)} sx={{ fontFamily:'montserrat',fontSize:"0.7rem" , marginLeft:"auto", cursor:'pointer'}} >forget password ?</Typography>

                <Button onClick={() => getData()} fullWidth size='medium' variant='contained' sx={{fontFamily:'montserrat' , marginTop:'1.5rem' , fontWeight:500}} >submit</Button>

                <Typography onClick={() => window.location.replace(`${env.REACT_APP_UAPI_URL}/register`)} sx={{fontFamily:'montserrat' , fontSize:"14px" , fontWeight:500 , marginTop:'1rem' , cursor:'pointer' , color:"#8a8a8a"}} >not registered yet ?</Typography>
            </Box> 
          }
           </Box>
                
      
        </DialogContent>
    </Dialog>

  
    </Box>
  )
}

export default Landing

//onMouseEnter={()=>setDialog(true)}