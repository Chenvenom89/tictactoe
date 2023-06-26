
const express  = require('express');
const app = express ();
const bodyParser = require('body-parser');
 //functions for the customers table
 app.use(bodyParser.json())

const customerDBfunction = require("")


 //checked and work on(http://localhost:3000/api/getAllCustomers)
const getAllCustomers = (req, res) => {
    connection.query('SELECT * FROM customers', (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
        res.json(result);
      }
    });
  };
  app.get("/api/getAllCustomers", getAllCustomers);


  //checked and worked on (http://localhost:3000/api/getCustomerById/1)
  //GET CUSTOMERS BY ID
const getCustomerById = (req, res) => {
    const customerId = req.params.id;
    connection.query('SELECT * FROM customers WHERE id = ?', [customerId], (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
        if (result.length > 0) {
          res.json(result[0]);
        } else {
          res.status(404).send("Customer not found");
        }
      }
    });
  };
app.get("/api/getCustomerById/:id", getCustomerById);

//FUNCTION TO ADD A NEW CUSTOMER
const addCustomer = (req, res) => {
    const newCustomer = req.body;
    connection.query("INSERT INTO customers SET ?", newCustomer, (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
        res.send("Customer added successfully");
      }
    });
  };
app.put("/api/addCustomer",addCustomer)
 //FUNCTION TO REMOVE A CUSTOMER

const removeCustomer = (req, res) => {
    const customerId = req.params.id;
    connection.query("DELETE FROM customers WHERE id = ?", [customerId], (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
        if (result.affectedRows > 0) {
          res.send("Customer removed successfully");
        } else {
          res.status(404).send("Customer not found");
        }
      }
    });
  };
  app.delete("/api/removeCustomer/:id",removeCustomer)

  //FUNCTION TO UPDATE THE CUSTOMER TABLES
   //(http://localhost:3000/api/customers/2)
const updateCustomerTable = (req, res) => {
    const customerId = req.params.id;
    const updatedCustomerTable = req.body;
    connection.query("UPDATE customers SET ? WHERE id = ?", [updatedCustomerTable, customerId], (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
        if (result.affectedRows > 0) {
          res.send("Customer updated successfully");
        } else {
          res.status(404).send("Customer not found");
        }
      }
    });
  };
  app.put('/api/customers/:id', updateCustomerTable);

  module.exports={
    updateCustomerTable,
    removeCustomer,
    addCustomer,
    getAllCustomers,
    getCustomerById

  }