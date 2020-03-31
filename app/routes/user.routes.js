const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.get(
  "/test",
  controller.allAccess
);
app.get(
  "/getmyprofile",
  [authJwt.verifyToken, authJwt.isCustomer],
  controller.getMyProfile
);

app.get(
  "/getmyshopprofile",
  [authJwt.verifyToken, authJwt.isShop],
  controller.getMyShopProfile
);
app.get(
  "/allcustomers",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.allCustomers
);

app.get(
  "/allshops",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.allShops
);


app.get(
  "/exploreshop/:shopid",
  [authJwt.verifyToken ],
  controller.exploreShop
);

app.post(
  "/addcustomerservice",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.addCustomerservice
);

app.post(
  "/verifyShop/",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.verifyShop
);

app.post(
  "/deactivateShop/",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.deactivateShop
);


app.post(
  "/deleteShop/",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.deleteShop
);

app.patch(
  "/editprofile/",
  [authJwt.verifyToken],
  controller.edit
);

app.get(
  "/getadminprofile/" ,
  [authJwt.verifyToken],
  controller.getAdminProfile
)

};