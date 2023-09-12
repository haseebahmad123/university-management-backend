module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("assignments", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        description: {
          allowNull: true,
          type: Sequelize.TEXT,
        },
        due_date: {
          allowNull: false,
          type: Sequelize.DATE,
          validate: {
            isDate: true,
          },
        },
        instructor_id: {
          allowNull: false,
          type: Sequelize.BIGINT,
          references: {
            model: "users",
            key: "id",
          },
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
      await queryInterface.dropTable("assignments");
    },
  };
  