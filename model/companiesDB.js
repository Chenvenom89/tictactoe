
const {knex} = require("./connections")


  // checked and worked on (http://localhost:3000/api/airlineCompanies)
  const getAllAirlineCompanies = async (req, res) => {
    const result = await knex.raw(`select * from airline_companies`)
    return result
  }
 //GET THE AIRLINE COMPANIES BY ID

  // checked and worked on(http://localhost:3000/api/airlineCompanies/:id)
  const getAirlineById = async (req, res) => {
    try {
      const airlineId = req.params.id;
      const result = await knex.raw('airline_companies').Where('id', airlineId).select('*');
      
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).send("Airline not found");
      }
    } catch (err) {
      res.status(500).send("Error in the database: " + err);
    }
  };
  
 //FUNCTION TO GET AN AIRLINE COMPANY

 const addAirlineCompany = async (req, res) => {
  try {
    const { airline_name, country_id } = req.body;
    const newAirline = {
      airline_name: airline_name,
      country_id: country_id
    };

    await knex('airline_companies').insert(newAirline);
    res.send("Airline company added successfully");
  } catch (err) {
    res.status(500).send("Error in the database: " + err);
  }
};

//FUNCTION TO REMOVE AN AIRLIINE COMPANY BY ID

 // check on(http://localhost:3000/api/airlineCompanies/:id)
 const removeAirline = async (req, res) => {
  try {
    const airlineId = req.params.id;

    const result = await knex('airline_companies')
      .where('id', airlineId)
      .del();

    if (result > 0) {
      res.send("Airline removed successfully");
    } else {
      res.status(404).send("Airline not found");
    }
  } catch (err) {
    res.status(500).send("Error in the database: " + err);
  }
};

//FUNCTION TO UPDATEAIRLINE COMAPNY
 //check on(http://localhost:3000/api/airlineCompanies/:id)
 const updateAirlineCompany = async (company) => {
  const affectedRows = await knex("airline_companies").where({Id:company.Id}).update(company)
  return affectedRows
}

const airlineCompById = async (req, res) => {
  const id = req.params.id;
  const result = await knex.raw("select * from airline_companies where id = ?",[id])
    return result [0]
  }
const 