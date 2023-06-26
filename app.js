
const express  = require('express');
const app = express ();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
app.use(bodyParser.json())
app.use(cookieParser())
// const ejs = require('ejs')
//  const ejsLayout = require('express-ejs-layouts')
//  const path = require('path');
//  app.use(express.urlencoded({extended:true}))




// //Setting EJS 
// app.set('view engine', 'ejs');
//  app.set('views', path.join(__dirname, 'views'));
//  app.use(ejsLayout)
//  app.use(express.static('public'))

//  app.get('/', (req, res) => {
//      try{
//  const pageTitle = 'My EJS Page';
//    const currentDate = new Date().toDateString();
//    console.log("here");
//  res.render('index.ejs');
// }
//  catch(err){res.send(err)
//  }
//  });




//from app.js  reqire only from controlers




// airlinecompanies route 
const {

     getAllAirlineCompaniesR
     }=require("./routes/airlinecomRouter.js");
const { getAirlineByIdDB } = require('./model/airlinecompaniesDB.js');

app.get('/api/airlineCompanies',getAllAirlineCompaniesR)


app.get('/api/airlineCompanies/:id', getAirlineByIdDB)


















app.listen(3000,()=>{
    console.log("server is running on port 3000");
    
})