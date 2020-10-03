const PgLib = require("../lib/postgresql");
const { socket } = require("../lib/socket");
const { respond } = require("../lib/utilities");
const { getToken } = require("./auth");
const { MSG0004 } = require("../lib/msg");

class Model {
  constructor() {
    this.db = new PgLib();
  }

  async signIn(token, user_id, app) {
    token = token || "";
    user_id = user_id || "";
    app = app || "";
    if (user_id === "") {
      return respond(200, {}, 206, "undefined user");
    } else if (token === "") {
      return respond(200, {}, 206, "undefined site");
    } else if (app === "") {
      return respond(200, {}, 400, "undefined app");
    } else {
      return getToken(user_id, app)
        .then((result) => {
          return result;
        })
        .then((result) => {
          socket.io.emit(`match360/${token}`, result);
          return respond(200, result);
        })
        .catch((err) => {
          return respond(200, { err }, 400, "undefined data");
        });
    }
  }

  async list(user_id, search, page, rows) {
    user_id = user_id || "-1";
    search = search || "";
    page = page || 1;
    rows = rows || 30;
    const query = "SELECT * FROM match360.LIST_TOKENS($1, $2, $3, $4) RESULT";
    const params = [user_id, search, page, rows];
    return await this.db
      .get(query, params)
      .then((result) => {
        const res = result.result;
        return respond(200, res);
      })
      .catch((err) => {
        return respond(200, { err }, 400, MSG0004);
      });
  }
}

module.exports = Model;
