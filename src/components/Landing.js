import React from 'react'
import { Alert, AppBar, Box, Breadcrumbs, Chip, CircularProgress, Divider, FormControl, InputAdornment, InputLabel, Link, Menu, MenuItem, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, emphasize } from '@mui/material';
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
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';




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
  const [loginUser , setLoginUser] = React.useState(false);
  const [searchedText , setSearchedText] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);

  
  const [filteredData, setFilteredData] = React.useState();

  const openmenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  

  const location = useLocation();



  React.useEffect(() => {
    try{   
      
      if(location.state){

      const respo = location.state.data[0];
      const tkn = respo.jwt;
      const userId = respo.userDetails;
      const uName = respo.name;
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
          
          
          if(json && json.access_token){
            const id = json.user.id;
            const token = json.access_token;
            const urName = json.user.name;
            setUName(urName)
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


    const menuData = useSelector((state) => state.auth.data);


    const handleMenuChange = (event) => {
      
      event.preventDefault() ;
      setSearchedText(event.target.value)
      
        const respo = menuData?.filter(data => data.name.toLowerCase().includes(event.target.value));
        {
          respo?.length > 0 ? setFilteredData(respo) : setFilteredData(null)
        }

        if(searchedText?.length <= 1){
          setFilteredData(null)
        }
        
    }
 


    function handleCrossButton(){
      setFilteredData(null);
      setSearchedText('');
    }
   


  return (
    <Box className="landing" >
      <Box >
       

        <AppBar position='sticky' className={scrolling ? 'scrolling' : null} style={appBarStyle} >
          <Toolbar sx={{ display:'flex', alignItems:'center', justifyContent:'space-between' }} >


            
           
            <Box sx={{ width: { lg: "10rem", xs: "8rem" } ,padding: { lg: "0.6rem 0rem 0.6rem 0rem", xs: "0.3rem 0rem 0.3rem 0rem" } }} component='img' onClick={() => window.location.replace(env.REACT_APP_UAPI_URL)} src={imageSource}  />

            <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', gap:1 }} >
            <TextField value={searchedText} placeholder='search product..' autoComplete='off' onChange={handleMenuChange} InputProps={{ startAdornment:( <InputAdornment> <SearchIcon sx={{ marginRight:2 }} /> </InputAdornment> ), endAdornment:(  <InputAdornment> { filteredData ? <CloseIcon onClick={(e) => handleCrossButton() } sx={{ cursor:'pointer' }} /> : null }  </InputAdornment>) }} size='small' inputProps={{ style:{ fontFamily:'montserrat', fontWeight:400 } }}  />
            
            </Box>



            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} id="cursor" >
              {
                !u_name ? <Button onClick={() => setLoginDialog(true) } variant='outlined' sx={{fontFamily:'montserrat'}} >Login</Button> :
                 <FormControl size='small' sx={{ width:{lg:"12rem" , xs:"7rem"} }}>
                <InputLabel id="demo-simple-select-label" sx={{ fontFamily: "montserrat", fontWeight: 500 }}> {!u_name ? "Guest" : u_name} </InputLabel>
                <Select
                  label={!u_name ? "Guest" : u_name}
                >
                  <MenuItem onClick={() => setDialog(true)} sx={{fontFamily:'montserrat' , fontWeight:500}} >voucher categories</MenuItem>
                  <MenuItem sx={{fontFamily:'montserrat' , fontWeight:500}} onClick={() => navigate("/" , {state : {login : null}}) } > <LogoutIcon sx={{color:"#424242"}} />&nbsp; Logout  </MenuItem>
                </Select>
              </FormControl>
              }
            
              

            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ display:'flex', justifyContent:'center', maxHeighteight:'30vh', overflow:'hidden', flexGrow:1, borderRadius:5 }} >
          
          { filteredData?.length >= 1 && filteredData !== null ?
                <Box sx={{ width:'20rem',position:"absolute", zIndex:2, backgroundColor:'#f7f7f7', display:'flex', flexDirection:'column',p:2, borderRadius:1 }} >
                 {
                        filteredData?.slice(0,5).map((row) => (
                          <>
                          <Typography onClick={() => navigate("/voucher", {state : { data : { 'row': row, "auth":tkn, "id":id, "name":row.name  }}})} sx={{ textAlign:'left', cursor:"pointer", fontFamily:"montserrat", fontWeight:500 }} >{row.name}</Typography> <Divider variant='middle' component='ul' sx={{ margin:1 }} />
                          </>
                        ))
                      }
              </Box> : null
          }

        
          {/* {
            filteredData?.map((data) => {
              return (
                <Typography>{data.name}</Typography>
              )
            })
          } */}
        </Box>

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
                <TextField type='password' variant='standard' onChange={(e) => setPassword(e.target.value) } value={password} InputProps={{ endAdornment:( <InputAdornment position='end' > <PasswordIcon  /> </InputAdornment> ) }} className='loginInput' sx={{width:'16rem' , fontFamily:'montserrat', marginTop:'2rem'}}   placeholder=" password" />
                <Typography onClick={() => window.location.replace(`${env.REACT_APP_UAPI_URL}/password/reset`)} sx={{ fontFamily:'montserrat',fontSize:"0.7rem" , marginLeft:"auto", cursor:'pointer'}} >forget password ?</Typography>

                <Button onClick={() => getData()} fullWidth size='medium' variant='contained' sx={{fontFamily:'montserrat' , marginTop:'1.5rem' , fontWeight:500}} >submit</Button>

                <Typography onClick={() => window.location.replace(`${env.REACT_APP_UAPI_URL}/register`)} sx={{fontFamily:'montserrat' , fontSize:"14px" , fontWeight:500 , marginTop:'1rem' , cursor:'pointer' , color:"#8a8a8a"}} >not registered yet ?</Typography>
            </Box> 
          }
           </Box>
                
      
        </DialogContent>
    </Dialog>

    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openmenu}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{ width:350, mt:1 }}
      >
        {
        filteredData && filteredData?.map((row) =>(
            
              <MenuItem onClick={() => navigate("/voucher", {state : { data : { 'row': row, "auth":tkn, "id":id, "name":row.name  }}})} sx={{ fontFamily:'montserrat', fontWeight:500, fontSize:"1rem", width:'250rem' }} >{row.name} </MenuItem>
         )
          )
        }

 
      </Menu>

      
    </Box>
  )
}

export default Landing

//onMouseEnter={()=>setDialog(true)}