const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const description = Joi.string().min(3).max(15);
const categoryId = Joi.number().integer();

const limit = Joi.number().integer().min(1);
const offset = Joi.number().integer().min(0);
const minPrice = Joi.number().integer().min(0);
const maxPrice = Joi.number().integer().min(1);

const createProductsSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId.required()
});

const updateProductsSchema = Joi.object({
  id: id,
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId: categoryId
});

const getProductSchema = Joi.object({
  id: id.required()
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  minPrice,
  maxPrice: maxPrice.when("price_min", {
    is: Joi.number().integer(),
    then: Joi.required()
  })
});

module.exports = {
  createProductsSchema,
  updateProductsSchema,
  getProductSchema,
  queryProductSchema
};
