const express = require('express');
const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router.js');
const usersRouter = require('./users.router.js');
const CustomerRouter = require('./customers.router.js');
const OrdersRouter = require('./orders.router.js');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/customers', CustomerRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/orders', OrdersRouter);
}

module.exports = routerApi;
