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
  };
  
  // FUNCTION TO GET AN ADMIN BY ID
  const getAdminById = async (req, res) => {
      const adminId = req.params.adminId;
      const result = await adminsDBfunctions.getAdminById(adminId)
      res.send(result)
  }
  // FUNCTION TO ADD AN ADMIN
  const addAdmin = async (req, res) => {
    try {8
      const admin = req.body;
      const result = await adminsDBfunctions.addAdmin(admin);
      res.send(result)
      res.send("Admin added successfully");
    } catch (err) {
      res.status(500).send("Error in the database: " + err);
    }
    
  };
  
  // FUNCTION TO UPDATE AN ADMIN
  const updateAdminsList = async (req, res) => {
    try {
      const adminId = req.params.adminId;
      const updatedAdmin = req.body;
      const rowsAffected = await adminsDBfunctions.updateAdminsList(adminId);
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
      const adminId = req.params.adminId;
      const result = await adminsDBfunctions.removeAdmin(adminId);
      if (result > 0) {
        res.send("Admin removed successfully");
      } else {
        res.status(404).send("Admin not found");
      }
    } catch (err) {
      res.status(500).send("Error in the database: " + err);
    }
  };
  

  module.exports={
    removeAdmin,
    addAdmin,
    getAdminById,
    getAllAdmins,
    updateAdminsList
  }
  