const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const User = db.user;
const Admin = db.admin;
const app = express();
var bcrypt = require("bcryptjs");
/*
var corsOptions = {
  origin: "http://localhost:3000"
};
*/
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// simple route
app.get("/", (req, res) => {
  res.json({ message: "♥ Welcome to Khadamaty application ♥" });
});


// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/order.routes')(app);

db
  .sequelize
  .query('SET FOREIGN_KEY_CHECKS = 0', {raw: true})
  .then(async function() {
  await db.sequelize.sync({force: true})
   return await initial();
});  

async function initial() {
    User.create({
      email : "admin@admin.com" ,
      username : "admin" , 
      password: bcrypt.hashSync("admin", 8) ,
      role : "admin" ,
      phone : "966506486474"
      }).then(user => {
        Admin.create(user)
      })
};


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
