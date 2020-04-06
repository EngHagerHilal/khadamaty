module.exports = (sequelize, Sequelize) => {
    const validatePhoneNumber = require('validate-phone-number-node-js');
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING ,
            allowNull: false,
            unique: true ,
            validate : {
                isEmail: {
                    msg: 'not an email'
                  }
            }
        },
        username:{
        type: Sequelize.STRING ,
        unique : true ,
        allowNull : false 
        },
        password: {
        type: Sequelize.STRING ,
        allowNull : false
        } ,
        role :{
            type : Sequelize.STRING ,
            allowNull : false
        },
        phone: {
            type : Sequelize.STRING,
            unique : true ,
            allowNull : false ,
            validate : {
                isNumeric: true,     
                isPhone(value) {
                    if (!validatePhoneNumber.validate(value)) {
                        res.status(428 ).send({
                            message: "Invalid phone number " 
                          });
                    }
                },
                isSaudi(value) {
                    if ( value.startsWith("966") == false ){
                        res.status(428).send({
                            message: "Invalid phone number " 
                          });
                    }
                }
            }
        }
    }
    );
    return User;
};