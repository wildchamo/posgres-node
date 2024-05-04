const Joi = require("joi");

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const getOrderSchema = Joi.object({
  id: id.required()
});

const createOrderSchema = Joi.object({
  customerId: customerId.required()
});

const addItemOrderSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required()
});

const updateOrderSchema = Joi.object({
  id: id.required(),
  customerId: customerId
});

module.exports = {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
  addItemOrderSchema
};
