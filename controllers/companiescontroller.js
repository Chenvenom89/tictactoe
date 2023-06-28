const companiesDBfunction = require ("../model/companiesDB")

const airlineCompById = async (req, res) => {
      const id = req.params.id;
      const result = await companiesDBfunction.airlineCompById(id)
        res.json(result);
      }
      const addAirlineCompany = async (req, res) => {
          const newCompany = req.body
          const result = await companiesDBfunction.addAirlineCompany(newCompany)
      }