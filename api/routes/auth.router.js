const express = require("express");

const router = express.Router();

const passport = require("passport");

const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

router.get("/", (req, res) => {
  res.json({ res: "hola" });
});

router.post(
  "/login",
  passport.authenticate("local", { session: false }),

  async (req, res, next) => {
    try {
      const user = req.user;

      const payload = {
        sub: user.id,
        role: user.role
      };

      const token = jwt.sign(payload, secret);

      res.json({
        user,
        token
      });
      
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
