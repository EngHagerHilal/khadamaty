module.exports = (sequelize, Sequelize) => {
    const Shop = sequelize.define("shops", {
      shopid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name : {
        type: Sequelize.STRING ,
        allowNull: false,
        unique : true
      },
      ownername : {
        type : Sequelize.STRING 
      },
      addresse : {
        type : Sequelize.STRING ,  
      },
      city : {
        type : Sequelize.ENUM , 
        values : ['Abha' , 'Al-Ahsa' , 'Al-Khobar' , 'Baha', 'Dammam', 'Dhahran', 'Hail', 'Jeddah', 'Jizan', 'Jouf', 'Jubail', 'Madinah', 'Makkah', 'Najran', 'Qassem', 'Qatif', 'Riyadh', 'Tabouk', 'Taif', 'Yanbu' 
        ],
        allowNull : false
      
      },
      service : {
        type : Sequelize.ENUM , 
        values : ['Electrical' , 'Plumbing' , 'Air Conditioning' , 'Construction', 'Home Appliances', 'Electronics', 'Decoration', 'Upholstery', 'Curtains', 'Swimming Pool', 'Tiles', 'LandScape', 'Aluminum and Glass', 'Wrought Iron', 'Carpentry', 'Move and installation of Furniture', 'Umbrellas and Tents', 'Designing', 'Cleaning', 'Painting'  ],
        allowNull: false
      },
      rate : {
         type : Sequelize.FLOAT 
      },
      verified : {
         type : Sequelize.BOOLEAN ,
         defaultValue : false 
      },
      description : {
        type: Sequelize.STRING ,
        allowNull: false
      }
    } 
    );
    return Shop ;
};