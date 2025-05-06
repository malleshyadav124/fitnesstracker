const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Water = sequelize.define('Water', {
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
  dailyGoal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2000
  },
  currentAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Waters',
  timestamps: true
});

module.exports = Water; 