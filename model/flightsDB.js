const express  = require('express');
const app = express ();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const flightsDBflights = ("/controllers/flightsDB.js")

 //checked and worked(http://localhost:3000/api/flights)
const getAllFlights = (req, res) => {
    connection.query('SELECT * FROM flights', (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
        res.json(result);
      }
    });
  };
  app.get('/api/flights', getAllFlights);

   //FUNCTION TO GET FLIGHT BY ID
  //checked and worked(http://localhost:3000/api/flights/1 )
const getFlightById = (req, res) => {
    const flightId = req.params.id;
    connection.query('SELECT * FROM flights WHERE id = ?', [flightId], (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
        if (result.length > 0) {
          res.json(result[0]);
        } else {
          res.status(404).send("Flight not found");
        }
      }
    });
  };
  app.get('/api/flights/:id', getFlightById);
 //FUNCTION TO ADD FLIGHT

const addFlight = (req, res) => {
    const newFlight = req.body;
    connection.query("INSERT INTO flights SET ?", newFlight, (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
        res.send("Flight added successfully");
      }
    });
};
app.post("/api/flights",addFlight)

 //FUNCTION TO REMOVE A FLIGHT

const removeFlight = (req, res) => {
    const flightId = req.params.id;
    connection.query("DELETE FROM flights WHERE id = ?", [flightId], (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
        if (result.affectedRows > 0) {
          res.send("Flight removed successfully");
        } else {
          res.status(404).send("Flight not found");
        }
      }
    });
  };
  app.delete("/api/flights/:id",removeFlight)
 //FUNCTION TO UPDATE THE FLIGHTS TABLE 

const updateFlight = (req, res) => {
    const flightId = req.params.id;
    const updatedFlight = req.body;
    connection.query("UPDATE flights SET ? WHERE id = ?", [updatedFlight, flightId], (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
        if (result.affectedRows > 0) {
          res.send("Flight updated successfully");
        } else {
          res.status(404).send("Flight not found");
        }
      }
    });
  };
  app.post("/api/flights/:id",updateFlight)
