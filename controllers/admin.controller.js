const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSSequelize = require("@adminjs/sequelize");
const db = require("../models");
const bcrypt = require("bcryptjs");

// const {
//     user
// } = require("./admin/user/user")

AdminJS.registerAdapter(AdminJSSequelize);

const adminJS = new AdminJS({
    databases: [db],
    resources: [
        // user,
    ],
    branding: {
        logo: "https://misc-ip.s3.eu-west-2.amazonaws.com/logo.png",
        companyName: "India Properties",
    },
});

const ADMIN = {
    email: 'admin@gmail.com',
    password: '12345678',
}

const router = AdminJSExpress.buildAuthenticatedRouter(adminJS, {
    cookieName: 'admin-bro',
    cookiePassword: 'password',
    authenticate: async (email, password) => {
        if (email === ADMIN.email && password === ADMIN.password) {
            return true
        }
    }
},  null,
{
    resave: true,
    saveUninitialized: true
})


// const router = AdminJSExpress.buildAuthenticatedRouter(adminJS, {
//     authenticate: async (email, password) => {
//         if (email === ADMIN.email && password === ADMIN.password) {
//             return ADMIN
//         }
//         return null
//     },
//     cookiePassword: 'admin-bro',
// },  null,
//     {
//         resave: true,
//         saveUninitialized: true
//     }
// );

// const router = AdminJSExpress.buildAuthenticatedRouter(adminJS, {
//     cookieName: "admin-bro",
//     cookiePassword: "password",
//     authenticate: async (email, password) => {
//         if (email == null || email == "" || password == null || password == "") {
//             return false;
//         }
//         var email = email.toString().toLowerCase();

//         const admin = await db.user.findOne({
//             where: {
//                 email: email,
//             },
//         });

//         if (admin) {
//             const passwordIsValid = bcrypt.compareSync(
//                 password,
//                 admin.password
//             )
//             if (passwordIsValid || admin.password == password) {
//                 return admin;
//             }
//         }
//         return false;
//     },
// });

module.exports = router;