const {knex} = require("./connections")


 //function for the admin tables

 //check on(http://localhost:3000/api/adminstrators)
const getAllAdmins = async () => {
  const result = await knex.select().from("administrators").where({id:id})
  return result
}

 //FUNCTION TO GET AN ADMIN BY ID
 //    //check on (http://localhost:3000/api/adminstrators/{adminId})
 const getAdminById = async(id) => {
   const result = await knex .raw("select * from administrators where id = ?",[id])
   return result[0]
 }
  //FUNCTION TO ADD A ADMIN
const addAdmin = async  (admin) => {
  const result = await knex ("administrators").insert(admin)
  return result
}
//function to update the admins list
const updateAdminsList = async(admin)=>{
  const rowsAffected = await knex("administrators").where({id:admin.id}).update(admin)
  return rowsAffected
}

//FUNCTION TO REMOVE AN ADMIN

const removeAdmin = async(id) => {
  const result = await knex("administrators").where({id:id}).del()
  return result
}

module.exports={
  removeAdmin,
  addAdmin,
  getAdminById,
  getAllAdmins,
  updateAdminsList
}
