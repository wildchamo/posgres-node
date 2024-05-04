const { Model, DataTypes, Sequelize } = require("sequelize");

const ORDER_PRODUCT_TABLE = "orders_products";

const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  orderId: {
    field: "order_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: "orders",
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL"
  },
  productId: {
    field: "product",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: "products",
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL"
  }
};

class OrderProduct extends Model {
  static associate(models) {
    this.belongsTo(models.Order, { as: "order", foreignKey: "orderId" });
    this.belongsTo(models.Product, { as: "product", foreignKey: "productId" });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: "OrdersProducts",
      timestamps: false
    };
  }
}

module.exports = {
  ORDER_PRODUCT_TABLE: ORDER_PRODUCT_TABLE,
  OrderProductSchema: OrderProductSchema,
  OrderProduct
};
