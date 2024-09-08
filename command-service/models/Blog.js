const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Sequelize instance

const Blog = sequelize.define('Blog', {
  blogName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [5] }
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [5] }
  },
  article: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: { len: [100] }
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'blogs'
});

module.exports = Blog;
