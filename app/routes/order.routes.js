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
    "/api/test/addOrder/",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.addOrder
);


app.post(
    "/api/test/addShopToOrder/",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.addShopToOrder 
);

app.put(
    "/api/test/acceptOrder/",
    [authJwt.verifyToken, authJwt.isShop],
    controller.acceptOrder 
);

app.put(
    "/api/test/completeOrder/",
    [authJwt.verifyToken, authJwt.isShop],
    controller.CompleteOrder 
);
app.put(
    "/api/test/rejectOrder/",
    [authJwt.verifyToken, authJwt.isShop],
    controller.rejectOrder 
);

app.get(
    "/api/test/filterorders/",
    [authJwt.verifyToken],
    controller.filter 
);

app.get(
    "/api/test/showavailableshops/",
    [authJwt.verifyToken , authJwt.isCustomer ],
    controller.showAvailableShops 
);

app.get(
    "/api/test/showshoporders/",
    [authJwt.verifyToken , authJwt.isShop],
    controller.showShopOrders 
);
};
