const LogLib = require("../lib/logs");
const { respond } = require("../lib/utilities");
const { MSG0004 } = require("../lib/msg");

class Model {
  constructor() {
    this.log = new LogLib("dploy", "postgresql");
  }

  async get(id) {
    return await this.log
      .get(id)
      .then(result => {
        const res = result;
        return respond(200, res);
      })
      .catch(err => {
        return respond(200, { err }, 400, MSG0004);
      });
  }

  async delete(id) {
    return await this.log
      .delete(id)
      .then(result => {
        const res = result;
        return respond(200, res);
      })
      .catch(err => {
        return respond(200, { err }, 400, MSG0004);
      });
  }

  async logs(search, rows, page, sort) {
    return await this.log
      .logs(search, rows, page, sort)
      .then(result => {
        const res = {
          int: result.length === 0 ? 0 : 1,
          end: result.length,
          list: result,
          page: page,
          rows: rows,
          count: result.length,
          all: result.length,
          search: ""
        };
        return respond(200, res);
      })
      .catch(err => {
        return respond(200, { err }, 400, MSG0004);
      });
  }
}

module.exports = Model;
