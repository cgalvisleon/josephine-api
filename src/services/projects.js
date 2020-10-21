const Model = require("../models/projects");

class Service {
  constructor() {}

  async get({ id }) {
    const model = new Model({ _id: id });
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

  async init() {
    const model = new Model({});
    return await model.init();
  }

  async dpas({ id, _class, state, search, page, rows }) {
    const model = new Model({});
    return await model.dpas(_class, id, state, search, page, rows);
  }

  async dpa({ id }) {
    const model = new Model({});
    return await model.dpa(id);
  }

  async setVar({ project_id, _var, value }) {
    const model = new Model({});
    return await model.setVar(project_id, _var, value);
  }

  async getVar({ project_id, _var, _default }) {
    const model = new Model({});
    return await model.getVar(project_id, _var, _default);
  }

  async documents({ project_id, _class, state, search, page, rows }) {
    const model = new Model({});
    return await model.documents(project_id, _class, state, search, page, rows);
  }

  async document({ _class, id }) {
    const model = new Model({});
    return await model.document(_class, id);
  }

  async modules({ project_id }) {
    const model = new Model({});
    return await model.modules(project_id);
  }

  async chkModules({ project_id, module_id, chk }) {
    const model = new Model({});
    return await model.chkModules(project_id, module_id, chk);
  }
}

module.exports = Service;
