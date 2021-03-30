// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../../config/connection');

class Visit extends Model {}

Visit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pet_id: {
      type: DataTypes.INTEGER,
      // CHANGE to false when implemented
      allowNull: true,
      references: {
        model: 'pet',
        key: 'id'
      }
    },
    service_provider_id: {
      type: DataTypes.INTEGER,
      // CHANGE to false when implemented
      allowNull: true,
      references: {
        model: 'service_provider',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    worked_with: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    total_cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: { isDecimal: true  }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    time: { 
      type: DataTypes.TIME,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'visit'
  }
);

module.exports = Visit;
