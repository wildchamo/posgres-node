const boom = require("@hapi/boom");

const { models } = require("../libs/sequelize");

class OrderService {
  constructor() {}

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }
  async createItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    return await models.Order.findAll();
  }

  async findOne(id) {
    return await models.Order.findByPk(id, {
      include: [
        {
          association: "customer",
          include: ["user"]
        },
        'items'
      ]
    });
  }

  async update(id, changes) {}

  async delete(id) {}
}

module.exports = OrderService;
