const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./Users");
const jwt = require("jsonwebtoken");
const url = require('url');
const querystring = require('querystring');
const fetch = require('node-fetch');
const { MongoClient } = require('mongodb');
const bodyParser = require("body-parser");

const dotenv = require('dotenv')
const buf = Buffer.from('BASIC=basic')
const config = dotenv.parse(buf) // will return an object


require('dotenv').config();

require("./Config");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "200mb",  extended: true, parameterLimit: 1000000 }));

// app.use(express.urlencoded({ extended: true }))

app.get("/" , async(req , resp) => {
  resp.send("Welcome to eezib voucher mania")
})



// ******************* AUTHENTICATION API ************************

app.post("/auth"  , async (req , resp ) => {

  const token = req.headers['authorization'];
  console.log("token : ",token)
  
  const auth = token.replace("Bearer ","")
  console.log("auth Token : ",auth)
  
    if(token){
      try{

        const url = process.env.UAPI
  
        const tokenData =await fetch(`${url}/api/validate_user`,{
      method:"POST",
      headers:{
        "Accept":"application/json",
        "Authorization":`Bearer ${auth}`
      },
      body:JSON.stringify()
    })
    
  
    const api =await tokenData.json();
    console.log("api : ",api)
    resp.send(api)
    }catch(err){
      resp.send("error is : ",err);
      resp.status(404).json({ error: "Internal Server Error for auth" }); 
    }
      }else{
        console.log("new user");
    }


});


app.get('/cards', async (req, res) => {

  // ******************* DATABASE CONNECTION URL *****************************

  const connectionString = process.env.URL
  const url = `${connectionString}`;

  // ********************* DATABASE CONNECTION URL *****************************

  const database = process.env.DB_NAME
  const dbName = `${database}`


  // ******************* COLLECTION NAME **********************
  const collection = process.env.COLLECTION_NAME
  const collectionName = `${collection}` 

  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

 

    // ******************** Find Data from MongoDB **********************

    const findData  =await collection.findOne();
    if(findData){

      res.send(findData.data)

    }else{

         // ******************** Fetching API request **********************

         try{
           const url = process.env.UAPI
  
            const apiData = await fetch(`${url}/api/vouchers`);
            const resp = await apiData.json();
            console.log("cards else resp : ",resp)
            const findAndReplace = await collection.insertOne(resp);
            res.send(findAndReplace)
         }catch(err){
          res.status(404).json({ error: "Internal Server Error for cards api" });   
         }

    }


  } catch (err) {
    console.error('Error:', err.message);

    res.send('Internal Server Error :',err);
  } finally {
    await client.close();
    console.log("connection closed")
  }
});


app.post('/filterData' , async(req , resp) => {
    const name = req.body.name
    console.log(name)

    const url = process.env.UAPI;
    
    const data = await fetch(`http://divanshu.local:5000/cards`);
    const json = await data.json()

    const filter = json.filter((data) => {
      return data.name === name
    })
    console.log("filter data : ",filter)

    resp.send(filter)


})


app.post("/pushVoucher" , async(req ,resp) => {

  const connectionString = process.env.URL
  const url = `${connectionString}`;

  // ********************* DATABASE CONNECTION URL *****************************

  const database = process.env.DB_NAME
  const dbName = `${database}`

  // ******************* COLLECTION NAME ****************************************
  const collection = process.env.COLLECTION_NAME
  const collectionName = `${collection}` 
  
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try{
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // ***************** Getting Data from Body ********************

    const voucherData =await req.body;


    // fetching data from database

    const dbData =  await collection.findOne();

    // const respo =await db.collection.findOneAndUpdate(voucherData);
    const respo = await collection.findOneAndReplace(dbData,voucherData)

    if(respo){
      resp.send({responce:"data insterted successfully"})
    }else{
      resp.send({responce:"data insertion failed"})
    }
  }catch(err){
    resp.send({err})
    console.log(err)
  }finally{
    await  client.close() ;
    console.log("connection closed")
  }

})

app.post("/order" , async(req , resp) => {

  try{

    // ******************** body data required for api *****************
    const data = await req.body;
    console.log(data)

  // ********************** Authorization token ***********************

  const authToken = req.headers['authorization'];
  console.log("auth token",authToken)

  const url = process.env.UAPI

    const apiReq = await fetch(`${url}/api/orders` , {
      method : "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`
    },
    body:JSON.stringify(data)
    })
    const respo = await apiReq.json()
    console.log("responce : ",respo)
    resp.send(respo)
    
  }catch(err){
    resp.status(404).json({ error: "Internal Server Error for order api" }); 
  }

  

})




app.listen(5000)



