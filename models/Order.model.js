module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
      "Order",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT,
        },
        firstname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone_number: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        destination_country: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        total_amount: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        order_note: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        order_detail: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        payment_by_flutterwave: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        payment_by_flutterwave: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        payment_status: {
          type: DataTypes.ENUM("pending", "done"),
          allowNull: false,
          defaultValue: "pending",
        },
        payment_receipt: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        order_ref: {
          type: DataTypes.STRING,
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
  
    return Order;
  };