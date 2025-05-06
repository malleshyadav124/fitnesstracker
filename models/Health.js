const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Health = sequelize.define('Health', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            min: 20,
            max: 300
        }
    },
    height: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            min: 100,
            max: 250
        }
    },
    heart_rate: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 40,
            max: 220
        }
    },
    blood_pressure_systolic: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 70,
            max: 200
        }
    },
    blood_pressure_diastolic: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 40,
            max: 130
        }
    },
    blood_sugar: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            min: 0,
            max: 500
        }
    },
    sleep_hours: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            min: 0,
            max: 24
        }
    },
    stress_level: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 1,
            max: 10
        }
    }
}, {
    timestamps: true
});

Health.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Health, { foreignKey: 'user_id' });

module.exports = Health; 