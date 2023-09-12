const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(value, salt);
        this.setDataValue('password', hashedPassword);
      },
      get() {
        return undefined;
      },
    }
  }, {
    paranoid: true,
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });

  User.associate = (models) => {
    // Define associations here
    User.hasMany(models.Assignment, {
      foreignKey: 'instructor_id',
      as: 'assignemnt',
    });

    User.hasMany(models.student_assignment, {
      foreignKey: 'student_id',
      as: 'student_assignemnt',
    });

  }
  

  return User;
};