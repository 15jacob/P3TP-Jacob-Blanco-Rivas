const { Sequelize } = require("sequelize");

import dotenv from 'dotenv';
dotenv.config();

//"Database", "User", "Password"
const SEQUELIZE = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD,
{
    host: "127.0.0.1",
    dialect: "mysql",
});

module.exports = { SEQUELIZE };