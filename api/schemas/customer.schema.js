const Joi = require("joi");
const {createUsersSchema}= require("./user.schema");
const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const phone = Joi.string();

const userId = Joi.number().integer();
const getCustomerSchema = Joi.object({ id: id.required() });

const createCustomerSchema = Joi.object({
  name: name.required(),
  phone: phone.required(),
  user: createUsersSchema
});

const updateCustomerSchema = Joi.object({ name, phone, userId });

module.exports = {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema
};
