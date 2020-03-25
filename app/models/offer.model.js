module.exports = (sequelize, Sequelize) => {
    const Offer = sequelize.define("services", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
      }, 
      percentage :{
          type : Sequelize.INTEGER,
          validate: { min: 0, max: 100 }
      },
      startAt : {
        type: Sequelize.DATE ,
        defaultValue : Sequelize.NOW
      },
      deadline : {
        type: Sequelize.DATE 
      }
    });
    return Offer;
  };
  