const express = require("express");

const UserService = require("../services/user.service");

const { validatorHandler } = require("../middlewares/validator.handle");

const {
  createUsersSchema,
  updateUsersSchema,
  geUsersSchema
} = require("../schemas/user.schema");

const router = express.Router();

const service = new UserService();

router.get("/", async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(geUsersSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const newUser = await service.findOne(id);
      res.json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createUsersSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json({
        message: "created",
        data: newUser
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(geUsersSchema, "params"),
  validatorHandler(updateUsersSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json({
        message: "created",
        data: newUser
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(geUsersSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const idDeleted = await service.delete(id);
      res.status(201).json({
        message: "deleted",
        data: idDeleted
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
