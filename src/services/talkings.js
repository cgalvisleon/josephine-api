const Model = require('../models/talkings');

class Service {
  constructor() {}

  async talkings({ id, user_id, search, page, rows }) {
    const params = { _id: id };
    const model = new Model(params);
    return await model.talkings(user_id, search, page, rows);
  }

  async talk(toId, fromId, search, page, rows) {
    const model = new Model({});
    return await model.talk(toId, fromId, search, page, rows);
  }

  async setTalk(toId, fromId, message) {
    const model = new Model({});
    return await model.setTalk(toId, fromId, message);
  }

  async delTalk(id) {
    const model = new Model({});
    return await model.delTalk(id);
  }
}

module.exports = Service;
