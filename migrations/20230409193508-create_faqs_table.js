module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("faqs", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT,
        },
        question: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        answer: {
          allowNull: false,
          type: Sequelize.TEXT,
          defaultValue: "user",
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
      await queryInterface.dropTable("faqs");
    },
  };
  