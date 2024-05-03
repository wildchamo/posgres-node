const Joi = require("joi");

const id = Joi.number().integer();
const customerId = Joi.number().integer();

const getOrderSchema = Joi.object({
  id: id.required()
});

const createOrderSchema = Joi.object({
  customerId: customerId.required()
});

const updateOrderSchema = Joi.object({
  id: id.required(),
  customerId: customerId
});



module.exports = {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema
};
