const Sequelize = require('sequelize');
const dbConfig = require('../app/config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  dialect: 'postgres' // Replace with your actual dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.bootcamps = require('./bootcamp')(sequelize, Sequelize.DataTypes);
db.users = require('./user')(sequelize, Sequelize.DataTypes);
db.userBootcamps = require('./createuserbootcamps')(sequelize, Sequelize.DataTypes);

// Define the many-to-many relationship
db.bootcamps.belongsToMany(db.users, {
  through: db.userBootcamps,
  as: 'users',
  foreignKey: 'bootcampId'
});

db.users.belongsToMany(db.bootcamps, {
  through: db.userBootcamps,
  as: 'bootcamps',
  foreignKey: 'userId'
});

module.exports = db;