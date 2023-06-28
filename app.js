
const express  = require('express');
const app = express ();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


const adminsrouter = require('./routers/adminsrouter');
app.use("/api/adminstrators",adminsrouter)






app.listen(3000,()=>{
    console.log("server is running on port 3000");
    
})