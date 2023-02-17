const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser")
app.use(bodyParser.json())

const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
    origin(origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        // if (!origin) return callback(null, true);
        // if (allowedOrigins.indexOf(origin) === -1) {
        //     const msg = 'The CORS policy for this site does not ' +
        //         'allow access from the specified Origin.';
        //     return callback(new Error(msg), false);
        // }
        return callback(null, true);
    }
}));

// Auth Routes
const auth = require("./routes/auth.routes")
app.use("/auth", auth)

// Employee Routes
const employee = require("./routes/employee.routes")
app.use("/employee", employee)

// home route
app.use("/", (req, res) => {
  res.send("APIs working")
})

// db sequelize
const db = require("./models/index")
// db.sequelize.sync({
//   force: true,
// });

const CONFIG = require("./config/config")

// Server
const port = CONFIG.port
app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`)
})
