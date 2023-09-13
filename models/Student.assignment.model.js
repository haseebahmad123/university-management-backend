module.exports = (sequelize, DataTypes) => {
    const student_assignment = sequelize.define('student_assignment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      submission_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
      assignment_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
        references: {
          model: "assignments",
          key: "id",
        },
      },
      submission_date: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: true,
        },
        defaultValue: null
      },
      instructor_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
        references: {
          model: "users",
          key: "id",
        },
      },
      student_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
        references: {
          model: "users",
          key: "id",
        },
      },
    }, {
      paranoid: true,
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    });
  
    student_assignment.associate = (models) => {
      // Define associations here
      student_assignment.belongsTo(models.User, {
        foreignKey: 'instructor_id',
        as: 'instructorAssignment',
      });
      student_assignment.belongsTo(models.User, {
        foreignKey: 'student_id',
        as: 'student_assignments',
      });

      student_assignment.belongsTo(models.Assignment, {
        foreignKey: 'assignment_id',
        as: 'assignments',
      });

    };
  
    return student_assignment;
  };
  