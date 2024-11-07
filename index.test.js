const { sequelize } = require("./db");
const { Restaurant, Menu, Item } = require("./models/index");
const { seedRestaurant, seedMenu, seedItem } = require("./seedData");

describe("Restaurant and Menu Models", () => {
  /**
   * Runs the code prior to all tests
   */
  let restaurants;
  let menus;
  let items;
  const randomNum = Math.floor(Math.random() * 3);

  beforeEach(async () => {
    await sequelize.sync({ force: true });
    restaurants = await Restaurant.bulkCreate(seedRestaurant);
    menus = await Menu.bulkCreate(seedMenu);
    items = await Item.bulkCreate(seedItem);
  });

  describe("restaurant tests", () => {
    test("can create a Restaurant", async () => {
      expect(restaurants[randomNum]).toBeInstanceOf(Restaurant);
    });

    test("can find Restaurants", async () => {
      const foundRestaurant = await Restaurant.findOne({
        where: { name: "AppleBees" },
      });
      expect(foundRestaurant).toEqual(expect.objectContaining(foundRestaurant));
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

    test("can delete Restaurants", async () => {
      await Restaurant.destroy({ where: { name: "AppleBees" } });
      const restaurants = await Restaurant.findAll();

      expect(restaurants).toHaveLength(2);
    });
  });

  describe("menu test", () => {
    test("can create a Menu", async () => {
      expect(menus[randomNum]).toBeInstanceOf(Menu);
    });

    test("can find Menus", async () => {
      const foundMenu = await Menu.findOne({ where: { title: "Lunch" } });
      expect(foundMenu).toEqual(expect.objectContaining(foundMenu));
    });

    test("can update Menus", async () => {
      const foundMenu = await Menu.findOne({ where: { title: "Lunch" } });
      const updatedMenu = await foundMenu.update({ title: "Brunch" });
      expect(updatedMenu).toEqual(expect.objectContaining({ title: "Brunch" }));
    });

    test("can delete Menus", async () => {
      const deleted = await Menu.destroy({ where: { title: "Lunch" } });
      expect(deleted).toBe(1);
    });
  });

  describe("item test", () => {
    test("can create an item", async () => {
      expect(items[randomNum] instanceof Item).toBeTruthy();
    });

    test("can find items", async () => {
      const foundItem = await Item.findOne({ where: { vegetarian: true } });
      expect(foundItem.id).toBe(1);
    });

    test("can update items", async () => {
      await Item.update(
        { image: "someimage.png" },
        { where: { image: "someimage.jpg" } }
      );
      const updatedItems = await Item.findAll();
      expect(updatedItems[0]).toEqual(
        expect.objectContaining({ image: "someimage.png" })
      );
    });

    test("can delete items", async () => {
      const newItem = await Item.create({
        name: "Chicken Tatar",
        image: "animage.jpg",
        price: 1000.0,
        vegetarian: true,
      });
      await newItem.destroy();
      const allItems = await Item.findAll();
      expect(allItems).toEqual(expect.not.objectContaining(newItem));
    });
  });

  describe("restaurant and menu relation", () => {
    let restaurantMenus;

    beforeAll(async () => {
      const menu1 = menus[0];
      const menu2 = menus[2];
      const restaurant = restaurants[1];

      await restaurant.setMenus([menu1, menu2]);
      restaurantMenus = await restaurant.getMenus();
    });

    test("post belongs to user", () => {
      expect(restaurantMenus).toHaveLength(2);
    });

    test("user can have many posts", () => {
      expect(restaurantMenus[0].RestaurantId).toBe(2);
    });
  });

  describe("item and menu relation", () => {
    let menuItems;
    let itemMenus;

    beforeAll(async () => {
      const menu1 = menus[0];
      const menu2 = menus[2];
      const item1 = items[0];
      const item2 = items[2];

      await item1.setMenus([menu1, menu2]);
      await menu1.setItems([item1, item2]);

      itemMenus = await item1.getMenus();
      menuItems = await menu1.getItems();
    });

    test("item can have many menus", () => {
      expect(itemMenus).toHaveLength(2);
    });

    test("menu can have many items", () => {
      expect(menuItems).toHaveLength(2);
    });
  });

  test("testing eager loading for menu items", async () => {
    const eagerMenu = await Menu.findByPk(1, { include: Item });
    expect(eagerMenu).toEqual(expect.objectContaining({ Items: [] }));
  });
});
