const { json } = require("express");
const adminsDBfunctions = require("../model/adminsDB")


// FUNCTION TO GET ALL ADMINS
const getAllAdmins = async (req, res) => {
    try {
      const result = await adminsDBfunctions.getAllAdmins();
      res.json(result);
    } catch (err) {
      res.status(500).send("Error in the database: " + err);

    }
  }

  
  // FUNCTION TO GET AN ADMIN BY ID
  const getAdminById = async (req, res) => {
      const id = req.params.id;
      const result = await adminsDBfunctions.getAdminById(id)
      res.send(result)
  }
  // FUNCTION TO ADD AN ADMIN
  const addAdmin = async (req, res) => {
    try {
      const newAdmin = req.body;
      const result = await adminsDBfunctions.addAdmin(newAdmin);
      res.send(result)
      res.send("Admin added successfully");
    } catch (err) {
      res.status(500).send("Error in the database: " + err);
    }
    
  };
  
  // FUNCTION TO UPDATE AN ADMIN
  const updateAdminsList = async (req, res) => {
    try {
      const updatedAdmin = req.body;
      const rowsAffected = await adminsDBfunctions.updateAdminsList(updatedAdmin);
      if (rowsAffected > 0) {
        res.send("Admin updated successfully");
      } else {
        res.status(404).send("Admin not found");
      }
    } catch (err) {
      res.status(500).send("Error in the database: " + err);
    }
  };
  
  // FUNCTION TO REMOVE AN ADMIN
  const removeAdmin = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await adminsDBfunctions.removeAdmin(id);
      if (result > 0) {
        res.send("Admin removed successfully");
      } else {
        res.status(404).send("Admin not found");
      }
    } catch (err) {
      res.status(500).send("Error in the database: " + err);
    }
  }
  

  module.exports={
    removeAdmin,
    addAdmin,
    getAdminById,
    getAllAdmins,
    updateAdminsList
  }
  