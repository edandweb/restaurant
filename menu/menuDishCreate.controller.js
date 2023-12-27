const { ObjectId } = require('mongodb');
const mongoDB = require('../database/MongoDB');

const menuId = new ObjectId('658c104ad758d1f5f131a1fb');

const menuDishCreateController = async (dish) => {
  await mongoDB.client.db('restaurant').collection('menu').updateOne(
    { _id: menuId },
    { $push: { dishes: dish } },
  );
};

module.exports = menuDishCreateController;
