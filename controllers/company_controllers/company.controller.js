const response = require("../../helpers/response.helper")
const db = require("../../models")
const Company = db.company

exports.addCompany = async (req, res) => {
    const name = req.body.name
    const logo = req.body.logo
    const label = req.body.label
    const about = req.body.about
    const website = req.body.website
    const linkedin = req.body.linkedin
    const twitter = req.body.twitter
    const blog = req.body.blog
    const fb = req.body.fb
    const instagram = req.body.instagram
    const location = req.body.location
    const size = req.body.size

    if (name == "" || name == null) {
        return response.responseHelper(
            res,
            false,
            "Name is required",
            "Failed to Add Company"
        )
    }

    try {
        let company = await Company.create({
            name,
            logo,
            label,
            about,
            website,
            linkedin,
            twitter,
            blog,
            fb,
            instagram,
            location,
            size,
        })
        if (company) {
            return response.responseHelper(
                res,
                true,
                {
                    company,
                },
                "Add company successful"
            )
        }
    } catch (error) {
        console.log(error)
        return response.responseHelper(res, false, "Error", "Something went wrong")
    }
}

exports.fetchCompany = async (req, res) => {
    const company_id = req.body.company_id

    if (
        company_id == null ||
        company_id === "" 
    ) {
        return response.responseHelper(
            res,
            false,
            "All fields are required",
            "Failed to Get Company"
        )
    }

    try {
        const company = await Company.findOne({
            where: {
                company_id: company_id,
            },
        })
        if (company) {
            return response.responseHelper(
                res,
                true,
                {
                   company
                },
                "Fetch company successful"
            )
        }
    } catch (error) {
        console.log(error)
        return response.responseHelper(res, false, "Error", "Something went wrong")
    }
}

exports.fetchCompanies = async (req, res) => {
    try {
        const companies = await Company.findAll()
        if (companies) {
            return response.responseHelper(
                res,
                true,
                {
                    companies
                },
                "Fetch companies successful"
            )
        }
    } catch (error) {
        console.log(error)
        return response.responseHelper(res, false, "Error", "Something went wrong")
    }
}