module.exports = (sequelize, DataTypes) => {
  const Conversion = sequelize.define(
    "Conversion",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },

      source_currency: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      target_currency: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      conversion_rate: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 4),
      },
    },
    {
      paranoid: true,
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  return Conversion;
};
