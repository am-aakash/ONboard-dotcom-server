const express = require("express")
const router = express.Router()

const employee_controller = require("../controllers/employee_controllers/employee.controller")

router.post("/add-employee", employee_controller.addEmployee)
router.get("/fetch-employees", employee_controller.fetchEmployees)
router.get("/fetch-single-employee", employee_controller.fetchSingleEmployee)
router.delete("/delete-employee", employee_controller.deleteEmployee)
module.exports = router
