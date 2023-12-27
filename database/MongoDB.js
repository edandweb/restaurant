const { MongoClient, ServerApiVersion } = require('mongodb');

class MongoDB {
  constructor() {
    const uri = 'mongodb+srv://demo:SltM0nrUxQ@demo.trvwfqx.mongodb.net/?retryWrites=true&w=majority';
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }

  async init() {
    await this.client.connect();
    // Send a ping to confirm a successful connection
    await this.client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  }

  async close() {
    await this.client.close();
  }
}

const mongoDB = new MongoDB();
(async () => {
  await mongoDB.init();
})();

module.exports = mongoDB;
