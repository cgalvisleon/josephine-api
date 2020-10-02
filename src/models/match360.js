const { socket } = require("../lib/socket");
const { respond } = require("../lib/utilities");
const { getToken } = require("./auth");

class Model {
  constructor() {}

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
}

module.exports = Model;
