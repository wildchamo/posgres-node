const boom = require("@hapi/boom");

const { models } = require("../libs/sequelize");

class OrderService {
  constructor() {}

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find() {
    return await models.Order.findAll();
  }

  async findOne(id) {
    return id;
  }

  async update(id, changes) {}

  async delete(id) {}
}

module.exports = OrderService;
