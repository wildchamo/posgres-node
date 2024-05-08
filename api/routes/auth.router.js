const express = require("express");

const router = express.Router();

const passport = require("passport");



router.get("/", (req, res) => {
  res.json({ res: "hola" });
});

router.post(
  "/login",
  passport.authenticate("local", { session: false }),

  async (req, res, next) => {
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
