module.exports = (sequelize, DataTypes) => {
    const Faq = sequelize.define(
      "Faq",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT,
        },
        question: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        answer: {
          type: DataTypes.TEXT,
          allowNull: false,
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
  
    return Faq;
  };
  