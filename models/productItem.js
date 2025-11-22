const { SEQUELIZE } = require('../db/db.js');
const { DataTypes } = require("sequelize");

const parseAttributes = (attributes) => {
    if (!attributes) return {};
    if (typeof attributes === 'string') {
        try {
            return JSON.parse(attributes);
        } catch (e) {
            console.warn('Error al parsear attributes:', e.message);
            return {};
        }
    }
    if (typeof attributes === 'object') {
        return attributes;
    }
    return {};
};

const ProductItem = SEQUELIZE.define("product_items",
{
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:
    {
        type: DataTypes.STRING,
        validate:
        {
            is: /^[a-zA-Z\s]+$/,
            len: [3, 100]
        },
    },
    color:
    {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
            is: /^[a-zA-Z\s]+$/,
            len: [3, 20]
        },
    },
    price:
    {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
            is: /^(0|[1-9][0-9]*)$/,
            min: 0
        },
    },
    stock:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:
        {
            is: /^(0|[1-9][0-9]*)$/,
            min: 0
        },
    },
    image_url:
    {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
            is: /[^a-zA-Z\s]+/,
            len: [3, 255]
        },
    },
    attributes:
    {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
            const value = this.getDataValue('attributes');
            if(value && typeof value === 'string') {
                try{
                    return JSON.parse(value);
                } catch(e) {
                    console.warn('Error al parsear attributes:', e.message);
                    return value;
                }
            }
            return value;
        },
        set(value) {
            if(value && typeof value === 'object') {
                this.setDataValue('attributes', JSON.stringify(value));
            }
            else {
                this.setDataValue('attributes', value);
            }
        }
    },
    status:
    {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},
{
    timestamps: false,
});

module.exports = { ProductItem };
