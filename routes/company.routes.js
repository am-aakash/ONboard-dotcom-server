const express = require("express")
const router = express.Router()

const company_controller = require("../controllers/company_controllers/company.controller")
const company_photos_controller = require("../controllers/company_controllers/company_photos.controller")

router.post("/add-company", company_controller.addCompany)
router.get("/fetch-companies", company_controller.fetchCompanies)
router.get("/fetch-company", company_controller.fetchCompany)

module.exports = router