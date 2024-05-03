const boom = require("@hapi/boom");

const { models } = require("../libs/sequelize");

class ProductsService {
  constructor() {}

  async create({ name, price, image, description, categoryId }) {
    const category = await models.Category.findByPk(categoryId);
    if (!category) {
      throw boom.notFound("category not found");
    } else {
      const newProduct = await models.Product.create({
        name,
        price,
        image,
        description,
        categoryId
      });
      return newProduct;
    }
  }

  async find() {
    const rta = await models.Product.findAll({
      include: ["category"]
    });
    return { rta };
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound("Product not found");
    } else {
      return product;
    }
  }

  async update(id, productUpdate) {
    const productToUpdate = this.products.findIndex((item) => item.id == id);

    if (productToUpdate == -1) {
      throw boom.notFound("Product not found");
    } else {
      let product = this.products[productToUpdate];
      product = {
        ...product,
        ...productUpdate
      };

      return this.products[productToUpdate];
    }
  }

  async delete(id) {
    const productToDelete = this.products.findIndex((item) => item.id == id);
    if (productToDelete == -1) {
      throw boom.notFound("Product not found");
    } else {
      this.products.splice(productToDelete, 1);
      return { message: "Product deleted", id: productToDelete };
    }
  }
}

module.exports = ProductsService;
