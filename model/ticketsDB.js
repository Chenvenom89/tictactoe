const express  = require('express');
const app = express ();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
  
  const ticketsDBfunctions = ("/controllers/ticketsDB.js")
  
  //checked and works(http://localhost:3000/api/getAllTickets)

  const getAllTickets = (req, res) => {
    connection.query('SELECT * FROM tickets', (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
        res.json(result);
        console.log(result)
      }
    });
  };
  app.get("/api/getAllTickets", getAllTickets);

//function to get ticket by Id

 //checked and worked(http://localhost:3000/api/getTicketById/74)
const getTicketById = (req, res) => {
    const ticketId = req.params.id;
    connection.query('SELECT * FROM tickets WHERE id = ?', [ticketId], (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
        if (result.length > 0) {
          res.json(result[0]);
        } else {
          res.status(404).send("Ticket not found");
        }
      }
    });
  };
  app.get("/api/getTicketById/:id", getTicketById);

 //function to ADD a ticket

const addTicket = (req, res) => {
    const newTicket = req.body;
    connection.query("INSERT INTO tickets SET ?", newTicket, (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
        res.send("Ticket added successfully");
      }
    });
  };
  app.post("/api/addTicket", addTicket);

 //function to remove ticket
const removeTicket = (req, res) => {
  const ticketId = req.params.id;
  connection.query(
    "DELETE FROM tickets WHERE id = ?",
    [ticketId],
    (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
        if (result.affectedRows > 0) {
          res.send("Ticket removed successfully");
        } else {
          res.status(404).send("Ticket not found");
        }
      }
    }
  );
};

app.delete("/api/tickets/:id", removeTicket);


 const ticketId = 0; // Replace with the ID of the ticket you want to remove
 //removeTicket(ticketId);
  
 //function to update the TICKETS LIST 
const updateTicket = (req, res) => {
  const ticketId = req.params.id;
  const updatedTicket = req.body;

  connection.query(
    "UPDATE tickets SET ? WHERE id = ?",
    [updatedTicket, ticketId],
    (err, result) => {
      if (err) {
        res.status(500).send("Error in the database: " + err);
      } else {
        if (result.affectedRows > 0) {
          res.send("Ticket updated successfully");
        } else {
          res.status(404).send("Ticket not found");
        }
      }
    }
  );
};

app.put("/api/tickets/:id", updateTicket);

module.exports={
  updateTicket,
  removeTicket,
  addTicket,
  getTicketById,
  getAllTickets
}