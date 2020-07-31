const PgLib = require("../lib/postgresql");
const { getValue, getDateTime, validStr, respond, genId } = require("../lib/utilities");
const { MSG0004 } = require("../lib/msg");

class Model {
  constructor(params) {
    this.db = new PgLib();
    this.params = params;
  }

  scheme() {
    const now = new Date();
    return {
      date_make: now,
      date_update: now,
      project_id: getValue(this.params, "project_id", "-1"),
      _class: getValue(this.params, "_class", "-1"),
      _state: "0",
      _id: genId("-1"),
      caption: "",
      description: "",
      className: getValue(this.params, "classname", ""),
      user_id: getValue(this.params, "user_id", "-1"),
    };
  }

  async get(_id) {
    if (_id === "-1" || _id === "new") {
      return respond(200, this.scheme());
    } else {
      return await this.getData(_id).then((res) => {
        return respond(200, res);
      });
    }
  }

  async getData(_id) {
    const query = "SELECT * FROM js_core.GET_TYPE($1) RESULT";
    const params = [_id];
    return await this.db
      .get(query, params)
      .then((result) => {
        const res = result.result;
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  async set() {
    const project_id = getValue(this.params, "project_id", "-1");
    const _class = getValue(this.params, "_class", "");
    const caption = getValue(this.params, "caption", "");
    if (project_id === "-1") {
      return respond(200, {}, 400, "Proyecto requerido");
    } else if (_class === "") {
      return respond(200, {}, 400, "Clase requerida");
    } else if (!validStr(caption)) {
      return respond(200, {}, 400, "Nombre requerido");
    } else {
      const _id = getValue(this.params, "_id", "-1");
      const description = getValue(this.params, "description", "");
      const user_id = getValue(this.params, "user_id", "-1");
      const query = "SELECT * FROM js_core.SET_TYPE($1, $2, $3, $4, $5, $6) RESULT";
      const params = [project_id, _class, _id, caption, description, user_id];
      return await this.db
        .post(query, params)
        .then((result) => {
          const res = result.result;
          this.db.pub(`types/${_class}/${project_id}`, res);
          return respond(200, this.scheme(res));
        })
        .catch((err) => {
          return respond(200, { err }, 400, MSG0004);
        });
    }
  }

  async state(_id, state) {
    _id = _id || "-1";
    state = state || "";
    if (_id === "-1") {
      return respond(200, {}, 400, "Projecto requerido");
    } else if (state) {
      return respond(200, {}, 400, "Estado requerido");
    } else {
      const query = "SELECT * FROM js_core.STATE_TYPE($1, $2) RESULT";
      const params = [_id, state];
      return await this.db
        .post(query, params)
        .then((result) => {
          const res = result.result;
          const project_id = getValue(res, "project_id", "");
          const _class = getValue(res, "_class", "");
          this.db.pub(`types/${_class}/${project_id}`, res);
          return respond(200, res);
        })
        .catch((err) => {
          return respond(200, { err }, 400, MSG0004);
        });
    }
  }

  async list(_id, _class, state, search, page, rows) {
    _id = _id || "-1";
    _class = _class || "-1";
    state = state || "";
    search = search || "";
    page = page || 1;
    rows = rows || 30;
    const query = "SELECT * FROM js_core.LIST_TYPES($1, $2, $3, $4, $5, $6) RESULT";
    const params = [_id, _class, state, search, page, rows];
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
