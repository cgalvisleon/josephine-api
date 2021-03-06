const PgLib = require("../lib/postgresql");
const { getValue, genId, respond } = require("../lib/utilities");
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
      _class: "CONTACT",
      _state: "0",
      _id: genId("-1"),
      caption: "",
      description: "",
      cellphone: "",
      phone: "",
      email: "",
      country_id: "-1",
      city_id: "-1",
      city: "",
      address: "",
      identification_tp: "-1",
      identification_type: "",
      identification: "",
      project_id: "-1",
      profile_tp: "-1",
      profile: "",
      avatar: "",
      head_foto: "",
      _data: {},
      _v: 1,
      user_id: getValue(this.params, "user_id", "-1"),
    };
  }

  async get(_id, project_id) {
    if (_id === "-1" || _id === "new") {
      return respond(200, this.scheme());
    } else {
      const query = "SELECT * FROM js_core.GET_CONTACT($1, $2) RESULT";
      const params = [_id, project_id];
      return await this.db
        .get(query, params)
        .then((result) => {
          const res = result.result;
          return respond(200, this.scheme(res));
        })
        .catch((err) => {
          return respond(200, { err }, 400, MSG0004);
        });
    }
  }

  async set() {
    const caption = getValue(this.params, "caption", "");
    const project_id = getValue(this.params, "project_id", "-1");
    const profile_tp = getValue(this.params, "profile_tp", "-1");
    if (caption === "") {
      return respond(200, {}, 400, "Nombre requerido");
    } else if (project_id === "-1") {
      return respond(200, {}, 400, "Proyecto requerido");
    } else if (profile_tp === "-1") {
      return respond(200, {}, 400, "Perfil requerido");
    } else {
      const _class = getValue(this.params, "_class", "");
      const _id = getValue(this.params, "_id", "-1");
      const description = getValue(this.params, "description", "");
      const cellphone = getValue(this.params, "cellphone", "");
      const phone = getValue(this.params, "phone", "");
      const email = getValue(this.params, "email", "");
      const country_id = getValue(this.params, "country_id", "-1");
      const city_id = getValue(this.params, "city_id", "-1");
      const address = getValue(this.params, "address", "");
      const identification_tp = getValue(this.params, "identification_tp", "");
      const identification = getValue(this.params, "identification", "");
      const data = getValue(this.params, "data", {});
      const user_id = getValue(this.params, "user_id", "-1");
      const query = "SELECT * FROM js_core.SET_CONTACT($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RESULT";
      const params = [
        _class,
        _id,
        caption,
        description,
        cellphone,
        phone,
        email,
        country_id,
        city_id,
        address,
        identification_tp,
        identification,
        project_id,
        profile_tp,
        data,
        user_id,
      ];
      return await this.db
        .post(query, params)
        .then((result) => {
          const res = result.result;
          this.db.pub(`contacts/${project_id}`, res);
          return respond(200, this.scheme(res));
        })
        .catch((err) => {
          return respond(200, { err }, 400, MSG0004);
        });
    }
  }

  async state(_id, project_id, _state) {
    _id = _id || "-1";
    _state = _state || "0";
    const query = "SELECT * FROM js_core.STATE_CONTACT($1, $2, $3) RESULT";
    const params = [_id, project_id, _state];
    return await this.db
      .post(query, params)
      .then((result) => {
        const res = result.result;
        this.db.pub(`contacts/${project_id}`, { _id, _state });
        return respond(200, res);
      })
      .catch((err) => {
        return respond(200, { err }, 400, MSG0004);
      });
  }

  async list(_id, state, search, page, rows) {
    _id = _id || "-1";
    state = state || "";
    search = search || "";
    page = page || 1;
    rows = rows || 30;
    const query = "SELECT * FROM js_core.LIST_CONTACTS($1, $2, $3, $4, $5) RESULT";
    const params = [_id, state, search, page, rows];
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
