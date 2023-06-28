//  Route to get all countries
const express  = require('express');
const app = express ();
const bodyParser = require('body-parser');
app.use(bodyParser.json())



const countriesDBfunctions = require("/controllers/airlinecompaniesDB.js")

app.get("/api/getCountries/", (req, res) => {
    getCountries(req, res);
  });

  app.get("/api/getCountries/:id", (req, res) => {
    getCountriesById(req, res);
  });



// Function to retrieve all countries
 //checked and worked
 //for testing(http://localhost:3000/api/getCountries)
const getCountries = (req, res) => {
    connection.query('SELECT * FROM countries', (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
          //checking to see the terminal answer
         //console.log(result);
        res.json(result);
      }
    });
  };


  //function now changed to return country by id with a promise.
   //to check(https://localhost:3000/api/getCountryById?id=3)
  const getCountriesesById = (id) => {
    return ((resolve, reject) => {
      const query2 = `SELECT * FROM countries WHERE id = ?`;
      connection.query(query2, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
          console.log(result);
        }
      });
    });
  };
 // checked and worked
//getCountriesById(3) //running the function

 // Function to insert country into a table
const addCountry = (countryJson) => {
    const query3 = `INSERT INTO countries (country_name) VALUES ('${countryJson.country_name}')`;
    connection.query(query3, (err, result) => {
      if (err) {
        console.log("Error:", err);
      } else {
        console.log(result);
      }
    });
  };
  
  //const newCountry = {
     //"country_name": "Brazil"};
     //checked and worked
   //addCountry(newCountry); //running the function

   //function to remove a country
 //to check(http://localhost:3000/api/removeCountry/10)

app.delete("/api/removeCountry/:id", (req, res) => {
    const id = req.params.id;
    removeCountryById(id)
      .then((affectedRows) => {
        if (affectedRows > 0) {
          res.send(`Country with ID ${id} has been successfully removed`);
        } else {
          res.status(404).send(`Country with ID ${id} not found`);
        }
      })
      .catch((err) => {
        console.log("Error:", err);
        res.status(500).send("Error in the database");
      });
  });
  const removeCountryById = (id) => {
    return ((resolve, reject) => {
      const query4 = "DELETE FROM countries WHERE id = ?";
      connection.query(query4, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows); // Return the number of affected rows
        }
      });
    });
  };


 //function to update the country table
 //to check(http://localhost:3000/api/updateCountriesTable)

const updateCountriesTable = (country) => {
    return ((resolve, reject) => {
      const countryName = country.country_name
      const id = country.id
      const query5 = `UPDATE countries SET country_name = ? where id =?`;
      connection.query(query5, [countryName,id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows); // Return the number of affected rows
        }
      });
    });
  };
  app.put("/api/updateCountriesTable", (req, res) => {
    const country = req.body

    updateCountriesTable(country)
      .then((affectedRows) => {
        res.send(`Table has been successfully updated. ${affectedRows} rows affected.`);
      })
      .catch((err) => {
        console.log("Error:", err);
        res.status(500).send(err);
      });
  });