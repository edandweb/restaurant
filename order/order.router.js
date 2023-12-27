const express = require('express');

const orderRouter = express.Router();
const orderCreateController = require('./orderCreate.controller');

/* GET users listing. */
orderRouter.post('/', async (req, res, next) => {
  const { tableNumber, orderItems } = req.body;
  const orderId = await orderCreateController({ tableNumber, orderItems, status: 'WAITING_FOR_PREPARATION' });
  res.send({ orderId });
});

module.exports = orderRouter;
