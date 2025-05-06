const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Fitness = sequelize.define('Fitness', {
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
    exercise_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration_minutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    calories_burned: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    distance_km: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            min: 0
        }
    },
    intensity_level: {
        type: DataTypes.ENUM('low', 'moderate', 'high'),
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true
});

Fitness.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Fitness, { foreignKey: 'user_id' });

module.exports = Fitness; 