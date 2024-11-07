const { DataTypes, Model, sequelize } = require("../db");

class Item extends Model {}

Item.init(
  {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER,
    vegetarian: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: "Item",
  }
);

module.exports = { Item };
