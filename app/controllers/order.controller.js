const db = require("../models");
const Service = db.service;
const Customer = db.customer;
const Shop = db.shop;
const User = db.user;
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
            console.log(user.phone) ;
            console.log(user.username);
     Order.update( { userId: userid , phone : user.phone , username : user.username  } , { where : {id : order.id}}).then(()=> res.send({msg : "Order Created successfully!" , data : order})).catch(err => res.send({msg : err.message}))
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

    Order.findAll({order: [["createdAt" ,'DESC']]}).then(orders => res.send( {data : orders}));
};
exports.showAllBindingOrders = (req , res) =>{

    Order.findAll({where : {status : null} , order: [["createdAt" ,'DESC']] } ).then(orders => res.send( {data : orders}));
}
exports.showAllAcceptedOrders = (req , res) =>{

    Order.findAll({where : {status : 'Accepted'} , order: [["createdAt" ,'DESC']] } ).then(orders => res.send( {data : orders}));
}
exports.showAllRejectedOrders = (req , res) =>{

    Order.findAll({where : {status : 'Rejected'} , order: [["createdAt" ,'DESC']] } ).then(orders => res.send( {data : orders}));
}
exports.showAllCompletedOrders = (req , res) =>{

    Order.findAll({where : {status : 'Completed'} , order: [["createdAt" ,'DESC']] } ).then(orders => res.send( {data : orders}));
}

exports.showAvailableShops = ( req , res ) => {
    let token = req.headers["x-access-token"];

    jwt.verify(token, config.secret, (err, decoded) => {
      userId = decoded.id;
    });
    city = req.params.city ;
    service = req.params.service ;
        Shop.findAll(  { where : {service : service , city : city , verified : true}  }).then((shops) => res.send( {data : shops})).catch( err => res.send({msg : err.message}));
};

exports.showShopOrders = ( req , res ) => {
    let token = req.headers["x-access-token"];
    jwt.verify(token, config.secret, (err, decoded) => {
      userId = decoded.id;
    });
    Shop.findAll({ where : {userId : userId}}).then(
        (result)=> {
            console.log(result[0].shopid)
    Order.findAll({ where : {shopShopId : result[0].shopid} , order: [["createdAt" ,'DESC']] , limit : 200 } ).then((orders) => res.send( {data : orders})).catch( err => res.send({msg : err.message}));
});
}

exports.showShopBindingOrders = ( req , res ) => {
    let token = req.headers["x-access-token"];
    jwt.verify(token, config.secret, (err, decoded) => {
      userId = decoded.id;
    });
    Shop.findAll({ where : {userId : userId}}).then(
        (result)=> {
            console.log(result[0].shopid)
    Order.findAll({ where : {shopShopId : result[0].shopid , status : null} , order: [["createdAt" ,'DESC']]}).then((orders) => res.send( {data : orders})).catch( err => res.send({msg : err.message}));
});
}
exports.showShopAcceptedOrders = ( req , res ) => {
    let token = req.headers["x-access-token"];
    jwt.verify(token, config.secret, (err, decoded) => {
      userId = decoded.id;
    });
    Shop.findAll({ where : {userId : userId}}).then(
        (result)=> {
            console.log(result[0].shopid)
    Order.findAll({ where : {shopShopId : result[0].shopid , status : 'Accepted'} , order: [["updatedAt" ,'DESC']] }).then((orders) => res.send( {data : orders})).catch( err => res.send({msg : err.message}));
});
}
exports.showShopRejectedOrders = ( req , res ) => {
    let token = req.headers["x-access-token"];
    jwt.verify(token, config.secret, (err, decoded) => {
      userId = decoded.id;
    });
    Shop.findAll({ where : {userId : userId}}).then(
        (result)=> {
            console.log(result[0].shopid)
    Order.findAll({ where : {shopShopId : result[0].shopid , status : 'Rejected'} , order: [["updatedAt" ,'DESC']] , limit: 50}).then((orders) => res.send( {data : orders})).catch( err => res.send({msg : err.message}));
});
}
exports.showShopCompletedOrders = ( req , res ) => {
    let token = req.headers["x-access-token"];
    jwt.verify(token, config.secret, (err, decoded) => {
      userId = decoded.id;
    });
    Shop.findAll({ where : {userId : userId}}).then(
        (result)=> {
            console.log(result[0].shopid)
    Order.findAll({ where : {shopShopId : result[0].shopid , status : 'Completed'} , order: [["updatedAt" ,'DESC']] , limit: 50}).then((orders) => res.send( {data : orders})).catch( err => res.send({msg : err.message}));
});
}

exports.showMyOrders = ( req , res ) => {
    let token = req.headers["x-access-token"];
    let id = null ;
    jwt.verify(token, config.secret, (err, decoded) => {
      userId = decoded.id;
    });
    Order.findAll( {where :{userId : userId } ,order: [["createdAt" ,'DESC']], limit : 200}).then((orders) => res.send( {data : orders})).catch( err => res.send({msg : err.message}));
}

exports.showMyAccptedOrders = ( req , res ) => {
    let token = req.headers["x-access-token"];
    let id = null ;
    jwt.verify(token, config.secret, (err, decoded) => {
      userId = decoded.id;
    });
    Order.findAll( {where :{userId : userId , status : 'Accepted'} ,order: [["updatedAt" ,'DESC']]}).then((orders) => res.send( {data : orders})).catch( err => res.send({msg : err.message}));
}

exports.showMyRejectedOrders = ( req , res ) => {
    let token = req.headers["x-access-token"];
    let id = null ;
    jwt.verify(token, config.secret, (err, decoded) => {
      userId = decoded.id;
    });
    Order.findAll( {where :{userId : userId , status : 'Rejected'} ,order: [["updatedAt" ,'DESC']], limit : 50}).then((orders) => res.send( {data : orders})).catch( err => res.send({msg : err.message}));
}

exports.showMyCompletedOrders = ( req , res ) => {
    let token = req.headers["x-access-token"];
    let id = null ;
    jwt.verify(token, config.secret, (err, decoded) => {
      userId = decoded.id;
    });
    Order.findAll( {where :{userId : userId , status : 'Completed'} ,order: [["updatedAt" ,'DESC']], limit : 50}).then((orders) => res.send( {data : orders})).catch( err => res.send({msg : err.message}));
}

exports.showMyBingingOrders = ( req , res ) => {
    let token = req.headers["x-access-token"];
    let id = null ;
    jwt.verify(token, config.secret, (err, decoded) => {
      userId = decoded.id;
    });
    Order.findAll( {where :{userId : userId , status : null} ,order: [["createdAt" ,'DESC']], limit : 200}).then((orders) => res.send( {data : orders})).catch( err => res.send({msg : err.message}));
}

exports.cancelOrder = ( req , res ) => {
    let token = req.headers["x-access-token"];
    let id = null ;
    jwt.verify(token, config.secret, (err, decoded) => {
      userId = decoded.id;
    });
    orderid : this.body.orderid
    Order.findByPk(orderid).then( order => {
        if ( order.status == null) {
            Order.destroy (  {
                where :{ id : orderid}
              }).then(()=> res.send ( { msg : "Cancelled Successfully"}))
        }
        else {
            res.send({ msg : "You can't cancel order now !"})
        }
    })
}