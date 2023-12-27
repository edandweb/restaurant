const Queue = require('bee-queue');

class RestaurantQueues {
  constructor() {
    this.queues = {
      ORDERS_WAITING: new Queue('ORDERS_WAITING'),
      ORDERS_READY: new Queue('ORDERS_READY'),
    };
  }

  init() {
    this.queues.ORDERS_WAITING.on('job progress', (jobId, progress) => {
      console.log(`ORDERS_WAITING - Job ${jobId} reported progress: ${progress}%`);
    });
    this.queues.ORDERS_READY.on('job progress', (jobId, progress) => {
      console.log(`ORDERS_READY - Job ${jobId} reported progress: ${progress}%`);
    });
  }

  process(chefs) {
    const getFirstAvailableChef = () => {
      const availableChefs = chefs.filter((chef) => chef.workStatus === 'AVAILABLE');
      return availableChefs[0];
    };

    this.queues.ORDERS_WAITING.process(async (job, done) => {
      try {
        const availableChef = getFirstAvailableChef();
        if (availableChef) {
          availableChef.setNotAvailable();
          console.log(`${availableChef.name} is preparing order: ${job.id}`);
          setTimeout(() => {
            availableChef.setAvailable();
          }, 5000);
          return done(null, { status: 'completed', orderId: job.id });
        }
        console.log('No Chef available');
        throw new Error('Unable to process now, retrying later...');
      } catch (error) {
        return done(error);
      }
    });
  }
}

const restaurantQueues = new RestaurantQueues();
restaurantQueues.init();

module.exports = restaurantQueues;
