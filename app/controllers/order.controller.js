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
     Order.update( { userId: userid } , { where : {id : order.id}}).then((order)=> res.send({msg : "Order Created successfully!" , id : order.id})).catch(err => res.send({msg : err.message}))
    })
};

exports.addShopToOrder = ( req , res ) => {
    orderid = req.body.id ;
    shopname = req.body.shop;
    Shop.findAll({ where: {shopname : shopname } }).then((shop) => res.send({ shopId : shop.id})).catch(err => res.send({msg : err.message}));
    Order.update({shopShopId : shop.id} , { where: { id: orderid }});
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
Order.update({status : Accepted} , { where: { id: orderId }}) .then(res.send({msg : "Order Accepted"}))
.catch(err => res.send({msg : err.message}));
}
exports.rejectOrder = (req , res ) =>{
    orderId = req.body.orderId ;
Order.update({status : Rejected} , { where: { id: orderId }}) .then(res.send({msg : "Order Accepted"}))
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
    Order.update({status : Completed} , { where: { id: orderId }}) .then(res.send({msg : "Order Accepted"})).catch(err => res.send({msg : err.message}));
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
                Order.findAll({ where: {status : status , shopShopId : userId} })
                .then(data => { res.send({data : data});}).catch(err => res.send({msg : err.message}));
             }else {
                 res.json("no data")
             }
         }
          }
    });
};

exports.showAvailableShops = ( req , res ) => {
    let token = req.headers["x-access-token"];

    jwt.verify(token, config.secret, (err, decoded) => {
      userId = decoded.id;
    });
    
    Customer.findAll( {where : {userId : userId}}).then((customers) => res.send ({ city : customers[0].city} ) ).catch( err=>res.send({ msg : err.message}));
    service = req.body.service ;
    Service.findAll({ where: {title : service } }).then((service) => res.send({ serviceId : service.id})).catch(err => res.send({msg : err.message}));

    Shop.findAll( {serviceId : serviceId , city : city  }).then((shops) => res.send( {data : shops})).catch( err => res.send({msg : err.message}));
}


exports.showShopOrders = ( req , res ) => {
    let token = req.headers["x-access-token"];
    let shopid = null ;
    jwt.verify(token, config.secret, (err, decoded) => {
      userId = decoded.id;
    });
    Shop.findAll({userId:userId}).then((result)=> shopid = result[0].shopid)
    Order.findAll( {shopShopId : shopid }).then((orders) => res.send( {data : orders})).catch( err => res.send({msg : err.message}));

}