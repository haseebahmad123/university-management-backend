const { Chance } = require("chance");
const chance = new Chance();
// const { Location, Vendor } = require('../models');

module.exports = {
  up: async (queryInterface) => {
    const productsData = [];

    for (let i = 0; i < 100; i++) {
      productsData.push({
        product_title: chance.string(),
        product_description: chance.paragraph(),
        price: chance.integer({
          min: 5,
          max: 100,
        }),
        image_path: chance.url(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    return queryInterface.bulkInsert("products", productsData, {});
  },

  down: (queryInterface) => queryInterface.bulkDelete("products", null, {}),
};
