const Model = require("../models/match360");

class Service {
  constructor() {}

  async signIn({ token, user_id, app }) {
    const model = new Model({});
    return await model.signIn(token, user_id, app);
  }
}

module.exports = Service;
