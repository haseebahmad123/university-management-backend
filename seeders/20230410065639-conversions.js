module.exports = {
  up: async (queryInterface) => {
    var conversionData = [];

    conversionData = [
      {
        source_currency: "USD",
        target_currency: "NGN",
        conversion_rate: 772.34,
      },
    ];

    return queryInterface.bulkInsert("conversions", conversionData, {});
  },

  down: (queryInterface) => queryInterface.bulkDelete("conversions", null, {}),
};
