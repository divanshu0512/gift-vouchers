import { Box } from '@mui/material';
import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css';

function BestOffers() {

    const items = [
        <Box component='img' sx={{borderRadius:"15px", width:{xs:"18rem" , md:"22rem", lg:'22rem'}}} src="./eezib/alice/ADDIDAS.jpg" />,
        <Box component='img' sx={{borderRadius:"15px", width:{xs:"18rem" , md:"22rem", lg:'22rem'}}} src="./eezib/alice/blinkit.jpg" />,
        <Box component='img' sx={{borderRadius:"15px", width:{xs:"18rem" , md:"22rem", lg:'22rem'}}} src="./eezib/alice/amazon2.jpg" />,
        <Box component='img' sx={{borderRadius:"15px", width:{xs:"18rem" , md:"22rem", lg:'22rem'}}} src="./eezib/alice/Starbucks.jpg" />,
        <Box component='img' sx={{borderRadius:"15px", width:{xs:"18rem" , md:"22rem", lg:'22rem'}}} src="./eezib/alice/BASKINROBBINS.jpg" />,
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

  return (
    <Box sx={{margin:'1.5rem' , textAlign:'center' }} >
        <AliceCarousel
        mouseTracking
        items={items} 
        autoPlay
        animationDuration={800}  
        infinite
        responsive={responsive}
        disableButtonsControls
        disableDotsControls
        autoPlayInterval={2500}
      
          />
    </Box>
  )
}

export default BestOffers