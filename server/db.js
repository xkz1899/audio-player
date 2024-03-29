const { Sequelize } = require("sequelize")

module.exports = new Sequelize({
	dialect: "postgres",
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_DATABASE,
})
