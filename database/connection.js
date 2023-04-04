const Sequelize = require("sequelize");

const sequelize = new Sequelize(
   'gqlappdb',
   'rizwan',
   'optima1234',
    {
      host: '127.0.0.1',
      dialect: 'postgres'
    }
  );
  module.exports = sequelize;