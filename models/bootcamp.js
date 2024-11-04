// models/Bootcamp.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bootcamp extends Model {
    static associate(models) {
      Bootcamp.belongsToMany(models.User, {
        through: 'CreateUserBootcamps', // Nombre de la tabla intermedia
        as: 'users',
        foreignKey: 'bootcampId',
        otherKey: 'userId',
      });
    }
  }
  Bootcamp.init(
    {
      title: DataTypes.STRING,
      cue: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Bootcamp',
    }
  );
  return Bootcamp;
};
