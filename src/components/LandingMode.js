import { Box, Card, CardActions, CardContent, CardMedia, Paper, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CashBackOffer from './FoodCashBackOffer';

const LandingMode = () => {

    const navigate = useNavigate();

    const [filter , setFilter] = React.useState('')

    const handleClick = (e) => {
       setFilter(e.target.title);
       console.log("e : ",e.target.title)
       window.scroll(0,480)
        
    }
  return (
    <Box sx={{marginTop:'3rem' ,}} >
    <Typography sx={{textAlign:'center' , fontFamily:'montserrat' , fontWeight:600, fontSize:{lg:"1.5rem",md:"1.3rem",xs:"1.2rem"} }}  >Online Shopping Catagories</Typography>
        <Box id="mode" sx={{display:'grid' , gridTemplateColumns:{lg:"repeat(7,1fr)" , md:"repeat(4,1fr)", xs:"repeat(3,1fr)" } , gridColumnGap:'0rem' , gridRowGap:'1.2rem' , marginTop:"2rem"  }} >
             
                        <Box sx={{display:'flex' , alignItems:'center',justifyContent:'center', flexDirection:'column' }} >

                        <Card elevation={4} className="scale" sx={{ width:{lg:80,md:80,xs:60}, maxWidth: 345 , padding:"1rem"  , borderRadius:"48%"}}>
                            <CardMedia
                                sx={{ height:{lg:80,md:80,xs:60}  }}
                                image="./eezib/images/entertainment.png"
                                title="entertainment"
                                onClick={(e) => handleClick(e)}
                                />
                            
                                {/* <Typography sx={{ fontFamily:'montserrat', fontWeight:600 , fontSize:"1rem" , textAlign:'center', margin:'0.5rem' }} >
                                Entertainment
                            </Typography> */}

                            </Card>
                                <Typography sx={{ fontFamily:'montserrat' , fontWeight:500 , marginTop:'1rem', fontSize:{lg:"1rem" , md:"1rem", xs:"0.8rem"} }} >Entertainment</Typography>
                            </Box>


                        <Box sx={{display:'flex' , alignItems:'center' , justifyContent:'center' , flexDirection:'column'}} >
                            <Card className="scale" elevation={4} sx={{width:{lg:80,md:80,xs:60}, maxWidth: 345  , padding:"1rem" , borderRadius:"48%" }}>
                            <CardMedia
                                sx={{ height:{lg:80,md:80,xs:60}  }}
                                image="./eezib/images/shoping.png"
                                title="accessories"
                                onClick={(e) => handleClick(e)}
                                />

                            </Card>
                            <Typography sx={{ fontFamily:'montserrat' , fontWeight:500 , marginTop:'1rem' , fontSize:{lg:"1rem" , md:"1rem", xs:"0.8rem"} }} >Shopping</Typography>
                        </Box>

                        <Box sx={{display:'flex' , alignItems:'center' , justifyContent:'center' , flexDirection:'column'}} >
                            <Card className="scale" elevation={4} sx={{width:{lg:80,md:80,xs:60}, maxWidth: 345  , padding:"1rem" , borderRadius:"48%" }}>
                            <CardMedia
                                sx={{ height:{lg:80,md:80,xs:60}  }}
                                image="./eezib/images/travell.png"
                                title="travel"
                                onClick={(e) => handleClick(e)}
                                />
   
                            </Card>
                            <Typography sx={{ fontFamily:'montserrat' , fontWeight:500 , marginTop:'1rem' ,fontSize:{lg:"1rem" , md:"1rem", xs:"0.8rem"} }} >Travel</Typography>
                        </Box>


                        <Box sx={{display:'flex' , alignItems:'center' , justifyContent:'center' , flexDirection:'column'}} >

                            <Card className="scale" elevation={4} sx={{width:{lg:80,md:80,xs:60}, maxWidth: 345  , padding:"1rem" , borderRadius:"48%" }}>
                            <CardMedia
                                sx={{ height:{lg:80,md:80,xs:60}  }}
                                image="./eezib/images/wellnes.png"
                                title="wellness"
                                onClick={(e) => handleClick(e)}
                                />
   
                            </Card>
                            <Typography sx={{ fontFamily:'montserrat' , fontWeight:500 , marginTop:'1rem' , fontSize:{lg:"1rem" , md:"1rem", xs:"0.8rem"} }} >Wellness</Typography>
                        </Box>

                        <Box sx={{display:'flex' , alignItems:'center' , justifyContent:'center' , flexDirection:'column'}} >

                            <Card className="scale" elevation={4} sx={{width:{lg:80,md:80,xs:60}, maxWidth: 345  , padding:"1rem" , borderRadius:"48%" }}>
                            <CardMedia
                                sx={{ height:{lg:80,md:80,xs:60}  }}
                                image="./eezib/images/gifting.png"
                                title="gift"
                                onClick={(e) => handleClick(e)}
                            />
      
                            </Card>
                            <Typography sx={{ fontFamily:'montserrat' , fontWeight:500 , marginTop:'1rem' ,fontSize:{lg:"1rem" , md:"1rem", xs:"0.8rem"} }} >
                                Gifting
                            </Typography>
                        </Box>
                            


                            
                        <Box sx={{display:'flex' , alignItems:'center' , justifyContent:'center' , flexDirection:'column'}} >

                            <Card className="scale" elevation={4} sx={{width:{lg:80,md:80,xs:60}, maxWidth: 345  , padding:"1rem" , borderRadius:"48%" }}>
                            <CardMedia
                               sx={{ height:{lg:80,md:80,xs:60}  }}
                                image="./eezib/images/diningg.png"
                                title="food"
                                onClick={(e) => handleClick(e)}
                                />
 
                            </Card>
                            <Typography sx={{ fontFamily:'montserrat' , fontWeight:500 , marginTop:'1rem', fontSize:{lg:"1rem" , md:"1rem", xs:"0.8rem"} }} >Dinning</Typography>
                        </Box>




                        <Box sx={{display:'flex' , alignItems:'center' , justifyContent:'center' , flexDirection:'column'}} >

                            <Card className="scale" elevation={4} sx={{width:{lg:80,md:80,xs:60}, maxWidth: 345  , padding:"1rem" , borderRadius:"48%" }}>
                            <CardMedia
                                sx={{ height:{lg:80,md:80,xs:60}  }}
                                image="./eezib/images/grocery.png"
                                title="grocery"
                                onClick={(e) => handleClick(e)}
                                />
 
                            </Card>
                            <Typography sx={{ fontFamily:'montserrat' , fontWeight:500 , marginTop:'1rem' ,fontSize:{lg:"1rem" , md:"1rem", xs:"0.8rem"} }} >Grocery</Typography>
                        </Box> 
                            </Box>

                            
                    < CashBackOffer someData={filter} />
    </Box>
  )
}

export default LandingMode