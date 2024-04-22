const boom = require("@hapi/boom");

const Joi = require("joi");

const pool = require("../libs/postgresPool");

const { models } = require("../libs/sequelize");

class UserService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (err) => {
      console.error(err);
    });
  } 

  async create({ name, email, password }) {
    const rta = await models.User.create({ name, email, password });
    return { rta };
  }

  async find() {
    const rta = await models.User.findAll();
    return { rta };
  }

  async findOne(id) {
    const rta = await models.User.findByPk(id);
    return { rta };

  }

  async update(id, productUpdate) {}

  async delete(id) {}
}

module.exports = UserService;
