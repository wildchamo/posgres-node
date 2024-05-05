const boom = require("@hapi/boom");

const pool = require("../libs/postgresPool");

const { encryptPassword } = require("../utils/encrypt");

const { models } = require("../libs/sequelize");

class UserService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (err) => {
      console.error(err);
    });
  }
  async create({ name, email, password, role }) {
    const encryptedPassword = await encryptPassword(password);
    const newUser = await models.User.create({
      name,
      email,
      password: encryptedPassword,
      role
    });
    const { password: pwd, ...userWithoutPassword } = newUser.dataValues;
    return { user: userWithoutPassword };
  }
  async find() {
    const rta = await models.User.findAll({ include: ["customer"] });
    return rta;
  }

  async findOne(id) {
    const rta = await models.User.findByPk(id);
    if (!rta) {
      throw boom.notFound("User not found");
    }
    return rta;
  }

  async update(id, userUpdate) {
    const user = this.findOne(id);

    const rta = user.update(userUpdate);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return id;
  }
}

module.exports = UserService;
