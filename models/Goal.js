const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Goal = sequelize.define('Goal', {
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
    goal_type: {
        type: DataTypes.ENUM('weight', 'exercise', 'nutrition', 'sleep', 'water', 'other'),
        allowNull: false
    },
    target_value: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    current_value: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    target_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('in_progress', 'completed', 'failed', 'abandoned'),
        allowNull: false,
        defaultValue: 'in_progress'
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    progress_notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true
});

Goal.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Goal, { foreignKey: 'user_id' });

module.exports = Goal; 