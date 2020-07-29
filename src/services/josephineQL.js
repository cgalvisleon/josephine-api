const Model = require("../models/josephineQL");

class Service {
  constructor() {}

  async get({ collection, _id }) {
    const model = new Model({});
    return await model.get(collection, _id);
  }

  async set({ collection, _id, params } = {}) {
    const model = new Model({});
    return await model.set(collection, _id, params);
  }

  async state({ collection, _id, _state }) {
    const model = new Model({});
    return await model.state(collection, _id, _state);
  }

  async query({ collection, query }) {
    const model = new Model({});
    return await model.query(collection, query);
  }
}

module.exports = Service;
