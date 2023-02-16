require("dotenv").config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const config = require("../config/auth.config")
const { v4: uuidv4 } = require("uuid")
const CONFIG = require("../config/config")
const response = require("../helpers/response.helper")
const db = require("../models")
const User = db.user

generateLoginData = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    config.secret,
    {
      expiresIn: 2592000, // 30 days
    }
  )

  var data = {
    accessToken: token,
  }
  return data
}

exports.addUser = async (req, res) => {
  const email = req.body.email
  const type = req.body.type
  const company_id = req.body.company_id
  const password = req.body.password

  if (
    email == null ||
    email === "" ||
    type == null ||
    type == 0 ||
    company_id == 0 ||
    company_id == null ||
    password == null ||
    password === ""
  ) {
    return response.responseHelper(
      res,
      false,
      "All fields are required",
      "Failed to Add User"
    )
  }

  if (password.length < 8) {
    return response.responseHelper(
      res,
      false,
      "Password Length should be larger than of equal to 8",
      "Failed to Add User"
    )
  }

  try {
    let result = await User.findOne({
      where: {
        email: email,
      },
    })
    if (result) {
      return response.responseHelper(
        res,
        false,
        "This email is already in use, register with a new email",
        "Failed to Add User"
      )
    } else {
      let user = await User.create({
        email,
        type,
        company_id,
        password: bcrypt.hashSync(password, 10),
      })
      if (user) {
        return response.responseHelper(
          res,
          true,
          {
            user: user,
            token: generateLoginData(user),
          },
          "Add user successful"
        )
      }
    }
  } catch (error) {
    console.log(error)
    return response.responseHelper(res, false, "Error", "Something went wrong")
  }
}

exports.loginUser = async (req, res) => {
  let email = req.body.email
  let type = req.body.type
  const password = req.body.password

  if (
    email == null ||
    email === "" ||
    type == null ||
    type == 0 ||
    password == null ||
    password === ""
  ) {
    return response.responseHelper(
      res,
      false,
      "All fields required",
      "Login failed"
    )
  }

  try {
    var user = await User.findOne({
      where: {
        email: email,
        type: type,
      },
    })

    if (!user) {
      return response.responseHelper(
        res,
        false,
        "Invalid email or user type",
        "Login failed"
      )
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password)

    if (!passwordIsValid) {
      return response.responseHelper(
        res,
        false,
        "Wrong Password",
        "Login failed"
      )
    }
    return response.responseHelper(
      res,
      true,
      {
        user: user,
        token: generateLoginData(user),
      },
      "Login successful"
    )
  } catch (err) {
    console.log(err.message)
    return response.responseHelper(
      res,
      false,
      "Something went wrong",
      "Login failed"
    )
  }
}

exports.getUsers = async (req, res) => {
  try {
    var users = await User.findAll()

    return response.responseHelper(
      res,
      true,
      {
        users: users,
      },
      "Users found"
    )
  } catch (err) {
    console.log(err.message)
    return response.responseHelper(
      res,
      false,
      "Something went wrong",
      "Login failed"
    )
  }
}
