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
    "/addOrder/",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.addOrder
);
app.patch(
    "/createOrder/",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.CreateOrder
);


app.patch(
    "/addShopToOrder/",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.addShopToOrder 
);

app.patch(
    "/acceptOrder/",
    [authJwt.verifyToken, authJwt.isShop],
    controller.acceptOrder 
);

app.patch(
    "/completeOrder/",
    [authJwt.verifyToken, authJwt.isShop],
    controller.CompleteOrder 
);
app.patch(
    "/rejectOrder/",
    [authJwt.verifyToken, authJwt.isShop],
    controller.rejectOrder 
);

app.get(
    "/filterorders/",
    [authJwt.verifyToken],
    controller.filter 
);

app.get(
    "/showavailableshops/:orderid/:service",
    [authJwt.verifyToken , authJwt.isCustomer ],
    controller.showAvailableShops 
);

app.get(
    "/showshoporders/",
    [authJwt.verifyToken , authJwt.isShop],
    controller.showShopOrders 
);
app.get(
    "/Myorders" ,
    [ authJwt.verifyToken , authJwt.isCustomer] ,
    controller.showMyOrders
)

app.get(
    "/Allorders" ,
    [ authJwt.verifyToken , authJwt.isAdmin] ,
    controller.showAllOrders
)

};
