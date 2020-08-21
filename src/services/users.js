const Model = require("../models/users");

class Service {
  constructor() {}

  async signIn({ username, password, app } = {}) {
    const model = new Model({});
    return await model.signIn(username, password, app);
  }

  async profile({ id }) {
    const model = new Model({});
    return await model.profile(id);
  }

  async user({ id, project_id }) {
    const model = new Model({});
    return await model.user(id, project_id);
  }

  async setProfile(
    id,
    caption,
    description,
    cellphone,
    phone,
    email,
    country_id,
    city_id,
    address,
    identification_tp,
    identification,
    _data
  ) {
    const model = new Model({});
    return await model.setProfile(
      id,
      caption,
      description,
      cellphone,
      phone,
      email,
      country_id,
      city_id,
      address,
      identification_tp,
      identification,
      _data
    );
  }

  async setPassword(id, password, confirmation) {
    const model = new Model({});
    return await model.setPassword(id, password, confirmation);
  }

  async folders({ user_id, id }) {
    const model = new Model({});
    return await model.folders(user_id, id);
  }

  async valid({ username } = {}) {
    const model = new Model({});
    return await model.valid(username);
  }

  async signup({ username, password, confirmation, caption, project, module_id, city_id, code, app } = {}) {
    const model = new Model({});
    return await model.signup(username, password, confirmation, caption, project, module_id, city_id, code, app);
  }

  async forgot({ username, password, confirmation, code, app } = {}) {
    const model = new Model({});
    return await model.forgot(username, password, confirmation, code, app);
  }

  async set(username, caption, project_id, profile_tp, user_id) {
    const model = new Model({});
    return await model.set(username, caption, project_id, profile_tp, user_id);
  }

  async chkProject({ user_id, project_id, profile_tp, chk }) {
    const model = new Model({});
    return await model.chkProject(user_id, project_id, profile_tp, chk);
  }

  async finish(user_id, project_id) {
    const model = new Model({});
    return await model.finish(user_id, project_id);
  }

  async getSecret(id, group) {
    const model = new Model({});
    return await model.getSecret(id, group);
  }

  async auto(search) {
    const model = new Model({});
    return await model.auto(search);
  }

  async issues({ username, access, use } = {}) {
    const model = new Model({});
    return await model.issues(username, access, use);
  }

  async delete({ session } = {}) {
    const model = new Model({});
    return await model.delete(session);
  }

  async list({ id, state, search, page, rows }) {
    const model = new Model({});
    return await model.list(id, state, search, page, rows);
  }

  async pdfUsers({ state, token }, callback) {
    const model = new Model({});
    return await model.pdfUsers({ state, token }, callback);
  }
}

module.exports = Service;
