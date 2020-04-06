const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Shop = db.shop ;
const Customer = db.customer ;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
//var TeleSignSDK = require('telesignsdk');

/*
const client = new TeleSignSDK( verify.customerId,
  verify.apiKey,
  verify.rest_endpoint
);
*/
/*
const messageType = "ARN";
const verifyCode = "32658";
const message = "Your code is " + verifyCode;
*/
exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8) ,
    role : req.body.role ,
    phone : req.body.phone 
  })
    .then(user => {
      //client.sms.message(user.phone, message, messageType);
      if (req.body.role) {
        switch(req.body.role) {
          case "customer":
          Customer.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            userId : user.id ,
            name : req.body.name
          }).then((customer) => {
            Customer.update ( req.body , {where : { userId : user.id} })
            res.send({ msg: "User was registered successfully!" });
        }).catch(err => {
          User.destroy( {where: { id: user.id } }).then(res.send( {message : err.message , status: res.status}  ))});        
            break;
          case "shop":
            /// description
          Shop.create (req.body).then((shop) => {
          Shop.update ( {userId : user.id} , {where : {shopid : shop.shopid} })
          res.send({ msg: "Shop was registered successfully!" });
        }).catch(err => {
          User.destroy( {where: { id: user.id } }).then(res.send( {message :err.message , status: res.status}))});
          break;
          default:
          User.destroy({
            where: { id: user.id }})
        }
      }
      else 
      res.status(404).send({msg : "Role Not Found"})
    })
    .catch(err => {
      res.status(500).send({message : err.errors[0].message , status : res.status} );
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ msg: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
        authorities.push("ROLE_" + user.role.toUpperCase());
        
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          password : user.password ,
          role: user.role,
          accessToken: token 
        });
    })
    .catch(err => {
      res.status(500).send( {msg : err.message , status : res.status} );
    });
};