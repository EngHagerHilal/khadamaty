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
  [authJwt.verifyToken],
  controller.allCustomers
);

app.get(
  "/allshops",
  [authJwt.verifyToken],
  controller.allShops
);
app.get(
  "/allverifiedshops",
  [authJwt.verifyToken],
  controller.allVerifiedShops
);
app.get(
  "/allbindingshops",
  [authJwt.verifyToken],
  controller.allBindingShops
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
  "/verifyShop",
  [authJwt.verifyToken],
  controller.verifyShop
);

app.post(
  "/deactivateShop",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.deactivateShop
);


app.post(
  "/deleteShop",
  [authJwt.verifyToken],
  controller.deleteShop
);

app.patch(
  "/editprofile",
  [authJwt.verifyToken],
  controller.edit
);

app.patch(
  "/changepassword",
  [authJwt.verifyToken],
  controller.changepassword
);
app.get(
  "/getadminprofile" ,
  [authJwt.verifyToken , authJwt.isAdmin],
  controller.getAdminProfile
)

app.get(
  "/getcustomerserviceprofile" ,
  [authJwt.verifyToken , authJwt.isCustomerService],
  controller.getCustomerServiceProfile
)
app.get(
  "/getallcustomerservices" ,
  [authJwt.verifyToken , authJwt.isAdmin],
  controller.allCustomerServices
);

app.get(
  "/getallavailablecustomerservices" ,
  [authJwt.verifyToken , authJwt.isAdmin],
  controller.allAvailableCustomerServices
);

app.get(
  "/getallunavailablecustomerservices" ,
  [authJwt.verifyToken , authJwt.isAdmin],
  controller.allUnavailableCustomerServices
);

app.get(
  "/contactcustomerservice" ,
  [authJwt.verifyToken ],
  controller.contactCustomerService
);



};