const db = require("../models");
const Service = db.service;
const Customer = db.customer;
const Shop = db.shop;
const Op = db.Sequelize.Op;
const Subservice = db.subservice;
const Order = db.order;
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");


// Add Order services
exports.addOrder = (req, res) => {
    let token = req.headers["x-access-token"];
    jwt.verify(token, config.secret, (err, decoded) => {
        userid = decoded.id;
        //res.json(decoded)
      });
    
    Order.create( req.body).then ((order)=>{
        User.findByPk(userid).then(user => {
     Order.update( { userId: userid , phoneId : user.phone , usernameId : user.username  } , { where : {id : order.id}}).then(()=> res.send({msg : "Order Created successfully!" , data : order})).catch(err => res.send({msg : err.message}))
    })
});
};

exports.CreateOrder = (req, res) => {
    let token = req.headers["x-access-token"];
    jwt.verify(token, config.secret, (err, decoded) => {
        userid = decoded.id;
        //res.json(decoded)
      });
      orderid = req.body.orderid;
     Order.update( req.body , { where : {id : orderid}}).then((order)=> res.send({msg : "Order Created successfully!" , id : order[0].id})).catch(err => res.send({msg : err.message}))
    
};

exports.addShopToOrder = ( req , res ) => {
    orderid = req.body.id ;
    shopname = req.body.shop;
    Shop.findAll({ where: {name : shopname } }).then((shops) => { 
    Order.update({shopShopid : shops[0].shopid} , { where: { id: orderid }}).then(() => console.log("Order created successfully !"))
})
}

/*
exports.addServiceToOrder = ( req , res ) => {
   
    orderid = req.body.id ;
    servicetitle = req.body.service;
    console.log(orderid);
    Service.findAll({ where: {title : servicetitle } }).then((services) =>{
        service_id = services[0].id ;
        Order.update({serviceId : service_id} , { where: { id: orderid }}).then(() => res.sendStatus(200));
        }).catch(err => res.send({msg : err.message}));    
};

exports.getSubervicesToOrder = ( req , res ) => {
    servicetitle = req.body.service;
    Service.findAll({ where: {title : servicetitle } }).then((service) => res.send({ serviceId : service.id})).catch(err => res.send({msg : err.message}));
    Subservice.findall({ where: { serviceId: service.id }}).then(data => res.send ( {data : data})).catch( err => res.send({msg : err.message}));
};

exports.addSubserviceToOrder = ( req , res ) => {
    orderid = req.params.id ;
    subservicetitle = req.body.subservice;
    /// check if the subservices belong to the service //// 
    Order.update({subserviceTitle : subservicetitle} , { where: { id: orderid }}).catch( err => res.send({msg : err.message}));
};
*/

exports.acceptOrder = (req , res ) =>{
    orderId = req.body.orderId ;
Order.update({status : "Accepted"} , { where: { id: orderId }}) .then(res.send({msg : "Order Accepted"}))
.catch(err => res.send({msg : err.message}));
}
exports.rejectOrder = (req , res ) =>{
    orderId = req.body.orderId ;
Order.update({status : "Rejected"} , { where: { id: orderId }}) .then(res.send({msg : "Order Accepted"}))
.catch(err => res.send({msg : err.message}));
}
/*
exports.startOrder = (req , res) => {
    orderId = req.body.orderId ;
    Order.update({status : InProgress} , { where: { id: orderId }}) .then(res.send({msg : "Order Accepted"})).catch(err => res.send({msg : err.message}));
}
*/
exports.CompleteOrder = (req , res) => {
    orderId = req.body.orderId ;
    Order.update({status : "Completed"} , { where: { id: orderId }}) .then(res.send({msg : "Order Accepted"})).catch(err => res.send({msg : err.message}));
}

exports.filter = ( req , res ) => {
    status = req.body.status ;
    let token = req.headers["x-access-token"];

    jwt.verify(token, config.secret, (err, decoded) => {
      userId = decoded.id;
    });
    User.findByPk(req.userId).then(user=> {
        if (user.role == "admin") {
            Order.findAll({ where: {status : status} })
            .then(data => { res.send({data : data});}).catch(err => res.send({msg : err.message}));
          }else {
         if ( user.role == "customer"){
            Order.findAll({ where: {status : status , userId : userId} })
            .then(data => { res.send({data : data});}).catch(err => res.send({msg : err.message}));
         }else {
             if ( user.role == "shop"){
                Shop.findAll({ where : {userId : userId}}).then(
                    (result)=> {        
                Order.findAll({ where: {status : status , shopShopId : result[0].shopid} })
                .then(data => { res.send({data : data});}).catch(err => res.send({msg : err.message}));
             })  
        }
             else {
                 res.json("no data")
             }
         }
          }
    });
};

exports.showAllOrders = (req , res) =>{

    Order.findAll().then(orders => res.send( {data : orders}));
}

exports.showAvailableShops = ( req , res ) => {
    let token = req.headers["x-access-token"];

    jwt.verify(token, config.secret, (err, decoded) => {
      userId = decoded.id;
    });
    orderid = req.params.orderid ;
    service = req.params.service ;
    Order.findAll( {where : {userId : userId}}).then((orders) =>
    
    {
        // res.send ({ city : orders[0].city} ) 
    city = orders[0].city;
    Shop.findAll(  { where : {service : service , city : orders[0].city , verified : true}  }).then((shops) => res.send( {data : shops})).catch( err => res.send({msg : err.message}));
}
).catch( err=>res.send({ msg : err.message}));

   // Customer.findAll( {where : {userId : userId}}).then((customers) => res.send ({ city : customers[0].city} ) ).catch( err=>res.send({ msg : err.message}));
    
   // Service.findAll({ where: {title : service } }).then((service) => res.send({ serviceId : service.id})).catch(err => res.send({msg : err.message}));
}


exports.showShopOrders = ( req , res ) => {
    let token = req.headers["x-access-token"];
    jwt.verify(token, config.secret, (err, decoded) => {
      userId = decoded.id;
    });
    Shop.findAll({ where : {userId : userId}}).then(
        (result)=> {
            console.log(result[0].shopid)
    Order.findAll({ where : {shopShopId : result[0].shopid} }).then((orders) => res.send( {data : orders})).catch( err => res.send({msg : err.message}));
});
}

exports.showMyOrders = ( req , res ) => {
    let token = req.headers["x-access-token"];
    let id = null ;
    jwt.verify(token, config.secret, (err, decoded) => {
      userId = decoded.id;
    });
    Order.findAll( {userId : userId }).then((orders) => res.send( {data : orders})).catch( err => res.send({msg : err.message}));
}
