// // //all the APIS OF AIRLINE COMPANIES//const all airline companies func
 const express= require("express")
 const router = express.Router()
 const bodyParser  = require('body-parser')
 router.use(bodyParser.json())
 


const {getAllAirlineCompaniesDB } =require ("../model/airlinecompaniesDB")
//all apis
 

const getAllAirlineCompaniesR = async (req,res)=>{
    const result = await getAllAirlineCompaniesDB()
    res.send(result[0])
};




//get from DB

module.exports = {
    //updateAirlineCompanyDB,
   // removeAirlineDB,
   // addAirlineCompanyDB,
    //getAirlineByIdR,
    getAllAirlineCompaniesR};


