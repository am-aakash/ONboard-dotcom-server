const response = require("../../helpers/response.helper")
const db = require("../../models")
const Employee = db.employee

exports.addEmployee = async (req, res) => {
  const name = req.body.name
  const date_of_joining = req.body.date_of_joining
  const role = req.body.role
  const phone = req.body.phone
  const employee_id = req.body.employee_id
  const team = req.body.team
  const status = req.body.status
  const email = req.body.email
  const company_id = req.body.company_id
  const password = req.body.password

  if (
    name == "" ||
    name == null ||
    email == null ||
    email === "" ||
    company_id == "" ||
    company_id == null ||
    password == null ||
    password === ""
  ) {
    return response.responseHelper(
      res,
      false,
      "All fields are required",
      "Failed to Add Employee"
    )
  }

  try {
    let result = await Employee.findOne({
      where: {
        email: email,
      },
    })
    if (result) {
      return response.responseHelper(
        res,
        false,
        "This email is already in use, add with a new email",
        "Failed to Add Employee"
      )
    } else {
      let employee = await Employee.create({
        name,
        date_of_joining,
        role,
        phone,
        employee_id,
        team,
        status,
        email,
        company_id,
        password,
      })
      if (employee) {
        return response.responseHelper(
          res,
          true,
          {
            employee,
          },
          "Add employee successful"
        )
      }
    }
  } catch (error) {
    console.log(error)
    return response.responseHelper(res, false, "Error", "Something went wrong")
  }
}

exports.fetchEmployees = async (req, res) => {
  const company_id = req.body.company_id
  console.log(company_id)
  let page_no = req.body.page_no - 1
  console.log(page_no)
  let max = 10
  let start = page_no * max

  try {
    const employees = await Employee.findAndCountAll({
      where: {
        company_id: company_id,
      },
      limit: max,
      offset: start,
    })
    if (employees) {
      return response.responseHelper(
        res,
        true,
        {
          current_page: Number(page_no) + 1,
          max: max,
          total_pages: Math.ceil(employees.count / max),
          count: employees.count,
          data: employees,
        },
        "Add employee successful"
      )
    }
  } catch (error) {
    console.log(error)
    return response.responseHelper(res, false, "Error", "Something went wrong")
  }
}
