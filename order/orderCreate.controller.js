const { ObjectId } = require('mongodb');
const mongoDB = require('../database/MongoDB');
const restaurantQueues = require('../queues/RestaurantQueues');

const orderCreateController = async (order) => {
  const newOrder = await mongoDB.client.db('restaurant').collection('orders').insertOne(order);
  const jobChef = restaurantQueues.queues.ORDERS_WAITING.createJob({ orderId: newOrder.insertedId });
  // fixed not working
  // await jobChef.retries(3).backoff('fixed', 5000).save();
  await jobChef.retries(1000).backoff('immediate').save();
  return new ObjectId(newOrder.insertedId);
};

module.exports = orderCreateController;
