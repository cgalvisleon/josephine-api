const Model = require('../models/contacts');

class Service {
  constructor() {}

  async get({ id, project_id }) {
    const params = { _id: id };
    const model = new Model(params);
    return await model.get(project_id);
  }

  async set({ id, params } = {}) {
    params._id = id;
    const model = new Model(params);
    return await model.set();
  }

  async state({ id, project_id, _state }) {
    const model = new Model({ _id: id });
    return await model.state(project_id, _state);
  }
}

module.exports = Service;
