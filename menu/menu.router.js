const express = require('express');
const { ObjectId } = require('mongodb');
const mongoDB = require('../database/MongoDB');
const menuDishCreateController = require('./menuDishCreate.controller');
const menuRouter = express.Router();
const menuId = new ObjectId('658c104ad758d1f5f131a1fb');

/* GET users listing. */
menuRouter.get('/', async (req, res, next) => {
  const menu = await mongoDB.client.db('restaurant').collection('menu').findOne(menuId);
  res.send(menu.dishes);
});

menuRouter.post('/dish', async (req, res) => {
  const {
    dishId, name, price, preparationTimeInMn,
  } = req.body;
  const dish = {
    dishId, name, price, preparationTimeInMn,
  };
  menuDishCreateController(dish);
  res.send({ message: 'Success' });
});

module.exports = menuRouter;
