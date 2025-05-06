const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 120
        }
    },
    gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull: false
    },
    height: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 100,
            max: 250
        }
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 20,
            max: 300
        }
    },
    activity_level: {
        type: DataTypes.ENUM('sedentary', 'light', 'moderate', 'active', 'very_active'),
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = User; 