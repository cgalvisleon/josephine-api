const PgLib = require("../lib/postgresql");
const { getValue, getDateTime, validStr, respond, genId } = require("../lib/utilities");
const { MSG0004 } = require("../lib/msg");

class Model {
  constructor(params) {
    this.db = new PgLib();
    this.params = params;
    this._id = getValue(this.params, "_id", "-1");
    this._class = getValue(this.params, "_class", "");
  }

  scheme(data) {
    const now = new Date();
    return {
      date_make: getDateTime(data, "date_make", now),
      date_update: getDateTime(data, "date_update", now),
      project_id: getValue(data, "project_id", "-1"),
      _class: getValue(data, "_class", ""),
      _state: getValue(data, "_state", "0"),
      _id: getValue(data, "_id", "-1"),
      caption: getValue(data, "caption", ""),
      description: getValue(data, "description", ""),
      className: getValue(data, "classname", ""),
      user_id: getValue(data, "user_id", "")
    };
  }

  async get() {
    if (this._id === "-1" || this._id === "new") {
      this.params["_id"] = genId(this._id);
      this.params["_class"] = this._class;
      return respond(200, this.scheme(this.params));
    } else {
      const query = "SELECT * FROM js_core.GET_TYPE($1) RESULT";
      const params = [this._id];
      return await this.db
        .get(query, params)
        .then(result => {
          const res = result.result;
          return respond(200, this.scheme(res));
        })
        .catch(err => {
          return respond(200, { err }, 400, MSG0004);
        });
    }
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
      const description = getValue(this.params, "description", "");
      const user_id = getValue(this.params, "user_id", "-1");
      const query = "SELECT * FROM js_core.SET_TYPE($1, $2, $3, $4, $5, $6) RESULT";
      const params = [project_id, _class, this._id, caption, description, user_id];
      return await this.db
        .post(query, params)
        .then(result => {
          const res = result.result;
          this.db.pub(`types/${_class}/${project_id}`, res);
          return respond(200, this.scheme(res));
        })
        .catch(err => {
          return respond(200, { err }, 400, MSG0004);
        });
    }
  }

  async state(state) {
    state = state || "0";
    const _id = this._id;
    const query = "SELECT * FROM js_core.STATE_TYPE($1, $2) RESULT";
    const params = [_id, state];
    return await this.db
      .post(query, params)
      .then(result => {
        const res = result.result;
        const project_id = getValue(res, "project_id", "");
        const _class = getValue(res, "_class", "");
        this.db.pub(`types/${_class}/${project_id}`, res);
        return respond(200, res);
      })
      .catch(err => {
        return respond(200, { err }, 400, MSG0004);
      });
  }
}

module.exports = Model;
