const { sequelize, DataTypes, Model } = require("../db");

// TODO - create a Menu model
class Menu extends Model {}

Menu.init(
  {
    title: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Menu",
  }
);

module.exports = { Menu };
