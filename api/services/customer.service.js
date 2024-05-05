const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");
const { encryptPassword } = require("../utils/encrypt");

class CustomerService {
  constructor() {}
  async find() {
    const rta = await models.Customer.findAll({ include: ["user"] });
    return rta;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id, { include: ["user"] });
    if (!customer) {
      throw boom.notFound("customer not found");
    }
    return customer;
  }

  async create(data) {
    const encryptedPassword = await encryptPassword(data.user.password, 10);
    const newData = {
      ...data,
      user: { ...data.user, password: encryptedPassword }
    };
    const newCustomer = await models.Customer.create(newData, {
      include: ["user"]
    });
    return newCustomer;
  }
  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }
  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }
}
module.exports = CustomerService;
