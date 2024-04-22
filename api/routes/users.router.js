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
  async (req, res) => {
    const {id}= req.params;
    const newUser = await service.findOne(id);
    res.json(newUser);
  }
);

router.post(
  "/",
  validatorHandler(createUsersSchema, "body"),
  async (req, res) => {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json({
      message: "created",
      data: newUser
    });
  }
);

module.exports = router;
