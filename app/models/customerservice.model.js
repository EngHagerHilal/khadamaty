module.exports = (sequelize, Sequelize) => {
    const CustomerService = sequelize.define("customerservices", {
        username:{
            type: Sequelize.STRING ,
            unique : true ,
            allowNull : false 
            },
            
        phone: {
                type : Sequelize.STRING,
                unique : true ,
                allowNull : false ,
                
        },
     
    available :
     {
        type : Sequelize.BOOLEAN ,
        defaultValue : false 
     }
    });
    return CustomerService;
};