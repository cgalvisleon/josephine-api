const PgLib = require("../lib/postgresql");
const { socket } = require("../lib/socket");
const { respond, validEmail, validCellPhone, getValue } = require("../lib/utilities");
const { getToken } = require("./auth");
const { MSG0004, MSG0021, MSG0001, MSG0008, MSG0010, MSG0011, MSG0014, MSG0015, MSG0018 } = require("../lib/msg");

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

  async signup(username, caption, code, app) {
    username = username || "";
    caption = caption || "";
    code = code || "";
    app = app || "";
    if (username === "") {
      return respond(200, {}, 206, MSG0001);
    } else if (!validEmail(username) && !validCellPhone(username)) {
      return respond(200, {}, 206, MSG0008);
    } else if (caption === "") {
      return respond(200, {}, 400, MSG0010);
    } else if (code === "") {
      return respond(200, {}, 400, MSG0014);
    } else if (app === "") {
      return respond(200, {}, 400, MSG0015);
    } else {
      const query = "SELECT * FROM js_core.NEW_USER($1, $2, $3) RESULT";
      const params = [username, caption, code];
      return await this.db
        .post(query, params)
        .then((result) => {
          return result.result;
        })
        .then((result) => {
          const msg = getValue(result, "msg", "");
          if (msg !== "") {
            throw msg;
          } else {
            const userId = getValue(result, "_id", "");
            return getToken(userId, app).then((result) => {
              return result;
            });
          }
        })
        .then((result) => {
          return respond(200, result);
        })
        .catch((err) => {
          if (err === "CODE_NOT_VALID") {
            return respond(200, { err }, 400, MSG0018);
          } else {
            return respond(200, { err }, 400, MSG0004);
          }
        });
    }
  }

  async newUser(username, caption, project_id, profile_id, app) {
    username = username || "";
    caption = caption || "";
    project_id = project_id || "-1";
    profile_id = profile_id || "-1";
    app = app || "";
    if (username === "") {
      return respond(200, {}, 206, MSG0001);
    } else if (!validEmail(username) && !validCellPhone(username)) {
      return respond(200, {}, 206, MSG0008);
    } else if (caption === "") {
      return respond(200, {}, 400, MSG0010);
    } else if (project_id === "-1") {
      return respond(200, {}, 400, MSG0011);
    } else if (profile_id === "-1") {
      return respond(200, {}, 400, MSG0021);
    } else if (app === "") {
      return respond(200, {}, 400, MSG0015);
    } else {
      const query = "SELECT * FROM js_core.NEW_USER($1, $2, $3, $4) RESULT";
      const params = [username, caption, project_id, profile_id];
      return await this.db
        .post(query, params)
        .then((result) => {
          return result.result;
        })
        .then((result) => {
          const msg = getValue(result, "msg", "");
          if (msg !== "") {
            throw msg;
          } else {
            const userId = getValue(result, "_id", "");
            return getToken(userId, app).then((result) => {
              return result;
            });
          }
        })
        .then((result) => {
          return respond(200, result);
        })
        .catch((err) => {
          return respond(200, { err }, 400, MSG0004);
        });
    }
  }

  async list(user_id, search, page, rows) {
    user_id = user_id || "-1";
    search = search || "";
    page = page || 1;
    rows = rows || 30;
    const query = "SELECT * FROM js_core.LIST_TOKENS($1, $2, $3, $4) RESULT";
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
