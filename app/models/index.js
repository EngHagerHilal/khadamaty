const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

 sequelize = new Sequelize( dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port : dbConfig.port,
  dialect: dbConfig.dialect,
  operatorsAliases: false ,
  retry : dbConfig.retry ,
  dialectOptions : dbConfig.dialectOptions
 ,
 define: {
  charset: 'utf8',
  collate: 'utf8_general_ci', 
  timestamps: true
},
} );

/*
sequelize = new Sequelize('postgres://lbsropkwleclal:f680294f8688af7d6dc206a5e1256c94a9d5fffa1ec1be43108d176f623ae72d@ec2-3-91-112-166.compute-1.amazonaws.com:5432/dbike1cn7bstml', {
  logging: false,
  });
*/  
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.admin = require("../models/admin.model.js")(sequelize, Sequelize);
db.customerservice = require("../models/customerservice.model.js")(sequelize, Sequelize);
db.customer = require("../models/customer.model.js")(sequelize, Sequelize);
db.shop = require("../models/shop.model.js")(sequelize, Sequelize);
db.offer = require("../models/offer.model.js")(sequelize, Sequelize);
db.order = require("../models/order.model.js")(sequelize, Sequelize);

/*
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "db.role.name"

});
*/

db.shop.belongsTo(db.user);

db.admin.belongsTo(db.user);

db.customerservice.belongsTo(db.user);

db.customer.belongsTo(db.user);

db.order.belongsTo(db.user , {

});

db.order.belongsTo(db.shop);


db.ROLES = ["admin", "customerservice", "customer" , "shop"];
db.SERVICES = ['Electrical' , 'Plumbing' , 'Air Conditioning' , 'Construction', 'Home Appliances', 'Electronics', 'Decoration', 'Upholstery', 'Curtains', 'Swimming Pool', 'Tiles', 'LandScape', 'Aluminum and Glass', 'Wrought Iron', 'Carpentry', 'Move and installation of Furniture', 'Umbrellas and Tents', 'Designing', 'Cleaning', 'Painting'  ]
db.CITIES = ['Abha' , 'Al-Ahsa' , 'Al-Khobar' , 'Baha', 'Dammam', 'Dhahran', 'Hail', 'Jeddah', 'Jizan', 'Jouf', 'Jubail', 'Madinah', 'Makkah', 'Najran', 'Qassem', 'Qatif', 'Riyadh', 'Tabouk', 'Taif', 'Yanbu' ]

module.exports = db;
