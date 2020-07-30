const Model = require("../models/logs");

class Service {
  constructor() {}

  async get({ collection, id }) {
    const model = new Model({});
    return await model.get(collection, id);
  }

  async delete({ collection, id }) {
    const model = new Model({});
    return await model.delete(collection, id);
  }

  async logs({ collection, search, rows, page } = {}) {
    const model = new Model({});
    return await model.logs(collection, search, rows, page, { date: -1 });
  }
}

module.exports = Service;
