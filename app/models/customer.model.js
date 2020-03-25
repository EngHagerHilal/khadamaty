module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customers", {
      name : {
        type: Sequelize.STRING ,
        allowNull: false,
      },
      addresse : {
          type : Sequelize.STRING
      } ,
      rate : {
          type : Sequelize.FLOAT 
      },
      city : {
        type : Sequelize.ENUM , 
        values : ['Abha' , 'Al-Ahsa' , 'Al-Khobar' , 'Baha', 'Dammam', 'Dhahran', 'Hail', 'Jeddah', 'Jizan', 'Jouf', 'Jubail', 'Madinah', 'Makkah', 'Najran', 'Qassem', 'Qatif', 'Riyadh', 'Tabouk', 'Taif', 'Yanbu' 
        ],
      }
    });
    return Customer;
};
