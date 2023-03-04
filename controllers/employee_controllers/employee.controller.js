const response = require("../../helpers/response.helper")
const db = require("../../models")
const Employee = db.employee

exports.addEmployee = async (req, res) => {
  const name = req.body.name
  const date_of_joining = req.body.date_of_joining
  const role = req.body.role
  const phone = req.body.phone
  const employee_id = req.body.employee_id
  const user_id = req.body.user_id
  const team = req.body.team
  const status = req.body.status
  const status_subheading = req.body.status_subheading
  const status_date = req.body.status_date
  const email = req.body.email
  const photo = req.body.photo
  const company_id = req.body.company_id
  const company_name = req.body.company_name
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
        user_id,
        employee_id,
        team,
        status,
        email,
        status_subheading,
        status_date,
        company_id,
        photo,
        company_name,
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
        "Fetch employee successful"
      )
    }
  } catch (error) {
    console.log(error)
    return response.responseHelper(res, false, "Error", "Something went wrong")
  }
}

exports.fetchSingleEmployee = async (req, res) => {
  const employee_id = req.body.employee_id
  console.log(employee_id)

  try {
    const employee = await Employee.findOne({
      where: {
        id: employee_id,
      },
    })
    if (employee) {
      return response.responseHelper(
        res,
        true,
        employee,
        "Get employee successful"
      )
    }
  } catch (error) {
    console.log(error)
    return response.responseHelper(res, false, "Error", "Something went wrong")
  }
}

exports.deleteEmployee = async (req, res) => {
  const employee_id = req.body.employee_id
  console.log(employee_id)

  try {
    const employee = await Employee.findOne({
      where: {
        id: employee_id,
      },
    })
    if (!employee) {
      return response.responseHelper(
        res,
        false,
        "Error",
        "This Employee does not exists"
      )
    }
    const temp = await Employee.destroy({
      where: {
        id: employee_id,
      },
    })
    if (employee) {
      return response.responseHelper(
        res,
        true,
        employee,
        "Deleted employee successful"
      )
    }
  } catch (error) {
    console.log(error)
    return response.responseHelper(res, false, "Error", "Something went wrong")
  }
}
