const Sequelize = require('sequelize');
const sequelize = new Sequelize('blog_db', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

const User = require('./User')(sequelize, Sequelize);
const Post = require('./Post')(sequelize, Sequelize);

User.hasMany(Post);
Post.belongsTo(User);

module.exports = {
  User,
  Post,
  Password,
  Dashboard,
  Homepage
};