const Sequelize = require("sequelize");
const db = require("../database/database");

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: true,
  },
  cellphone: {
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: "users",
});

module.exports = User;
