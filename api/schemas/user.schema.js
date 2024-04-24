const Joi = require("joi");

const id = Joi.number();
const name = Joi.string().min(3).max(15);
const email = Joi.string().email();
const password = Joi.string().min(5);
const role = Joi.string().min(3);

const createUsersSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  role: role.required() 
});

const updateUsersSchema = Joi.object({
  name: name,
  email: email,
  password: password,
  role: role
});

const geUsersSchema = Joi.object({
  id: id.required()
});

module.exports = {
  createUsersSchema,
  updateUsersSchema,
  geUsersSchema
};
