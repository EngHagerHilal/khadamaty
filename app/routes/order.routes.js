const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");
const controller = require("../controllers/order.controller");

module.exports = function(app) {

app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
});
app.post(
    "/addOrder",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.addOrder
);
app.patch(
    "/createOrder",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.CreateOrder
);


app.patch(
    "/addShopToOrder",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.addShopToOrder 
);

app.patch(
    "/acceptOrder",
    [authJwt.verifyToken, authJwt.isShop],
    controller.acceptOrder 
);

app.patch(
    "/completeOrder",
    [authJwt.verifyToken, authJwt.isShop],
    controller.CompleteOrder 
);
app.patch(
    "/rejectOrder",
    [authJwt.verifyToken, authJwt.isShop],
    controller.rejectOrder 
);

app.get(
    "/filterorders",
    [authJwt.verifyToken],
    controller.filter 
);

app.get(
    "/showavailableshops/:city/:service",
    [authJwt.verifyToken , authJwt.isCustomer ],
    controller.showAvailableShops 
);

app.get(
    "/showshoporders",
    [authJwt.verifyToken , authJwt.isShop],
    controller.showShopOrders 
);
app.get(
    "/showshopbindingorders",
    [authJwt.verifyToken , authJwt.isShop],
    controller.showShopBindingOrders 
);

app.get(
    "/showshopacceptedorders",
    [authJwt.verifyToken , authJwt.isShop],
    controller.showShopAcceptedOrders
);

app.get(
    "/showshoprejectedorders",
    [authJwt.verifyToken , authJwt.isShop],
    controller.showShopRejectedOrders 
);
app.get(
    "/showshopcompletedorders",
    [authJwt.verifyToken , authJwt.isShop],
    controller.showShopCompletedOrders 
);

app.get(
    "/Myorders" ,
    [ authJwt.verifyToken , authJwt.isCustomer] ,
    controller.showMyOrders
);

app.get(
    "/Myacceptedorders" ,
    [ authJwt.verifyToken , authJwt.isCustomer] ,
    controller.showMyAccptedOrders
);

app.get(
    "/Myrejectedorders" ,
    [ authJwt.verifyToken , authJwt.isCustomer] ,
    controller.showMyRejectedOrders
);

app.get(
    "/Mybindingorders" ,
    [ authJwt.verifyToken , authJwt.isCustomer] ,
    controller.showMyBingingOrders
);
app.get(
    "/Mycompletedorders" ,
    [ authJwt.verifyToken , authJwt.isCustomer] ,
    controller.showMyCompletedOrders
);

app.get(
    "/Allorders" ,
    [ authJwt.verifyToken , authJwt.isAdmin] ,
    controller.showAllOrders
);

app.get(
    "/Allbindingorders" ,
    [ authJwt.verifyToken , authJwt.isAdmin] ,
    controller.showAllBindingOrders
);
app.get(
    "/Allaacceptedorders" ,
    [ authJwt.verifyToken , authJwt.isAdmin] ,
    controller.showAllAcceptedOrders
);
app.get(
    "/Allrejectedorders" ,
    [ authJwt.verifyToken , authJwt.isAdmin] ,
    controller.showAllRejectedOrders
);
app.get(
    "/Allcompletedorders" ,
    [ authJwt.verifyToken , authJwt.isAdmin] ,
    controller.showAllCompletedOrders
);




};
