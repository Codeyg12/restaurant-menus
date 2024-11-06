const { sequelize } = require("./db");
const { Restaurant, Menu } = require("./models/index");
const { seedRestaurant, seedMenu } = require("./seedData");

describe("Restaurant and Menu Models", () => {
  /**
   * Runs the code prior to all tests
   */
  let restaurants;
  let menus;
  const randomNum = Math.floor(Math.random() * 3);

  beforeEach(async () => {
    await sequelize.sync({ force: true });
    restaurants = await Restaurant.bulkCreate(seedRestaurant);
    menus = await Menu.bulkCreate(seedMenu);
  });
  
  test("can create a Restaurant", async () => {
    expect(restaurants[randomNum]).toBeInstanceOf(Restaurant);
  });

  test("can create a Menu", async () => {
    expect(menus[randomNum]).toBeInstanceOf(Menu);
  });

  test("can find Restaurants", async () => {
    const foundRestaurant = await Restaurant.findOne({
      where: { name: "AppleBees" },
    });
    expect(foundRestaurant).toEqual(expect.objectContaining(foundRestaurant));
  });

  test("can find Menus", async () => {
    const foundMenu = await Menu.findOne({ where: { title: "Lunch" } });
    expect(foundMenu).toEqual(expect.objectContaining(foundMenu));
  });

  test("can update Restaurants", async () => {
    const foundRestaurant = await Restaurant.findOne({
      where: { name: "AppleBees" },
    });
    const updatedRestaurant = await foundRestaurant.update({
      name: "Taco Bell",
    });
    expect(updatedRestaurant).toEqual(
      expect.objectContaining({ name: "Taco Bell" })
    );
  });

  test("can update Menus", async () => {
    const foundMenu = await Menu.findOne({ where: { title: "Lunch" } });
    const updatedMenu = await foundMenu.update({ title: "Brunch" });
    expect(updatedMenu).toEqual(expect.objectContaining({ title: "Brunch" }));
  });

  test("can delete Restaurants", async () => {
    await Restaurant.destroy({ where: { name: "AppleBees" } });
    const restaurants = await Restaurant.findAll();

    expect(restaurants).toHaveLength(2);
  });

  test("can delete Restaurants", async () => {
    const deleted = await Menu.destroy({ where: { title: "Lunch" } });
    expect(deleted).toBe(1);
  });
});
