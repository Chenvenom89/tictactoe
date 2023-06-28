const express = require("express")
const router = express.Router()


const{
    removeAdmin,
    addAdmin,
    getAdminById,
    getAllAdmins,
    updateAdminsList
} = require("../controllers/adminscontroller")


//admins api
router.get("/getAllAdmins",getAllAdmins)
router.post("/addAdmin",addAdmin)
router.delete("/removeAdmin/:id",removeAdmin)
router.put("/updateAdminsList",updateAdminsList)
router.get("/getAdminById/:id",getAdminById)


module.exports = router