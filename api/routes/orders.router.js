const express = require("express");

const OrdersService = require("../services/order.service");

const { validatorHandler } = require("../middlewares/validator.handle");

const {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema
} = require("../schemas/order.schema.js");

const router = express.Router();

const service = new OrdersService();

router.get("/", async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getOrderSchema, "params"),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      res.json(await service.findOne(id));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createOrderSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
