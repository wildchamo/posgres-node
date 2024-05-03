const boom = require("@hapi/boom");

const { models } = require("./../libs/sequelize");

class CategoryService {
  constructor() {}
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ["products"]
    });
    return category;
  }

  async update(id, changes) {
    return {
      id,
      changes
    };
  }

  async delete(id) {
    const category = await models.Category.findByPk(id);
    if (!category) {
      throw boom.notFound("category not found");
    }
    await models.Category.destroy({
      where: {
        id
      }
    });
    return { "deleted category": id };
  }
}

module.exports = CategoryService;
