import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Breadcrumbs, Button, CircularProgress, FormControl, InputAdornment, InputLabel, Link, MenuItem, OutlinedInput, Paper, Select, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import DownloadIcon from '@mui/icons-material/Download';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import image from "../images/eezib2.png";
import eezib from "../images/eezib.png"
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import env from "react-dotenv";
import Slide from '@mui/material/Slide';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useDispatch, useSelector } from 'react-redux';
import { orderSlice } from '../redux/order';



function Voucher() {

    const [data, setData] = React.useState([]);
    const [menuData, setMenuData] = React.useState();
    const [denomination, setSelectedMenu] = React.useState("");
    const [quantity, setQuantity] = React.useState('');
    const [user, setUser] = React.useState([]);
    const [user_id, setUserId] = React.useState("");
    const [jsonData, setJsonData] = React.useState(null);
    const [respo, setRespo] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [totalQuantity , setTotalQuantity] = React.useState('')
    const [fee , setFee] = React.useState('');
    const [value , setValue] = React.useState(false);
    const [totalAmount , setTotalAmount] = React.useState("");
    const [newOpen , setNewOpen] = React.useState(false);
    const [discountMargin , setDiscountMargin] = React.useState("");
    const [discountNum , setDiscountNum] = React.useState("");
    const [totalDiscount , setTotalDiscount] = React.useState("");
    const [errormsg , setErrormsg] = React.useState('')
    const [progress , setProgress] = React.useState(false);
    const [loginDialog , setLoginDialog] = React.useState(false);
    const [userName , setUserName] = React.useState('');
    const [password , setPassword] = React.useState('');
    const [name , setName] = React.useState('');
    const [loading , setLoading] = React.useState(false)
    const [feeAmount , setFeeAmount] = React.useState('');



    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {item , isLoading , isError} = useSelector((state) => state.order);
    // const orderData = useSelector((state) => state.order.data)
    // const orderMsg = useSelector((state) => state.order.data.msg)
    console.log("order msg : ",item)
  

    React.useEffect(() => {
 
        try{
            const values = location.state.data.row;
            setData([values])
            setLoading(true)
            const name = location.state.data.name;
            const user = location.state.data.auth;
            const uid = location.state.data.id;
            
            setUser(user) 
            setUserId(uid);
            
            setLoading(false)

            }catch(err){
                // window.location.reload();`
                window.alert("Hold on! Direct access to this page isn't supported.")
                window.location.reload();
                navigate(-1)

            
       }
    }, [])

    const handleClose = () => {
        setOpen(false);
        setNewOpen(false);
        window.location.reload();
    };





    const menuItemData = () => {
        try{
            return data.map((a) => {
                const properdata = a.valueDenominations;
                const data1 = properdata.split(",");
                setMenuData(data1)
                return data1
    
            })
        }catch(err){
        }}

    const handleDenominationChange = (e) => {
        setSelectedMenu(e.target.value);
    }


    function handleAmount() {
        try{

            return data?.map((e) => {
                const discValue = !value ? quantity * denomination * (e.discount/100) : totalQuantity * denomination * (e.discount/100);
                setDiscountMargin(discValue);
                // const total = quantity * denomination - discValue;
                const total0 = !value ?  quantity * denomination - discValue : totalQuantity * denomination - discValue ;
                console.log("sub total : ",total0)
                const increasedAmount = (total0 * e.fee) / 100;
                setFee(e.fee)
                setFeeAmount(increasedAmount)
                
                const total = total0 + increasedAmount;
                console.log("total : ",total)
                setTotalAmount((Math.round(total * 100)/100).toFixed(2))
                setDiscountNum(e.discount);
            })

        }catch(err){
        }
        
        
    }

    React.useEffect(() => {
        
        menuItemData()
        window.scroll(0, 0)
    }, [data])


    // *************************************** API FOR MAKING ORDER PURCHASE **********************************


    async function purchaseOrder() {


        
        
        setOpen(true);
      
        handleAmount();
    }


    
    
    
    
    const placeOrder = async() => {
        setOpen(false)
        setNewOpen(true)
        setProgress(true)
        
        try {
            
            const data1 = data?.map(x => x.productId);
            const productID = data1[0];
            const productId = String(productID)
            
            const userDetails =  {"user_id": user_id, "productId": productId , "json": jsonData , "quantity": value ? totalQuantity : quantity, "denomination": denomination, "discount_amt":discountMargin ? discountMargin : 0 , "discount":discountNum ? discountNum : 0, "final_amt" : totalAmount, "fees":fee,  "feeAmount":feeAmount }

           dispatch(orderSlice({"userDetails":userDetails, "token":user}))

        } catch (error) {
            console.log("order error : ",error)
            // window.alert("sorry, an error has been occurred ");
            // navigate("/eezib")
        }

    }

    // *************************************** DOWNLOAD EXCEL LOGIC *******************************************
    

    const handleDownload = () => {
        const data = [
            ['name' ,'contact', 'email' , 'quantity'],
          
        ];

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(data);

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        saveAs(blob, 'sample.xlsx');
    };


    // ************************************************** VALIDATING EXCEL LOGIC ******************************************

    const validateExcelContent = (base64Data) => {
        const data = atob(base64Data);
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        let isValid = true;
        let sumQuantity = 0;
    
        const expectedHeaders = ['name', 'contact', 'email', 'quantity'];
        const headers = Object.keys(sheet)
          .filter((key) => /^[A-Z]+1$/.test(key))
          .map((key) => sheet[key].v);
    
        if (JSON.stringify(headers) !== JSON.stringify(expectedHeaders)) {
          alert('Invalid headers in the uploaded Excel file.');
          window.location.reload()
          return;
        }
    
        const seenContacts = new Set();
    
        for (const cellAddress in sheet) {
          if (sheet.hasOwnProperty(cellAddress)) {
            if (/^[B]+[2-9]\d*$/.test(cellAddress)) {
              const contactCellValue = sheet[cellAddress].v;
    
              if (!/^\d{10}$/.test(contactCellValue)) {
                alert(`Invalid contact number format in ${cellAddress}. Contact number must be 10 digits long.`);
                window.location.reload()
                isValid = false;
                break;
              }
    
            //   if (seenContacts.has(contactCellValue)) {
            //     alert(`Duplicate contact number found in ${cellAddress}.`);
            //     window.location.reload()
            //     isValid = false;
            //     break;
            //   }
    
              seenContacts.add(contactCellValue);
            } else if (/^[C]+[2-9]\d*$/.test(cellAddress)) {
              const emailCellValue = sheet[cellAddress].v;
    
              if (!validateEmail(emailCellValue)) {
                alert(`Invalid email format in ${cellAddress}.`);
                window.location.reload()
                isValid = false;
                break;
              }
            } else if (/^[D]+[2-9]\d*$/.test(cellAddress)) {
              const quantityCellValue = sheet[cellAddress].v;
    
              if (isNaN(quantityCellValue) || quantityCellValue > 10) {
                alert(`Invalid quantity in ${cellAddress}. Quantity must not exceed 10`);
                window.location.reload()
                isValid = false;
                break;
              }

              if(quantityCellValue.toString().includes('-')){
                alert(`Quantity cannot be negative in ${cellAddress}`);
                window.location.reload()
                isValid= false;
                break;
              }
    
              sumQuantity += quantityCellValue;
            }
          }
        }
    
        if (isValid) {
          alert('Excel uploaded successfully.');
          setValue(true)
          setTotalQuantity(sumQuantity);
        }
      };
    
      const validateEmail = (email) => {
        // Simple email validation regex
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
      };
    
      const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
    
        if (selectedFile) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64Data = e.target.result.split(',')[1];
            setJsonData(base64Data);
            // Validate the Excel content
            validateExcelContent(base64Data);
          };
          reader.readAsDataURL(selectedFile);
        }
      };

      const openLoginHandle = () => {
        setLoginDialog(true)
      }

      const closeLoginDialog =() => {
            setLoginDialog(false)
      }

      // ************************************ Voucher page login auth ******************************************

      async function getData(){
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
    
            const token = json.access_token;
            setUser(token);

            if(json){
                const id = json.user.id;
                setUserId(id)
    
                const name = json.user.name;
                setName(name)
                navigate("/", {state : {login :{"user":token, "user_id":id , "name":name }}})

            }else if(json.error){
                window.alert("invalid credentials");
                setLoginDialog(false)
            }
        
            setLoginDialog(false)
        }catch(err){

            window.alert(err)
        }
      }

      async function validateQuantity(value){
        console.log("value : ",parseFloat(value))
        if(value < 1 && value !== ''  ){
            window.alert("quantity should not be zero or negative ");
            setQuantity(1)
            // window.location.reload();
        }
         else if(value > 10){
                window.alert("cannot exceed quantity by 10")
                setQuantity(10)
            
         }
        else{
            setQuantity(value)
        }
      }
    

    return (
        <Box   >
            {
                loading ? <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", marginTop:'30%' }} > <CircularProgress  /> </Box>  : 
                data?.map((row) => {
                    return (
                        <Box sx={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }} >
                            <AppBar position='static' sx={{ background:"linear-gradient(20deg, rgb(0, 149, 255), rgb(30, 255, 240))" }} >
                                <Toolbar sx={{ display:'flex' , alignItems:'center' , justifyContent:'space-between' }} >
                                    <Box sx={{display:"flex" , alignItems:'center' , justifyContent:'center'}} >  
                                        <ArrowBackIosNewIcon sx={{cursor:'pointer' , fontSize:{lg:"2rem" , xs:"1.5rem"}}} onClick={() => navigate(-1)} />
                                        <Box component="img" onClick={() => navigate(-1)} sx={{width:"8rem"}} src={image} />
                                    </Box>
                                        <Typography sx={{  fontFamily: 'montserrat' ,cursor: "pointer", fontWeight: 500, fontSize: { lg: "1.3rem", xs: "0.7rem" }, color: 'white' , textShadow:"2px 2px 6px black" }} >{row.name}</Typography>
                                    </Toolbar>
                            </AppBar>

                            <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', flexDirection: { lg: "row", xs: "column" } }} >

                                <Box sx={{ margin: { lg: "2rem", xs: "0rem" }, marginTop: { xs: "2rem", lg: "2rem" }, width: { lg: "40%", xs: "100%" }, display: 'flex', alignItems: 'center', flexDirection: 'column' }} >


                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                        <Typography sx={{ fontFamily: 'montserrat', fontWeight: 500 }} >Validity :&nbsp; </Typography>
                                        {/* <Typography sx={{ fontFamily: 'montserrat', fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: row?.expiryAndValidity.replace("&nbsp;", "") }}></Typography> */}

                                    </Box>

                                    <Paper elevation={18} component='img' src={row.imageUrl} sx={{ borderRadius: 3, marginTop: 1, marginBottom:"0.5rem" ,width: { xs: "20rem", lg: "23rem" } }} />

                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >

                                        <Accordion sx={{ width: { lg: "25rem", xs: "21rem" }, marginTop: "1.6rem" }} >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ fontFamily: "montserrat", fontWeight: 500 }} >Description</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ maxHeight:"200px" , overflowY:"auto" }} >
                                                <Typography sx={{ fontFamily: "montserrat", fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: row?.description }} />
                                            </AccordionDetails>
                                        </Accordion>

                                        <Accordion sx={{ width: { lg: "25rem", xs: "21rem" }, marginTop: { lg: "1rem", xs: "0.9rem" } }} >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                                
                                            >
                                                <Typography sx={{ fontFamily: "montserrat", fontWeight: 500 }} >Terms and Conditions</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ maxHeight:"200px" , overflowY:"auto" }} >
                                                <Typography sx={{ fontFamily: "montserrat", fontWeight: 500, margin: '0.8rem' }} dangerouslySetInnerHTML={{ __html: row?.termsAndConditionsInstructions }} />

                                            </AccordionDetails>
                                        </Accordion>

                                        <Accordion sx={{ width: { lg: "25rem", xs: "21rem" }, marginTop: { lg: "1rem", xs: "0.9rem" } }} >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ fontFamily: "montserrat", fontWeight: 500 }} >Redemption Instructions</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ maxHeight:"200px" , overflowY:"auto" }} >
                                                <Typography sx={{ fontFamily: "montserrat", fontWeight: 500, margin: '0.8rem' }} dangerouslySetInnerHTML={{ __html: row?.redemptionInstructions }} />

                                            </AccordionDetails>
                                        </Accordion>

                                    </Box>


                                    <Box sx={{ display: 'flex', alignItems:'center' , justifyContent:'space-between'  , marginTop: '1rem' , flexDirection:'column' }} >

                                        <Box sx={{ display: 'flex' , alignItems:'center' , justifyContent:'center'}} >
                                            <Typography sx={{ fontFamily: "montserrat", fontWeight: 450, fontSize: "1rem" }} >Delivery : </Typography> &nbsp;
                                            <Typography sx={{ fontFamily: "montserrat", fontWeight: 450, fontSize: "1rem" }}  >{row.deliveryType}</Typography>
                                        </Box>
                                        &nbsp;
                                        <Box sx={{marginTop:"-0.50rem"}}>
                                            {
                                                data?.map((e) => {
                                                    return (
                                                        <Typography sx={{fontFamily:'montserrat' , fontWeight:500}} >current discount : {e.discount}%</Typography>
                                                    )
                                                })
                                            }
                                        </Box>
                                    </Box>


                                </Box>

                                <Box sx={{ height: 'auto', width: { lg: "60%", xs: "100%" }, display: 'flex', alignItems: 'center', flexDirection: 'column' }} >

                                    <Box sx={{ marginTop: { lg: "5rem", xs: "2rem" }, backgroundColor: 'white', display: 'flex', flexDirection: 'column', borderRadius: 3, gap: '2rem', padding: { lg: "2.5rem", xs: "0.9rem" } }} >

                                       

   {/* ******************************************************* DENOMINATION FIELD ******************************************************* */}

                                        <FormControl sx={{ width: "20rem" }} >
                                            <InputLabel id="demo-simple-select-label" sx={{ fontFamily: 'montserrat', fontWeight: 500 }} >Enter Denomination</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                // value={row.valueDenominations.split(",")}
                                                label="Enter Denomination"
                                                sx={{ fontFamily: 'montserrat', fontWeight: 500, }}
                                                onChange={handleDenominationChange}
                                                key={row.productId}

                                            >
                                                {
                                                    menuData?.map((e) => {
                                                        return (
                                                            <MenuItem sx={{ fontFamily: 'montserrat', fontWeight: 500 }} value={e} >{e}</MenuItem>
                                                        )
                                                    })
                                                }


                                            </Select>
                                        </FormControl>

                
                            
{/* *********************************************************** QUANTITY FIELD *************************************************** */}

                            {
                                value ?  <TextField  type='number' label="Quantity" focused value={totalQuantity} inputProps={{ style: { fontFamily: 'montserrat', fontWeight: 500  } }} /> :  <TextField  InputProps={{  inputProps: {  max: 10, min: 1  }
                                }}label="Quantity" value={quantity} type='number' onChange={(e) => totalQuantity ? setQuantity('') :  validateQuantity(e.target.value)} inputProps={{  }} />
                            }

                                <Typography sx={{fontFamily:'montserrat' , fontSize:"0.7rem" , textAlign:'right' , fontWeight:500 , color:"#8a8a8a" , marginTop:'-2rem'}} >max limit 10</Typography>

                                        {/* <TextField label="Quantity" onChange={(e) => setQuantity(e.target.value)} inputProps={{ style: { fontFamily: 'montserrat', fontWeight: 500 } }} /> */}

                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >

                                            {
                                                row.usageType ? <Box sx={{ display: 'flex', float: 'left' }} >
                                                    
                                                    <Typography sx={{ fontFamily: "montserrat", fontWeight: 450, fontSize: "1rem" }} >usage : </Typography>&nbsp;
                                                    <Typography sx={{ fontFamily: "montserrat", fontWeight: 500, color: 'blue' }} >{row.usageType}</Typography>
                                                </Box> : null
                                            }
                                            
                                             
                                            <Box sx={{ display: 'flex', alignItems: 'center' }} >
                                                <Typography sx={{ fontFamily: "montserrat", fontWeight: 450, fontSize: "1rem" }} >Fee :</Typography>&nbsp;
                                                <Typography sx={{ fontFamily: "montserrat", fontWeight: 450, fontSize: "1rem", color: 'red' }} >{row.fee}%</Typography>
                                            </Box>
                                            
                                            

                                            
                                        </Box>



                                        < hr style={{marginTop:"-0.5rem"}} />

                                        {/* {
                                menuData && quantity ?<Button onClick={() => navigate("/login")} variant='contained' sx={{fontFamily:'montserrat' , fontWeight:500 }} > Purchase </Button> : 
                                <Button disabled variant='contained' sx={{fontFamily:'montserrat' , fontWeight:500 }} > Purchase </Button>
                            } */}

                                        {
                                            user ? denomination && !isNaN(quantity) && quantity || value ? 
                                            <Button onClick={() => purchaseOrder()} variant='contained' sx={{ fontFamily: 'montserrat', fontWeight: 500 }} > Purchase @ ₹{ value ?  denomination*totalQuantity : denomination *quantity }</Button>
                                             : <Button disabled variant='contained' sx={{ fontFamily: 'montserrat', fontWeight: 500 }} > Purchase </Button> :
                                                <Button onClick={() => openLoginHandle()} variant='contained' sx={{ fontFamily: 'montserrat', fontWeight: 500 }} > login </Button>
                                        }


                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , flexDirection:'column' , margin:'0.5rem' }} >
                                        {/* <Box {...getRootProps()} sx={{ cursor: 'pointer', margin: '0.5rem', padding: '12px', textAlign: 'center' }}>
                                            <input {...getInputProps()} accept=".xlsx" />
                                            {isDragActive ? (
                                                <Typography  >Drop the Excel file here...</Typography>
                                            ) : (
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", fontSize: { lg: "1rem", md: "0.7rem", xs: "0.8rem" } }} > <UploadFileIcon sx={{}} />click to drop excel </Box>
                                            )}
                                        </Box> */}
                                            

                                        <Box>

                                        </Box>

                                        <Box sx={{ display:'flex' , alignItems:'center' , justifyContent:'center'    }} >
                                            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                                            {/* <button onClick={() => handleUpload(base64Content)} disabled={!base64Content}>
                                                    Upload File
                                                </button> */}
                                        </Box>


                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , marginTop:'0.6rem' }} >
                                            <DownloadIcon sx={{ color: '#066bd6' }} />
                                            <Button size='small' sx={{ fontFamily: 'montserrat', fontSize: { lg: "0.9rem", md: "0.7rem", xs: "0.7rem" } }} onClick={handleDownload} >download sample</Button>
                                        </Box>
                                    </Box>

                                </Box>

                            </Box>

                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                               
                            >
                                {/* <DialogTitle sx={{fontFamily:'montserrat' , fontSize:"1rem"}} id="alert-dialog-title">
                    {"Eezib brand vouchers"}
                    </DialogTitle> */}
                                <DialogContent sx={{ padding: "2rem 2.5rem" }} >
                            
                                        {
                                            data?.map((e) => {
                                                return(
                                                    <Box>
                                                    <Typography sx={{fontFamily:'montserrat' , fontWeight:500 , fontSize:"1.2rem"}} >Order Summary</Typography>
                                                    <br/>

                                                    <Box>
                                                    <Typography sx={{ fontFamily:'montserrat' , fontWeight:500 , fontSize:"1.1rem" }} > * Denomination value : {denomination} </Typography>
                                                    <Typography sx={{ fontFamily:'montserrat' , fontWeight:500 , fontSize:"1.1rem" , }} >* Quantity : {value ? totalQuantity : quantity} </Typography>
                                                    {
                                                        e.discount > 0 ?  <Typography sx={{ fontFamily:'montserrat' , fontWeight:500 , fontSize:"1.1rem" }} >* Eezib discount Rate : {e.discount}%  </Typography> : null
                                                    }
                                                     {
                                                        e.fee > 0 ? (<Typography sx={{ fontFamily:'montserrat' , fontWeight:500 , fontSize:"1.1rem" }} variant='h4'>* Fee : {e.fee} %</Typography>) : null
                                                    }

                                                    
                                                    <hr/>
                                                    &nbsp;
                                                    <Typography sx={{ fontFamily:'montserrat' , fontWeight:500 , fontSize:"1.1rem" }} >Total price : { !value ? denomination * quantity : denomination * totalQuantity }</Typography>
                                                    {
                                                        e.discount > 0 || e.fee ? <Typography sx={{ fontFamily:'montserrat' , fontWeight:500 , fontSize:"1.1rem" }} >Eezib price : ₹ { totalAmount}</Typography> : null
                                                    }
                                                    
                                                    
                                                    
                                                    <hr/>
                                                    &nbsp;
                                                   
                                                    <Button size='small' fullWidth variant='contained' sx={{fontFamily:'montserrat' , fontWeight:500 , fontSize:'0.8rem'}} onClick={placeOrder} >Place Order</Button>
                                                </Box>
                                                 </Box>
                                                )
                                            })
                                        }

                                    
                                   

                                </DialogContent>
                                
                            </Dialog>
                            

                            <Dialog
                                open={newOpen}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                
                                
                                <DialogContent>
                                 {
                                        isLoading ? <CircularProgress/> :
                                                    <Box>
                                                        {/* <Typography sx={{ fontFamily: 'montserrat', fontWeight: 500 , marginTop:"0.5rem" }} >{ !errormsg ? item.msg : errormsg }</Typography> */}
                                                            <DisabledByDefaultIcon size="small" onClick={handleClose} sx={{position:"absolute", marginTop:"-1rem", right:0, color:'red' }}  />
                                                    <Box sx={{position:'relative'}} >
                                                    {
                                                            item ? item.msg ? <Box>
                                                            &nbsp;

                                                         <Box sx={{ display: 'flex', alignItems: 'center' }} >
                                                        <Typography sx={{ fontFamily: 'montserrat', fontWeight: 500 }} >Quantity :&nbsp;</Typography>
                                                        <Typography sx={{ fontFamily: 'montserrat', fontWeight: 500 }} >{ item.quantity}</Typography>

                                                    </Box>

                                                    <Box sx={{ display: 'flex', alignItems: 'center' }} >
                                                        <Typography sx={{ fontFamily: 'montserrat', fontWeight: 500 }} >Order ID :&nbsp;</Typography>
                                                        <Typography sx={{ fontFamily: 'montserrat', fontWeight: 500, color: '#3881ff' }} >{item.order_id}</Typography>
                                                    </Box>

                                                    <Box sx={{ display: 'flex', alignItems: 'center' }} >
                                                        <Typography sx={{ fontFamily: 'montserrat', fontWeight: 500 }} >Total Amount :&nbsp;</Typography>
                                                        <Typography sx={{ fontFamily: 'montserrat', fontWeight: 500 }} >{totalAmount}</Typography>
                                                    </Box> 
                                                    
                                                    <Typography sx={{color:'gray' , fontFamily:'montserrat' , fontWeight:400 , fontSize:"0.9rem" , marginTop:"1rem" , textAlign:'center'}} >Thanks for contacting eezib</Typography>
                                                        </Box> : item.message ? <Typography>{item.message}</Typography> : item.error ? <Typography>{item.error}</Typography> : null : null
                                                        }
                                                        
                                                        

                                                        <Box sx={{display:'flex' , alignItems:'center', justifyContent:'center' , gap:1 , marginTop:'1rem'}} >  
                                                            <Button onClick={() => navigate(-1)} size='small' variant='contained' sx={{fontFamily:'montserrat' , fontWeight:400 , fontSize:"12px"}} >more cards</Button>
                                                            <Button  onClick={() => window.location.replace(`${env.REACT_APP_UAPI_URL}/login`)} size='small' variant='contained' sx={{fontFamily:'montserrat' , fontWeight:400, fontSize:"12px"}}  >back to eezib</Button>
                                                        </Box>
                                                        
                                                    </Box>
                                                   
                                                    </Box> 
                                            } 
                                </DialogContent>   
                            </Dialog>




                            <Dialog
                                open={loginDialog}
                                onClose={closeLoginDialog}
                                aria-describedby="alert-dialog-slide-description"
                                sx={{borderRadius:4}}
                                >

                                <DialogContent  sx={{ backgroundColor:'#e3e3e3'}} >
                                    {/* <Box component='img' sx={{width:'5rem'}} src={image} /> */}
                                <Box  sx={{ display:'flex' , alignItems:'center' ,justifyContent:'center' }}  >


                                        <Box sx={{ backgroundColor:"white", display:'flex' , alignItems:'center' ,justifyContent:'center', flexDirection:'column', borderRadius:2 , gap:"0.5rem" , backdropFilter:"blur(20px)", boxShadow:"0px 0px 10px 1px white" , padding:{lg:"1rem 2rem", xs:"1rem 0.5rem", sm:"2rem 1.5rem"}}} >
                                        {/* <Typography sx={{fontFamily:'montserrat' , fontWeight:700 , fontSize:"1.5rem" ,  marginTop:"1rem"}} >Login</Typography> */}
                                        
                                          <Box component='img' sx={{width:"5rem"}} src={eezib} /> 


                                            <TextField variant='standard' size='medium' onChange={(e) => setUserName(e.target.value) } value={userName} InputProps={{ endAdornment:( <InputAdornment position='end' > <PersonIcon  /> </InputAdornment> ) }} className='loginInput' sx={{width:'16rem'  , fontFamily:'montserrat', fontSize:'0.4rem' , marginTop:'2rem'}}  placeholder=" username" />
                                            <TextField variant='standard' onChange={(e) => setPassword(e.target.value) } value={password} InputProps={{ endAdornment:( <InputAdornment position='end' > <PasswordIcon  /> </InputAdornment> ) }} className='loginInput' sx={{width:'16rem' , fontFamily:'montserrat', marginTop:'2rem'}}   placeholder=" password" />
                                            <Typography onClick={() => window.location.replace(`${env.REACT_APP_UAPI_URL}/password/reset`)} sx={{ fontFamily:'montserrat',fontSize:"0.7rem" , marginLeft:"auto", cursor:'pointer'}} >forget password ?</Typography>

                                            <Button onClick={() => getData()} fullWidth size='medium' variant='contained' sx={{fontFamily:'montserrat' , marginTop:'1.5rem' , fontWeight:500}} >submit</Button>

                                            <Typography onClick={() => window.location.replace(`${env.REACT_APP_UAPI_URL}/register`)} sx={{fontFamily:'montserrat' , fontSize:"14px" , fontWeight:500 , marginTop:'1rem' , cursor:'pointer' , color:"#8a8a8a"}} >not registered yet ?</Typography>
                                        </Box>  

                                        </Box>
                                <DialogActions>
                            
                                </DialogActions>
                                </DialogContent>
                            </Dialog>

                             

                        </Box>
                    )
                })
            }
        </Box>
    )
}

export default Voucher