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

  async dpas({ id, _class, state, search, page, rows }) {
    const model = new Model({});
    return await model.dpas(_class, id, state, search, page, rows);
  }

  async dpa({ id }) {
    const model = new Model({});
    return await model.dpa(id);
  }

  async warehouse({ id }) {
    const model = new Model({});
    return await model.warehouse(id);
  }

  async cellars({ id, state, search, page, rows }) {
    const model = new Model({});
    return await model.cellars(id, state, search, page, rows);
  }

  async references({ id, state, search, page, rows }) {
    const model = new Model({});
    return await model.references(id, state, search, page, rows);
  }

  async typeReferences({ id, _class, state, search, page, rows }) {
    const model = new Model({});
    return await model.typeReferences(id, _class, state, search, page, rows);
  }

  async documents({ id, _class, state, search, page, rows }) {
    const model = new Model({});
    return await model.documents(id, _class, state, search, page, rows);
  }

  async document({ _class, id }) {
    const model = new Model({});
    return await model.document(_class, id);
  }

  async kardex({ cellar_id, search, page, rows }) {
    const model = new Model({});
    return await model.kardex(cellar_id, search, page, rows);
  }

  async stocks({ cellar_id, search, page, rows }) {
    const model = new Model({});
    return await model.stocks(cellar_id, search, page, rows);
  }

  xlsCellars({ id, state, search, page, rows, to, username }) {
    const model = new Model({});
    return model.xlsCellars(id, state, search, page, rows, to, username);
  }
}

module.exports = Service;
