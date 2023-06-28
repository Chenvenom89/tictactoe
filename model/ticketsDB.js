const express  = require('express');
const app = express ();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const{knex} = require("./connections")
  
  const ticketsDBfunctions = ("/controllers/ticketsDB.js")
  
  //checked and works(http://localhost:3000/api/getAllTickets)

  const getAllTickets = async (req, res) => {
    try {
      const result = await knex('tickets').select('*');
      res.json(result);
      console.log(result);
    } catch (err) {
      res.status(500).send("Error in the database: " + err);
    }
  };
  
  app.get("/api/getAllTickets", getAllTickets);
  

//function to get ticket by Id

 //checked and worked(http://localhost:3000/api/getTicketById/74)
 const getTicketById = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const result = await knex('tickets').where('id', ticketId).select('*');

    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).send("Ticket not found");
    }
  } catch (err) {
    res.status(500).send("Error in the database: " + err);
  }
};

app.get("/api/getTicketById/:id", getTicketById);


 //function to ADD a ticket

 const addTicket = async (req, res) => {
  try {
    const newTicket = req.body;
    await knex('tickets').insert(newTicket);
    res.send("Ticket added successfully");
  } catch (err) {
    res.status(500).send("Error in the database: " + err);
  }
};

app.post("/api/addTicket", addTicket);


 //function to remove ticketconst removeTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const result = await knex('tickets').where('id', ticketId).del();

    if (result > 0) {
      res.send("Ticket removed successfully");
    } else {
      res.status(404).send("Ticket not found");
    }
  } catch (err) {
    res.status(500).send("Error in the database: " + err);
  }

app.delete("/api/tickets/:id", removeTicket);


 const ticketId = 0; // Replace with the ID of the ticket you want to remove
 //removeTicket(ticketId);
  
 //function to update the TICKETS LIST 
 const updateTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const updatedTicket = req.body;

    const result = await knex('tickets')
      .where('id', ticketId)
      .update(updatedTicket);

    if (result > 0) {
      res.send("Ticket updated successfully");
    } else {
      res.status(404).send("Ticket not found");
    }
  } catch (err) {
    res.status(500).send("Error in the database: " + err);
  }
};

app.put("/api/tickets/:id", updateTicket);
