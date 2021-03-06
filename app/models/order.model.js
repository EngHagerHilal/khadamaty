module.exports = (sequelize, Sequelize) => {
    const {  DataTypes } = require('sequelize');
    const Order = sequelize.define("orders", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    addresse :{
       type : Sequelize.STRING
    },
    status : {
        type : Sequelize.ENUM , 
        values : ['Completed'  , 'Accepted' , 'Rejected' ] ,
        defaultValue : null 
    },
    description : {
        type : Sequelize.STRING ,
        allowNull : false
    },
    city : {
        type : Sequelize.ENUM , 
        allowNull : false ,
        values : ['Abha' , 'Al-Ahsa' , 'Al-Khobar' , 'Baha', 'Dammam', 'Dhahran', 'Hail', 'Jeddah', 'Jizan', 'Jouf', 'Jubail', 'Madinah', 'Makkah', 'Najran', 'Qassem', 'Qatif', 'Riyadh', 'Tabouk', 'Taif', 'Yanbu' 
        ]
    }
    ,
    service : {
        type : Sequelize.ENUM , 
        values : ['Electrical' , 'Plumbing' , 'Air Conditioning' , 'Construction', 'Home Appliances', 'Electronics', 'Decoration', 'Upholstery', 'Curtains', 'Swimming Pool', 'Tiles', 'LandScape', 'Aluminum and Glass', 'Wrought Iron', 'Carpentry', 'Move and installation of Furniture', 'Umbrellas and Tents', 'Designing', 'Cleaning', 'Painting'  ],
        allowNull: false
    },
    phone : {
        type : Sequelize.STRING 
    } ,
    username  : {
        type : Sequelize.STRING
    }
    }
); 
    return Order;
};
  