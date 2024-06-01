const express = require("express");

const passport = require("passport");

const OrdersService = require("../services/order.service");

const router = express.Router();

const service = new OrdersService();

router.get(
  "/my-orders",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const userID = req.user.sub;

      console.log(userID);
      const orders = await service.findByUser(userID);

      res.json({ res: orders });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
