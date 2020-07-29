const PgLib = require("../lib/postgresql");
const { getValue, getDateTime, respond } = require("../lib/utilities");
const { MSG0004 } = require("../lib/msg");

class Model {
  constructor(params) {
    this.db = new PgLib();
    this.params = params;
    this._id = getValue(this.params, "_id", "-1");
  }

  scheme(data) {
    const now = new Date();
    return {
      date_make: getDateTime(data, "date_make", now),
      date_update: getDateTime(data, "date_update", now),
      _class: getValue(data, "_class", "CONTACT"),
      _state: getValue(data, "_state", "0"),
      _id: getValue(data, "_id", "-1"),
      caption: getValue(data, "caption", ""),
      description: getValue(data, "description", ""),
      cellphone: getValue(data, "cellphone", ""),
      phone: getValue(data, "phone", ""),
      email: getValue(data, "email", ""),
      country_id: getValue(data, "country_id", "-1"),
      city_id: getValue(data, "city_id", "-1"),
      city: getValue(data, "city", ""),
      address: getValue(data, "address", ""),
      identification_tp: getValue(data, "identification_tp", "-1"),
      identification_type: getValue(data, "identification_type", ""),
      identification: getValue(data, "identification", ""),
      project_id: getValue(data, "project_id", "-1"),
      profile_tp: getValue(data, "profile_tp", "-1"),
      profile: getValue(data, "profile", ""),
      avatar: getValue(data, "avatar", ""),
      head_foto: getValue(data, "head_foto", ""),
      _data: getValue(data, "_data", {}),
      _v: getValue(data, "_v", 0),
      user_id: getValue(data, "user_id", "-1"),
      username: getValue(data, "username", "")
    };
  }

  async get(project_id) {
    if (this._id === "-1" || this._id === "new" || this._id === "") {
      this.params["_id"] = "-1";
      return respond(200, this.scheme(this.params));
    } else {
      const query = "SELECT * FROM js_core.GET_CONTACT($1, $2) RESULT";
      const params = [this._id, project_id];
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
        this._id,
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
        user_id
      ];
      return await this.db
        .post(query, params)
        .then(result => {
          const res = result.result;
          this.db.pub(`contacts/${project_id}`, res);
          return respond(200, this.scheme(res));
        })
        .catch(err => {
          return respond(200, { err }, 400, MSG0004);
        });
    }
  }

  async state(project_id, _state) {
    _state = _state || "0";
    const _id = this._id;
    const query = "SELECT * FROM js_core.STATE_CONTACT($1, $2, $3) RESULT";
    const params = [_id, project_id, _state];
    return await this.db
      .post(query, params)
      .then(result => {
        const res = result.result;
        this.db.pub(`contacts/${project_id}`, { _id, _state });
        return respond(200, res);
      })
      .catch(err => {
        return respond(200, { err }, 400, MSG0004);
      });
  }
}

module.exports = Model;
