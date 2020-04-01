module.exports = {
    HOST: "zy4wtsaw3sjejnud.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    USER: "kknh1k8c52xnqw8z",
    PASSWORD: "na6zoyc9xyrwvncp",
    DB: "etujd23xxihbipa0",
    dialect: "mysql" ,
    port : "3306" ,
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

/*
module.exports = {
    HOST: "localhost",
    USER: "openpg",
    PASSWORD: "hager",
    DB: "app",
	dialect: "postgres" ,
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
*/