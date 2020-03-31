const db = require("../models");
const User = db.user;
const Shop = db.shop ;
const Customer = db.customer ;
const Customerservice = db.customerservice ;
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.allCustomers =  (req , res) => {
  Customer.findAll().then(customers => res.send({data : customers}));
}  


exports.allShops =  (req , res) => {
  Shop.findAll().then(shops => res.send({data : shops}));
}
/*
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

  User.update( { username : req.body.username , email : req.body.email , phone : req.body.phone } ,{ where : { id : userId} });
  Customer.update ( req.body ,{ where : { userId : userId} });
  Shop.update ( req.body ,{ where : { userId : userId} });
  User.update (  {password: bcrypt.hashSync(req.body.password, 8)} ,{ where : {id : userId} } );
  res.send({msg : "updated"})
}


exports.getMyProfile = ( req , res) => {
  let token = req.headers["x-access-token"];
  jwt.verify(token, config.secret, (err, decoded) => {
    console.log(decoded)
    userId = decoded.id;

  User.findByPk ( userId).then((user) =>
{
  Customer.findAll({ where :{ UserId : userId }}).then (customers =>

    {
      console.log(customers)
      res.send ( { name : customers[0].name  , email : user.email , username :user.username , password : user.password , phone : user.phone , city : customers[0].city , addresse : customers[0].addresse })

    })
})
});
};


exports.getAdminProfile = ( req , res) => {
  let token = req.headers["x-access-token"];
  jwt.verify(token, config.secret, (err, decoded) => {
    console.log(decoded)
    userId = decoded.id;

  User.findByPk ( userId).then((user) =>
{
  
      res.send ( {  email : user.email , username :user.username , password : user.password , phone : user.phone })

})
});
};

exports.getMyShopProfile = ( req , res) => {
  let token = req.headers["x-access-token"];
  jwt.verify(token, config.secret, (err, decoded) => {
    console.log(decoded)
    userId = decoded.id;

  });

  User.findByPk ( userId).then((user) =>
{
  Shop.findAll( {where :{ UserId : userId }}).then ((shops) =>{
    console.log(shops[0]);

    res.send ( { name : shops[0].name  , email : user.email , username :user.username , password : user.password , phone : user.phone , city : shops[0].city , addresse : shops[0].addresse , ownername : shops[0].ownername , service : shops[0].service , description : shops[0].description })

  })
})

//res.send ( { name : shops[0].name  , email : user.email , username :user.username , password : user.password , phone : user.phone , city : shops[0].city , addresse : shops[0].addresse , ownername : shops[0].ownername , description : shops[0].description , verified : shop[0].verified})
};

exports.exploreShop = ( req , res) =>{

  let token = req.headers["x-access-token"];
  jwt.verify(token, config.secret, (err, decoded) => {
    console.log(decoded)
    userId = decoded.id;
    role = decoded.role
  });

  shopid = req.params.shopid ;
  Shop.findAll({ where : {shopid : shopid}}).then( shops => {
    User.findByPk(shops[0].userId).then(user => { 
    res.send ( {  shopid : shops[0].shopid , name : shops[0].name  ,  phone : user.phone , addresse : shops[0].addresse , ownername : shops[0].ownername , description : shops[0].description })
  })
})
}


