//require mysql and checking if DB is up
const mysql2 = require('mysql2')
const connection = mysql2.createConnection({
    host:'localhost',
    user:'root',
    password:'Chenvenom1989',
    database:'myDB'
});
//testing
connection.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("connected to your DB")
    }
})

const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      port : 3306,
      user : 'root',
      password : 'Chenvenom1989',
      database : 'myDB'
    }
  });
  
  
  module.exports={
      connection,knex
  }