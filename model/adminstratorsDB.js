 const adminDBfunctions = require("model/adminstratorsDB.js")
 const express  = require('express');
const app = express ();
const bodyParser = require('body-parser');
app.use(bodyParser.json())


 //function for the admin tables

 //check on(http://localhost:3000/api/adminstrators)
const getAllAdmins = (req, res) => {
    connection.query('SELECT * FROM adminstrators', (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
        res.json(result);
      }
    });
  };
  app.get('/api/adminstrators', getAllAdmins);

 //FUNCTION TO GET AN ADMINBY ID
 //    //check on (http://localhost:3000/api/adminstrators/{adminId})
const getAdminById = (req, res) => {
    const adminId = req.params.id;
    connection.query('SELECT * FROM adminstrators WHERE id = ?', [adminId], (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
        if (result.length > 0) {
          res.json(result[0]);
        } else {
          res.status(404).send("Admin not found");
        }
      }
    });
  };
  app.get('/api/adminstrators/:id', getAdminById);

//   //FUNCTION TO ADD A ADMIN
const addAdmin = (req, res) => {
    const newAdmin = req.body;
    connection.query("INSERT INTO adminstrators SET ?", newAdmin, (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
        res.send("Admin added successfully");
      }
    });
  };
app.put("/api/adminstrators", addAdmin);

//FUNCTION TO REMOVE AN ADMIN

const removeAdmin = (req, res) => {
    const adminId = req.params.id;
    connection.query("DELETE FROM adminstrators WHERE id = ?", [adminId], (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
        if (result.affectedRows > 0) {
          res.send("Admin removed successfully");
        } else {
          res.status(404).send("Admin not found");
        }
      }
    });
  };
  app.delete('/api/administrators/:id', removeAdmin);

//UPDATE THE ADMINSTRATORS TABLE

const updateAdmin = (req, res) => {
    const adminId = req.params.id;
    const updatedAdmin = req.body;
    connection.query("UPDATE adminstrators SET ? WHERE id = ?", [updatedAdmin, adminId], (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
        if (result.affectedRows > 0) {
          res.send("Admin updated successfully");
        } else {
          res.status(404).send("Admin not found");
        }
      }
    });
  };
  app.put('/api/administrators/:id', updateAdmin);
  

module.exports = {
  updateAdmin,
  removeAdmin,
  addAdmin,
  getAdminById,
  getAllAdmins
}