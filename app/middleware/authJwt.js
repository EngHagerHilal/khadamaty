const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    
        if (user.role == "admin") {
          next();
          return;
        }
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    
  });
};



isCustomerService = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
     
     if ( user.role == "customerservice" ){
            next();
            return;
     }
        res.status(403).send({
          message: "Require CustomerService Role!"
        });
        return;
      
    });
};

isCustomer = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
      
     if ( user.role == "customer" ){
            next();
            return;
     }
        res.status(403).send({
          message: "Require Customer Role!"
        });
        return;
    
    });
};

isShop = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
     
     if (user.role == "shop" ){
            next();
            return;
     }
        res.status(403).send({
          message: "Require Shop Role!"
        });
        return;
      });
};



const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isCustomerService : isCustomerService ,
  isCustomer : isCustomer ,
  isShop : isShop
};
module.exports = authJwt;