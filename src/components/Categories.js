import { AppBar, Box, CircularProgress, IconButton, Pagination, Paper, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';
import image from "../images/eezib2.png"
import env from 'react-dotenv';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


function Categories() {
    const [value, setValue] = React.useState();
    const [page, setPage] = React.useState(1);
    const [auth, setAuth] = React.useState("");
    const [id, setId] = React.useState("");
    const [resp, setResp] = React.useState(""); 
    const [ process , setProcess ] = React.useState(false);



    const navigate = useNavigate();

    const location = useLocation();

    React.useEffect(() => {
        try{
            const respo = location.state.data;
        const datas = Object.values(respo);
        const values = datas[0]
        const token = values.token;
        setAuth(token)
        const name = values.value;
        setResp(name)
        const userId = values.id;
        setId(userId)
        }catch(err){
            window.alert("routes cannot be accessed directly");
            navigate(-1)
            window.location.reload();
        }
     }, [])


    async function getData() {
        setProcess(true)

        const base = env.REACT_APP_UAPI_URL
        // console.log(endpoint)
          
        const api = await fetch(`${base}/eezibapi/cards`);
        const respo = await api.json();
        setValue(respo);
        setProcess(false)
    }

    const handleSearch = () => {
        return value?.filter((data) =>
            data.categories.toLowerCase().includes(resp) ||
            data.categories.toUpperCase().includes(resp)    
        ) }

    React.useEffect(() => {
        getData()
    }, [])

    const base = env.REACT_APP_UAPI_URL


    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >

            <AppBar position='inherit' className="navbar" >
                <Toolbar variant='dense' >
                    <Box sx={{display:"flex" , alignItems:'center', gap:0}} > 
                    <ArrowBackIosNewIcon sx={{cursor:'pointer' , fontSize:{lg:"2rem" , xs:"1.5rem"}}} onClick={() => navigate(-1)} />
                        <Box sx={{ width: { lg: "10rem", xs: "8rem" }, padding: { lg: "0.6rem 0rem 0.6rem 0rem", xs: "0.3rem 0rem 0.3rem 0rem" } }} onClick={() => navigate(-1)} component='img' src={image} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }} >
                        <Typography sx={{ fontFamily: 'montserrat', fontWeight: 600, fontSize:{lg:"1rem" , xs:"0.8rem"}, color: 'white' }}  >Your Prefrence : </Typography> &nbsp;
                        <Typography sx={{ fontFamily: 'montserrat', fontWeight: 600,  fontSize:{lg:"1rem" , xs:"0.8rem"}, color: '#1480d9' }}  >{resp}</Typography>
                    </Box>
                </Toolbar>
            </AppBar>


            

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 'rem' }} >



{
    process ? <CircularProgress size="10rem" thickness={1.5} sx={{ color: 'skyblue', marginTop: "3rem" }} /> :

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >



            <Box sx={{ marginTop: "2rem", display: 'grid', gridTemplateColumns: { lg: "repeat(4,1fr)", sm: "repeat(2,1fr)", md: "repeat(3,1fr)", xs: "repeat(2,1fr)" }, gridColumnGap: { lg: '1.5rem', sm: "2rem", md: '4rem', xs: '1rem' }, gridRowGap: '2.5rem' }} >


            {handleSearch()?.slice((page - 1) * 16, (page - 1) * 16 + 16).map((row) => {
                                        return (

                                                
                                                <Paper onClick={() => navigate(`/voucher`, { state: { data: { row, auth, id } } })} elevation={12} sx={{ marginTop: { lg: "2rem", md: "1.8rem", xs: "0rem" }, width: { lg: 270, md: 250, sm: 230, xs: 140 }, position:'relative' , display:'inline-block' ,padding: "0.6rem", borderRadius: 2 }} >
                                                    {
                                                        row.discount > 0 ? 
                                                        <Typography sx={{ position:"absolute" , right:0 , border:{lg:'2px solid white' , xs:"1px solid white"} , padding:{lg:"0rem 1.2rem" , xs:"0rem 0.6rem"} , borderRadius:'0.3rem'  , fontFamily:"montserrat" , fontWeight:500 ,background: 'linear-gradient(230deg, #08C8F6, #4D5DFB)' , color:'#fffb00' , fontSize:{lg:"16px" , xs:"12px"} }} >{row.discount}% off</Typography> :
                                                        null

                                                    }
                                                <Paper key={row.name} className='scale' elevation={8} sx={{ overflow: "hidden", width: { lg: 270, md: 250, sm: 230, xs: 140 }, height: { lg: 170, md: 170, sm: 130, xs: 85 }, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >
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
            <Pagination
                    size="small"
                    sx={{
                        // padding:50,
                        width: "auto",
                        display: 'flex',
                        alignContent: 'center',
                        justifyContent: 'center',
                        marginTop: { lg: "4rem", md: "3rem", xs: "1.5rem" },
                        marginBottom:"1rem"
                    }}
                    variant='outlined'
                    color='secondary'
                    count={(handleSearch()?.length / 16).toFixed(0)}

                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 0)
                    }}
                />

        </Box>


}
</Box>
        </Box>
    )
}

export default Categories