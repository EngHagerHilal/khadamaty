module.exports = {
    HOST: "cleardb.net",
    USER: "bd6980830dfc46:16a2c947",
    PASSWORD: "us-cdbr-iron-east-01",
    DB: "heroku_8c183c364711755",
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
		connectTimeout: 60000  
		
    } 
};

/*
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "app",
	dialect: "mysql" || "postgres" ,
	HEROKU_POSTGRESQL_GRAY_URL : "postgres://buvixahfmwttok:5490fdbd04ed864226739d1d1f9a39c520afe4f8877d7d3f5b5ff33127a48132@ec2-34-200-101-236.compute-1.amazonaws.com:5432/d98jmi83m7lqmt",
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
      
      
};*/