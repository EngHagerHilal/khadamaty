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

app.post(
  "/api/test/addcustomerservice",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.addCustomerservice
);

app.post(
  "/api/test/verifyShop/",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.verifyShop
);

app.post(
  "/api/test/deactivateShop/",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.deactivateShop
);


app.post(
  "/api/test/deleteShop/",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.deleteShop
);

app.put(
  "/api/test/editprofile/",
  [authJwt.verifyToken],
  controller.edit
);

};