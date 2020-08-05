const Model = require("../models/objects");

class Service {
  constructor() {}

  async get({ id }) {
    const params = { _id: id };
    const model = new Model(params);
    return await model.get();
  }

  async set({ id, params } = {}) {
    params._id = id;
    const model = new Model(params);
    return await model.set();
  }

  async state({ id, state }) {
    const model = new Model({});
    return await model.state(id, state);
  }
}

module.exports = Service;
