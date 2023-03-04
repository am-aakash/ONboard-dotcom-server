const express = require("express")
const router = express.Router()

const employee_controller = require("../controllers/employee_controllers/employee.controller")
const devices_controller = require("../controllers/employee_controllers/devices.controller")
const status_history_controller = require("../controllers/employee_controllers/status_history.controller")

router.post("/add-employee", employee_controller.addEmployee)
router.get("/fetch-employees", employee_controller.fetchEmployees)
router.get("/fetch-single-employee", employee_controller.fetchSingleEmployee)
router.delete("/delete-employee", employee_controller.deleteEmployee)

router.post("/add-device", devices_controller.addDevice)
router.get("/get-devices", devices_controller.fetchEmployeeDevices)
router.delete("/delete-device", devices_controller.deleteDevice)
router.put("/update-device-status", devices_controller.updateDeviceStatus)

router.post("/add-status-history", status_history_controller.addStatusHistory)
router.get("/fetch-employee-history", status_history_controller.fetchEmployeeHistory)
router.delete("/delete-status-history", status_history_controller.deleteStatusHistory)

module.exports = router