module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      product_title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      product_description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      product_status: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "user",
      },
      price: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      image_path: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("products");
  },
};
