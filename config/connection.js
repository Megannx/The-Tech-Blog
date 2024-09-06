const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres'
    }
  );
}

sequelize.authenticate()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

module.exports = sequelize;
