const Model = require('../models/logs');

class Service {
  constructor() {}

  async get({ id }) {
    const model = new Model({});
    return await model.get(id);
  }

  async delete({ id }) {
    const model = new Model({});
    return await model.delete(id);
  }

  async logs({ search, rows, page } = {}) {
    const model = new Model({});
    return await model.logs(search, rows, page, { date: -1 });
  }
}

module.exports = Service;
