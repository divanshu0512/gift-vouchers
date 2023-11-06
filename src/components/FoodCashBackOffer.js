import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, CircularProgress, FormControl, InputAdornment, InputLabel, MenuItem, NativeSelect, OutlinedInput, Pagination, Paper, Select, TextField, Typography } from '@mui/material'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SearchIcon from '@mui/icons-material/Search';
import env from 'react-dotenv';
import { useSelector , useDispatch } from 'react-redux';
import { authSlice } from '../redux/slice';


function CashBackOffer({ someData }) {

    // const state = useSelector((state) => state.auth);
    // const cards = state.data;
    // console.log("state : ",cards)


    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [page, setPage] = React.useState(1);
    const [auth, setAuth] = React.useState("");
    const [id, setId] = React.useState("");
    const [usrName  , setUserName] = React.useState('');
    const [prevData , setPrevData] = React.useState("");
    const [clickMenu , setClickMenu] = React.useState(1)

    const location = useLocation();
    const dispatch = useDispatch();

    React.useEffect(() => {
    
        try{
            if(location.state){
                const res = location.state.data[0];
            setPrevData(res);
            const resp = res;
            {
                if (resp != "fresh_user") {
                const token = resp.jwt
                setAuth(token)

                const userId = resp.userDetails;
                setId(userId);

                const userName = resp.name;
                setUserName(userName)

                
            }
        }    
            }
            
        }catch(err){
            console.log(err)
            // window.location.reload();
            // window.alert("url cant be accessed directly")
            //  navigate(-1)
        }
    },[])
    
   

    async function tokenData() {
        try{
            setLoading(true);
            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
              }
            const base = env.REACT_APP_UAPI_URL 
            // dispatch(authSlice())
            const api = await fetch(`${base}/eezibapi/cards`, );
        
            const respo = await api.json();
            console.log("respo :",respo)
            if( respo.error == 'Internal Server Error for cards api'){
                window.alert("website under maintenence");
                navigate(-1)
            }else if( !respo){
                window.alert("collecting fresh updates, please login in somtime time");
                window.location.reload()
            }
            setData(respo);
    
            setLoading(false); 
        }catch(err){
            // window.alert("seems api responding slow, wait few minutes");
            // window.alert("website under maintenence")
            // navigate(-1)
        }}

        const handleSearch = () => {

            try{

                if(clickMenu == 1){
                    return data.filter((data) =>
                        data.categories.toLowerCase().includes(search) ||
                        data.categories.toUpperCase().includes(search) ||
                        data.name.toUpperCase().includes(search) ||
                        data.name.toLowerCase().includes(search)
                    )
                }else if(clickMenu == 2){
                    return [...data].filter(item => item.name.toLowerCase().includes(search) ||
                            item.name.toUpperCase().includes(search) ||
                            item.categories.toLowerCase().includes(search) ||
                            item.categories.toUpperCase().includes(search) 
                            ).sort((a , b) => b.discount - a.discount)
                }
                else{
                    return data.filter((data) =>
                    data.categories.toLowerCase().includes(search) ||
                    data.categories.toUpperCase().includes(search) ||
                    data.name.toUpperCase().includes(search) ||
                    data.name.toLowerCase().includes(search)
                )
                }

            }catch(err){
                console.log(err)
            }
    }

    

    const handleCategory = () => {
        try{

            return data.filter((data) =>
                data.categories.toLowerCase().includes(someData) ||
                data.categories.toUpperCase().includes(someData)
            )
        }catch(err){
            console.log(err)
        }
    }

    React.useEffect(() => {
        tokenData()  
    }, [])

    const navigate = useNavigate();


    return (
        <Box className="back" sx={{ padding: '0.1rem', marginTop: '4rem', borderRadius: { lg: "5rem 5rem 0rem 0rem", sm: "3rem 3rem 0rem 0rem ", xs: "1.5rem 1.5rem 0rem 0rem" } }} >
            <Box sx={{ margin: '2rem' }} >


                {
                    !someData ? null :
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >
                            <Typography sx={{ fontFamily: 'montserrat', fontWeight: 550, textAlign: 'center', fontSize: { lg: "2.4rem", md: "2rem", xs: "1.5rem" } }} >Top Picks For You</Typography>


                            <Box sx={{ marginTop: "2rem", display: 'grid', gridTemplateColumns: { lg: "repeat(4,1fr)", sm: "repeat(2,1fr)", md: "repeat(2,1fr)", xs: "repeat(2,1fr)" }, gridColumnGap: { lg: '1.6rem', sm: "2rem", md: '2rem', xs: '1.3rem' }, gridRowGap: '1rem' }} >


                            {handleCategory()?.slice((page - 1) * 16, (page - 1) * 16 + 16).map((row) => {
                                    return (
                                        <Box sx={{ marginTop: { lg: "3rem", md: "1.8rem", xs: "0rem" } }} >

                                            <Paper onClick={() => navigate(`/voucher`, { state: { data: { "row":row,"auth":auth,"id":id, "name":row.name } } })} key={row.name} className='scale' elevation={8} sx={{ width: { lg: 280, md: 280, xs: 150 }, height: { lg: 170, md: 170, xs: 90 }, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >
                                                <Box key={row.productId} component="img" src={row.imageUrl} sx={{ width: { lg: 280, md: 280, xs: 150 }, borderRadius: 2 }} />
                                            </Paper>
                                            <Typography sx={{ textAlign: 'center', color: '#575555', marginTop: '1rem', fontFamily: 'montserrat', fontWeight: 500, fontSize: { lg: "1rem", md: "1rem", xs: "0.6rem" } }} >{row.name}</Typography>

                                        </Box>
                                    )
                                })
                                }
                              

                            </Box>

                            <Pagination
                                size='small'
                                style={{
                                    width: 'auto',
                                    padding: 50,
                                    display: 'flex',
                                    alignContent: 'center',
                                    justifyContent: 'center'
                                }}
                                variant='outlined'
                                color='warning'
                                count={(handleCategory()?.length / 16).toFixed(0)}
                                onChange={(_, value) => {
                                    setPage(value);
                                    window.scroll(0, 730)
                                }}
                            />
                        </Box>
                }




                <Box sx={{ marginTop: { lg: "2rem", xs: "0rem" } }} >
                    <Typography sx={{ textAlign: 'center', fontFamily: 'crimson text', textShadow:"0px 0px 2px white", color: "white", fontSize: { lg: "3.5rem", sm: "2.5rem", xs: "1.35rem" }, fontWeight: 600 , textShadow:"1px 0px 5px white" }} >Trending Eezib Vouchers</Typography>

                </Box>

                <Box sx={{ marginTop: '1rem' , display:'flex' , alignItems:'center' , justifyContent:'space-between' }} >

                    <OutlinedInput variant='filled' color='primary' value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())}  placeholder="search voucher.. " sx={{width:{lg:"20rem" , xs:"15rem" }, height:{xs:"3rem"} }} 
                    startAdornment={
                        <InputAdornment position="start">
                          <SearchIcon sx={{fontSize:{lg:"1.5rem" , xs:"1rem"}}}  />
                        </InputAdornment>
                      }
                    inputProps={{
                        autoComplete:"off"
                    }}
                     />

                <FormControl sx={{ m: 1, width:{lg:"15rem" , xs:"12rem"} , height:{xs:"3rem"} }}>
                        <InputLabel id="demo-simple-select-autowidth-label" sx={{ fontFamily:'montserrat' , fontWeight:500 , fontSize:{xs:"1rem"} }} >Sort By</InputLabel>
                        <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        // value={age}
                        autoWidth
                        label="Sort By"
                        defaultValue={1}
                        sx={{ fontFamily:'montserrat' , fontWeight:500 , height:{xs:"3rem"} }}
                        >
                        <MenuItem  value={1} sx={{fontFamily:'montserrat' , fontWeight:600 , fontSize:"0.9rem"}} onClick={() => setClickMenu(1)} >A-Z Vouchers</MenuItem>
                        <MenuItem value={2} sx={{fontFamily:'montserrat' , fontWeight:600 , fontSize:"0.9rem"}} onClick={() => setClickMenu(2)} >Top Discounted Voucher</MenuItem>
                        </Select>
                    </FormControl>

                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 'rem' }} >



                    {
                        loading ? <CircularProgress size="15rem" thickness={1.5} sx={{ color: '#ff9a42', marginTop: "3rem" }} /> :

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >



                                <Box sx={{ marginTop: "2rem", display: 'grid', gridTemplateColumns: { lg: "repeat(4,1fr)", sm: "repeat(2,1fr)", md: "repeat(3,1fr)", xs: "repeat(2,1fr)" }, gridColumnGap: { lg: '1.5rem', sm: "2rem", md: '4rem', xs: '1rem' }, gridRowGap: '2.5rem' }} >


                                    {handleSearch()?.slice((page - 1) * 16, (page - 1) * 16 + 16).map((row) => {
                                        return (    
                                                <Paper onClick={() => navigate(`/voucher`, { state: { data: { "row":row,"auth":auth,"id":id, "name":row.name } } })} elevation={12} sx={{ marginTop: { lg: "2rem", md: "1.8rem", xs: "0rem" }, width: { lg: 270, md: 250, sm: 230, xs: 140 }, position:'relative' , display:'inline-block' ,padding: "0.6rem", borderRadius: 2 }} >
                                                    {
                                                        row.discount > 0 ? 
                                                        <Typography sx={{ position:"absolute" , right:0 , border:{lg:'2px solid white' , xs:"1px solid white"} , padding:{lg:"0rem 1.2rem" , xs:"0rem 0.6rem"} , borderRadius:'0.3rem'  , fontFamily:"montserrat" , fontWeight:500 ,background: 'linear-gradient(230deg, #08C8F6, #4D5DFB)' , color:'#fffb00' , fontSize:{lg:"16px" , xs:"12px"} }} >{row.discount}% off</Typography> :
                                                        null
                                                    }
                                                <Paper key={row.name} className='scale' elevation={8} sx={{ overflow: "hidden", width: { lg: 270, md: 250, sm: 230, xs: 140 }, height: { lg: 170, md: 170, sm: 130, xs: 85 }, display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'column' }} >
                                                    <Box key={row.productId} component="img" src={row.imageUrl} sx={{ width: { lg: 270, md: 250, sm: 230, xs: 140 }, borderRadius: 2 }} />
                                                </Paper>
                                                <hr />
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Typography sx={{ textAlign: 'center', color: '#575555', marginTop: '0.5rem', fontFamily: 'montserrat', fontWeight: 500, fontSize: { lg: "1rem", md: "1rem", xs: "0.6rem" } }} >{row.name}</Typography>
                                                    <NavigateNextIcon sx={{ marginLeft: 'auto', marginTop: '0.8rem', fontSize:{xs:"1rem"} }} />
                                                </Box>


                                            </Paper> 
                                         )
                                    })
                                    }
                                </Box>
                            </Box>}
                </Box>

                <Pagination
                    size="small"
                    sx={{
                        // padding:50,
                        width: "auto",
                        display: 'flex',
                        alignContent: 'center',
                        justifyContent: 'center',
                        marginTop: { lg: "4rem", md: "3rem", xs: "1.5rem" }
                    }}
                    variant='outlined'
                    color='secondary'
                    count={(handleSearch()?.length / 16).toFixed(0)}

                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 730)
                    }}
                />


            </Box>
        </Box>
    )
}

export default CashBackOffer