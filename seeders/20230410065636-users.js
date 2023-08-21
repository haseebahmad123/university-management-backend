const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface) => {
    var usersData = [];

    const password = await bcrypt.hash("password", 10);

    usersData = [
      {
        email: "admin@brands4cheap.com",
        mobile: "111111111",
        role: "admin",
        password,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    return queryInterface.bulkInsert("users", usersData, {});
  },

  down: (queryInterface) => queryInterface.bulkDelete("users", null, {}),
};
