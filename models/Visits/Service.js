// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../../config/connection');

class Service extends Model {}

Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    service_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'service_category',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'service'
  }
);

module.exports = Service;
