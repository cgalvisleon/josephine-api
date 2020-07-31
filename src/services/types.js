const Model = require("../models/types");

class Service {
  constructor() {}

  async get({ id }) {
    const model = new Model({});
    return await model.get(id);
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

  async list({ id, _class, state, search, page, rows }) {
    const model = new Model({});
    return await model.list(id, _class, state, search, page, rows);
  }
}

module.exports = Service;
