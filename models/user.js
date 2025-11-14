const { SEQUELIZE } = require('../db/db.js');
const { DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');

const User = SEQUELIZE.define("admin_users",
{
    user:
    {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /[^a-zA-Z\s]+/, 
            len: [3, 50]
        },
    },
    password:
    {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 16]
        },
    },
},
{
    timestamps: false,
});

User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
});

User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = { User };