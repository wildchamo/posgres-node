const express = require("express");

const router = express.Router();

const passport = require("passport");

const AuthService = require("../services/auth.service");

const service = new AuthService();

router.get("/", (req, res) => {
  res.json({ res: "hola" });
});

router.post(
  "/login",
  passport.authenticate("local", { session: false }),

  async (req, res, next) => {
    try {
      const user = req.user;

      const token = await service.signToken({ user });

      res.json({
        token
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/recovery", async (req, res, next) => {
  try {
    const { email } = req.body;

    const message = await service.sendRecoveryLink(email);

    res.json({
      message: message
    });
  } catch (error) {
    next(error);
  }
});

router.post("/change-password", async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const rta = await service.changePassword({ token, password });

    res.json({
      message: rta
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
