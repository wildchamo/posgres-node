const boom = require("@hapi/boom");

const Joi = require("joi");

const pool = require("../libs/postgresPool");

class UserService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (err) => {
      console.error(err);
    });
  }

  async create({ name, price, image }) {}

  async find() {
    const query = "SELECT * FROM tasks";
    const data = await this.pool.query(query);
    return data.rows;
  }

  async findOne(id) {}

  async update(id, productUpdate) {}

  async delete(id) {}
}

module.exports = UserService;
