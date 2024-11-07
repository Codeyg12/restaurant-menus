const { Restaurant } = require("./Restaurant");
const { Menu } = require("./Menu");
const { Item } = require("./Item");

Menu.belongsTo(Restaurant);
Restaurant.hasMany(Menu);

Item.hasMany(Menu);
Menu.hasMany(Item);

module.exports = { Restaurant, Menu, Item };
