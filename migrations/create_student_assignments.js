module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("student_assignments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      submission_status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "pending",
      },
      instructor_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "users",
          key: "id",
        },
      },
      student_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "users",
          key: "id",
        },
      },
      submission_date: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
          isDate: true,
        },
      defaultValue: null
      },
      assignment_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "assignments",
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
    await queryInterface.dropTable("student_assignments");
  },
};
