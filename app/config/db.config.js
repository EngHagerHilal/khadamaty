/*module.exports = {
    HOST: "64.37.61.34",
    USER: "leencome_khadamatyapp",
    PASSWORD: "khadamatyapp",
    DB: "leencome_khadamaty",
    dialect: "mysql" ,
    port : "2083" ,
    retry  : {
		match: [
			/ETIMEDOUT/,
			/EHOSTUNREACH/,
			/ECONNRESET/,
			/ECONNREFUSED/,
			/ETIMEDOUT/,
			/ESOCKETTIMEDOUT/,
			/EHOSTUNREACH/,
			/EPIPE/,
			/EAI_AGAIN/,
			/SequelizeConnectionError/,
			/SequelizeConnectionRefusedError/,
			/SequelizeHostNotFoundError/,
			/SequelizeHostNotReachableError/,
			/SequelizeInvalidConnectionError/,
			/SequelizeConnectionTimedOutError/
		],
		max  : 5
    },
    dialectOptions: {
        connectTimeout: 60000  
    } 
};
*/
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "app",
    dialect: "mysql" ,
    retry  : {
		match: [
			/ETIMEDOUT/,
			/EHOSTUNREACH/,
			/ECONNRESET/,
			/ECONNREFUSED/,
			/ETIMEDOUT/,
			/ESOCKETTIMEDOUT/,
			/EHOSTUNREACH/,
			/EPIPE/,
			/EAI_AGAIN/,
			/SequelizeConnectionError/,
			/SequelizeConnectionRefusedError/,
			/SequelizeHostNotFoundError/,
			/SequelizeHostNotReachableError/,
			/SequelizeInvalidConnectionError/,
			/SequelizeConnectionTimedOutError/
		],
		max  : 5
    },
    dialectOptions: {

        connectTimeout: 60000 ,
		collate: 'utf8_general_ci'

      }
      
      
};