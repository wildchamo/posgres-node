const { UserSchema, User } = require("./user.model");
const { CustomerSchema, Customer } = require("./customer.model");

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  Customer.associate(sequelize.models);
}

module.exports = setUpModels;
