const express = require("express");

const UserService = require("../services/user.service");
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

// router.get('/', (req, res) => {
//   const { limit, offset } = req.query;
//   if (limit && offset) {
//     res.json({ limit, offset });
//   } else {
//     res.send('todo los datos papa lindo');
//   }
// });

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ id, username: "Luis" });
});

module.exports = router;
