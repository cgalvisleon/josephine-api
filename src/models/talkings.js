const PgLib = require("../lib/postgresql");
const { getValue, respond } = require("../lib/utilities");
const { MSG0004 } = require("../lib/msg");

class Model {
  constructor(params) {
    this.db = new PgLib();
    this.params = params;
    this._id = getValue(this.params, "_id", "-1");
  }

  async talkings(user_id, search, page, rows) {
    const query = "SELECT * FROM js_core.LIST_TALKING_USERS($1, $2, $3, $4, $5) RESULT";
    const params = [this._id, user_id, search, page, rows];
    return await this.db
      .get(query, params)
      .then(result => {
        const res = result.result;
        return respond(200, res);
      })
      .catch(err => {
        return respond(200, { err }, 400, MSG0004);
      });
  }

  async talk(toId, fromId, search, page, rows) {
    const query = "SELECT * FROM js_core.GET_TALKIN($1, $2, $3, $4, $5) RESULT";
    const params = [toId, fromId, search, page, rows];
    return await this.db
      .get(query, params)
      .then(result => {
        const res = result.result;
        return respond(200, res);
      })
      .catch(err => {
        return respond(200, { err }, 400, MSG0004);
      });
  }

  async setTalk(toId, fromId, message) {
    const query = "SELECT * FROM js_core.SET_TALKING_MESSAGE($1, $2, $3) RESULT";
    const params = [toId, fromId, message];
    return await this.db
      .post(query, params)
      .then(result => {
        const res = result.result;
        this.db.pub(`message/${toId}`, res);
        return respond(200, res);
      })
      .catch(err => {
        return respond(200, { err }, 400, MSG0004);
      });
  }

  async delTalk(id) {
    const query = "SELECT * FROM js_core.DEL_TALKING_MESSAGE($1) RESULT";
    const params = [id];
    return await this.db
      .post(query, params)
      .then(result => {
        const res = result.result;
        return respond(200, res);
      })
      .catch(err => {
        return respond(200, { err }, 400, MSG0004);
      });
  }
}

module.exports = Model;
