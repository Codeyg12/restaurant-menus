const { sequelize, DataTypes, Model } = require("../db");

// TODO - create a Restaurant model

class Restaurant extends Model {}

Restaurant.init(
  {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    cuisine: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Restaurant",
  }
);

module.exports = { Restaurant };
