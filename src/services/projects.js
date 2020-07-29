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
    const params = { _id: id };
    const model = new Model(params);
    return await model.state(state);
  }

  async types({ id, _class, state, search, page, rows }) {
    const params = { _id: id };
    const model = new Model(params);
    return await model.types(_class, state, search, page, rows);
  }

  async dpas({ id, _class, state, search, page, rows }) {
    const params = { _id: id };
    const model = new Model(params);
    return await model.dpas(_class, id, state, search, page, rows);
  }

  async dpa({ id }) {
    const params = {};
    const model = new Model(params);
    return await model.dpa(id);
  }

  async users({ id, state, search, page, rows }) {
    const params = { _id: id };
    const model = new Model(params);
    return await model.users(state, search, page, rows);
  }

  async contacts({ id, state, search, page, rows }) {
    const params = { _id: id };
    const model = new Model(params);
    return await model.contacts(state, search, page, rows);
  }

  async warehouse({ id }) {
    const params = { _id: id };
    const model = new Model(params);
    return await model.warehouse();
  }

  async cellars({ id, state, search, page, rows }) {
    const params = { _id: id };
    const model = new Model(params);
    return await model.cellars(state, search, page, rows);
  }

  async references({ id, state, search, page, rows }) {
    const params = { _id: id };
    const model = new Model(params);
    return await model.references(state, search, page, rows);
  }

  async typeReferences({ id, _class, state, search, page, rows }) {
    const params = { _id: id };
    const model = new Model(params);
    return await model.typeReferences(_class, state, search, page, rows);
  }

  async documents({ id, _class, state, search, page, rows }) {
    const params = { _id: id };
    const model = new Model(params);
    return await model.documents(_class, state, search, page, rows);
  }

  async document({ _class, id }) {
    const params = { _id: id };
    const model = new Model(params);
    return await model.document(_class);
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
    const params = { _id: id, username: username };
    const model = new Model(params);
    return model.xlsCellars(state, search, page, rows, to);
  }

  async pdfUsers({ id, state, search, page, rows }, callback) {
    const model = new Model({});
    return await model.pdfUsers({ id, state, search, page, rows }, callback);
  }
}

module.exports = Service;
