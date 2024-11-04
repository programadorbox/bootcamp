// createuserbootcamps.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CreateUserBootcamps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CreateUserBootcamps.init({
    userId: DataTypes.INTEGER,
    bootcampId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CreateUserBootcamps',
  });
  return CreateUserBootcamps;
};