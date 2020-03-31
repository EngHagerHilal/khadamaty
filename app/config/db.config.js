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
		connectTimeout: 60000  ,
		collate: 'utf8_general_ci'
    } 
};
*/

module.exports = {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "",
    DB: "app",
	dialect: "mysql" || "postgres" ,
//	HEROKU_POSTGRESQL_GRAY_URL : "postgres://buvixahfmwttok:5490fdbd04ed864226739d1d1f9a39c520afe4f8877d7d3f5b5ff33127a48132@ec2-34-200-101-236.compute-1.amazonaws.com:5432/d98jmi83m7lqmt",
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