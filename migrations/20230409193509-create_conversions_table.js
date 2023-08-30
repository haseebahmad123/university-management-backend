module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("conversions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      source_currency: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      target_currency: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      conversion_rate: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 4),
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
    await queryInterface.dropTable("conversions");
  },
};
