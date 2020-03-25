const db = require("../models");
const User = db.user;
const Shop = db.shop ;
const Customer = db.customer ;
const Customerservice = db.customerservice ;
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
/*
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };

exports.customerBoard = (req, res) => {
    res.status(200).send("Customers Content.");
};
  
exports.customerserviceBoard = (req, res) => {
    res.status(200).send("Customer Services Content.");
};
  
exports.shopBoard = (req, res) => {
    res.status(200).send("Shops Content.");
};
  */
exports.addCustomerservice = ( req , res ) => {
User.create(
{
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8) ,
    role : "customerservice"
  }).then((user) => {
    console.log (user.id)
    Customerservice.create ({ 'userId' : user.id }).catch((err)=> res.send(err))
    Customerservice.update ( req.body ,{ where : { userId : user.id}}).catch((err) =>  res.send(err))
    res.send({ message: "User was created successfully!" });
});
};


exports.verifyShop = ( req , res ) => {
const shopid =  req.body.shopId
Shop.update ( { verified : true  } , {
  where :{ shopid : shopid}
}).then ( done => {
  if (done) 
  res.send({ message: "User was created successfully!" });
  else 
  res.send({ message: "Something went wrong" });
}).catch(err => {
  res.status(500).send (err);
});
};

exports.deactivateShop = ( req , res ) => {
  const shopid =  req.body.shopId
  Shop.update ( { verified : false  } , {
    where :{ shopid : shopid}
  }).then ( done => {
    if (done) 
    res.send({ message: "User was created successfully!" });
    else 
    res.send({ message: "Something went wrong" });
  }).catch(err => {
    res.status(500).send (err);
  });
  };

exports.deleteShop = ( req , res ) => {
  const shopid =  req.body.shopId
  Shop.destroy (  {
    where :{ shopid : shopid}
  }).then ( done => {
    if (done) 
    res.send({ message: "Shop was deleted successfully!" });
    else 
    res.send({ message: "Something went wrong" });
  }).catch(err => {
    res.status(500).send (err);
  });
};

exports.edit = ( req , res) => {

  let token = req.headers["x-access-token"];
  jwt.verify(token, config.secret, (err, decoded) => {
    console.log(decoded)
    userId = decoded.id;
  });

  User.update( req.body ,{ where : { userId : userId} });
  Customer.update ( req.body ,{ where : { userId : userId} });
  Shop.update ( req.body ,{ where : { userId : userId} });
  res.send({msg : "updated"})
}

/*
exports.getProfile = ( req , res) => {

  let token = req.headers["x-access-token"];
  jwt.verify(token, config.secret, (err, decoded) => {
    console.log(decoded)
    userId = decoded.id;
    role = decoded.role
  });

  User.findByPk ( userId);
  //Customer.update ( req.body ,{ where : { userId : userId} });
  //Shop.update ( req.body ,{ where : { userId : userId} });
  res.send({msg : "updated"})
}
*/










