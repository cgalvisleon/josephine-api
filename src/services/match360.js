const Model = require("../models/match360");

class Service {
  constructor() {}

  async signIn({ token, user_id, app }) {
    const model = new Model({});
    return await model.signIn(token, user_id, app);
  }

  async list({ user_id, search, page, rows }) {
    const model = new Model({});
    return await model.list(user_id, search, page, rows);
  }
}

module.exports = Service;
