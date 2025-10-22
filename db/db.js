require('dotenv').config()

const mysql = require('mysql2/promise');

export const startdb = await mysql.createConnection(
    {
        host: process.env.DB_HOSTNAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    }
);

