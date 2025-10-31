const { SEQUELIZE } = require('../db/db.js');
const { DataTypes } = require("sequelize");

const User = SEQUELIZE.define("admin_users",
{
    user:
    {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
            is: /[^a-zA-Z\s]+/,
            len: [3, 50]
        },
    },
    password:
    {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
            len: [8, 16]
        },
    },
});

module.exports = { User };