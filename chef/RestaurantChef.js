class RestaurantChef {
  constructor(name) {
    this.name = name;
    this.workStatus = 'AVAILABLE';
  }

  setAvailable() {
    this.workStatus = 'AVAILABLE';
  }

  setNotAvailable() {
    this.workStatus = 'NOT_AVAILABLE';
  }

  prepareOrder(orderId) {
    // get order dishes
    // for each dish do a set timeout
  }
}

module.exports = RestaurantChef;
