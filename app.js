const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('./database/MongoDB');
const restaurantQueues = require('./queues/RestaurantQueues');
const RestaurantChef = require('./chef/RestaurantChef');

const chefs = [
  new RestaurantChef('Charles'),
  new RestaurantChef('Itsik'),
  new RestaurantChef('Laura'),
];

restaurantQueues.process(chefs);

const menuRouter = require('./menu/menu.router');
const orderRouter = require('./order/order.router');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/menu', menuRouter);
app.use('/order', orderRouter);

module.exports = app;
