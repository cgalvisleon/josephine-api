const Model = require("../models/prints");

class Service {
  constructor() {}

  async list({ project_id, _class, single }) {
    const model = new Model({});
    return await model.list(project_id, _class, single);
  }
}

module.exports = Service;
