
const express  = require('express');
const app = express ();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const{connection,knex}=require('./connections')



  // checked and worked on (http://localhost:3000/api/airlineCompanies)
  const getAllAirlineCompaniesDB = async (req, res) => {
    const result = await knex.raw(`select * from airline_companies`)
    return result
  }
  
  // app.get('/api/airlineCompanies', getAllAirlineCompaniesDB);


 //GET THE AIRLINE COMPANIES BY ID

  // checked and worked on(http://localhost:3000/api/airlineCompanies/:id)
  const getAirlineByIdDB = async (req, res) => {
    try {
      const airlineId = req.params.id;
      const result = await knex.raw((resolve, reject) => {
        connection.query('SELECT * FROM airline_companies WHERE id = ?', [airlineId], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
  
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).send("Airline not found");
      }
    } catch (err) {
      res.status(500).send("Error in the database: " + err);
    }
  };
  
  app.get('/api/airlineCompanies/:id', getAirlineByIdDB);
  

 //FUNCTION TO GET AN AIRLINE COMPANY

const addAirlineCompanyDB = (req, res) => {
  const { airline_name, country_id } = req.body;

  const newAirline = {
    airline_name: airline_name,
    country_id: country_id
  };
  connection.query("INSERT INTO airline_companies SET ?", newAirline, (err, result) => {
    if (err) {
      res.status(500).send("Error in the database: " + err);
    } else {
      res.send("Airline company added successfully");
    }
  });
};
app.post("/api/airline_companies",addAirlineCompanyDB)

//FUNCTION TO REMOVE AN AIRLIINE COMPANY BY ID

 // check on(http://localhost:3000/api/airlineCompanies/:id)
const removeAirlineDB = (req, res) => {
    const airlineId = req.params.id;
    connection.query("DELETE FROM airline_companies WHERE id = ?", [airlineId], (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
        if (result.affectedRows > 0) {
          res.send("Airline removed successfully");
        } else {
          res.status(404).send("Airline not found");
        }
      }
    });
  };
  app.delete('/api/airline_companies/:id', removeAirlineDB);

//FUNCTION TO UPDATEAIRLINE COMAPNY
 //check on(http://localhost:3000/api/airlineCompanies/:id)
const updateAirlineCompanyDB = (req, res) => {
  const airlineId = req.params.id;
  const updatedAirline = req.body;
  connection.query(
    "UPDATE airline_companies SET ? WHERE id = ?",
    [updatedAirline, airlineId],
    (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
        if (result.affectedRows > 0) {
          res.send("Airline company updated successfully");
        } else {
          res.status(404).send("Airline company not found");
        }
      }
    }
  );
};
app.put('/api/airline_companies/:id', updateAirlineCompanyDB);



module.exports={
  updateAirlineCompanyDB,
  removeAirlineDB,
  addAirlineCompanyDB,
  getAirlineByIdDB,
  getAllAirlineCompaniesDB
}