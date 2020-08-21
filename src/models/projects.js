const PgLib = require("../lib/postgresql");
const { getValue, respond, genId } = require("../lib/utilities");
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
      _class: getValue(this.params, "_class", "ENTERPRICE"),
      _state: "0",
      _id: genId("-1"),
      caption: getValue(this.params, "caption", ""),
      description: "",
      cellphone: getValue(this.params, "cellphone", ""),
      phone: getValue(this.params, "phone", ""),
      city_id: getValue(this.params, "city_id", "-1"),
      city: getValue(this.params, "city", ""),
      address: "",
      identification_tp: "",
      identification_type: "",
      identification: "",
      logo: "",
      _data: {},
      modules: [],
      _v: 1,
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
    const query = "SELECT * FROM js_core.GET_PROJECT($1) RESULT";
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
    const caption = getValue(this.params, "caption", "");
    const _class = getValue(this.params, "_class", "ENTERPRICE");
    if (caption === "") {
      return respond(200, {}, 400, "Nombre requerido");
    } else {
      const _id = getValue(this.params, "_id", "-1");
      const description = getValue(this.params, "description", "");
      const cellphone = getValue(this.params, "cellphone", "");
      const phone = getValue(this.params, "phone", "");
      const email = getValue(this.params, "email", "");
      const city_id = getValue(this.params, "city_id", "-1");
      const address = getValue(this.params, "address", "");
      const identification_tp = getValue(this.params, "identification_tp", "");
      const identification = getValue(this.params, "identification", "");
      const data = getValue(this.params, "data", {});
      const user_id = getValue(this.params, "user_id", "-1");
      const query = "SELECT * FROM js_core.SET_PROJECT($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RESULT";
      const params = [
        _class,
        _id,
        caption,
        description,
        cellphone,
        phone,
        email,
        city_id,
        address,
        identification_tp,
        identification,
        data,
        user_id,
      ];
      return await this.db
        .post(query, params)
        .then((result) => {
          const res = result.result;
          this.db.pub("projects", res);
          return respond(200, res);
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
    } else if (state === "") {
      return respond(200, {}, 400, "Estado requerido");
    } else {
      const query = "SELECT * FROM js_core.STATE_PROJECT($1, $2) RESULT";
      const params = [_id, state];
      return await this.db
        .post(query, params)
        .then((result) => {
          const res = result.result;
          this.db.pub("projects", res);
          return respond(200, res);
        })
        .catch((err) => {
          return respond(200, { err }, 400, MSG0004);
        });
    }
  }

  async dpas(_class, mainId, state, search, page, rows) {
    const query = "SELECT * FROM js_core.LIST_DPA($1, $2, $3, $4, $5, $6) RESULT";
    const params = [_class, mainId, state, search, page, rows];
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

  async dpa(id) {
    const query = "SELECT * FROM js_core.GET_DPA($1) RESULT";
    const params = [id];
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

  async setVar(project_id, _var, value) {
    const query = "SELECT * FROM js_core.SET_VAR($1, $2) RESULT";
    const params = [`${project_id}_${_var}`, value];
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

  async getVar(project_id, _var, _default) {
    const query = "SELECT * FROM js_core.GET_VAR($1, $2) RESULT";
    const params = [`${project_id}_${_var}`, _default];
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

  async documents(_id, _class, state, search, page, rows) {
    _id = _id || "-1";
    _class = _class || "";
    state = state || "0";
    search = search || "";
    page = page || 1;
    rows = rows || 30;
    const query = "SELECT * FROM js_core.LIST_PROJECT_DOCUMENTS($1, $2, $3, $4, $5, $6) RESULT";
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

  async document(_class, _id) {
    _class = _class || "";
    _id = _id || "-1";
    const query = "SELECT * FROM js_core.GET_DOCUMENT($1, $2) RESULT";
    const params = [_class, _id];
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

  async modules(project_id) {
    project_id = project_id || "-1";
    const query = "SELECT * FROM js_core.GET_PROJECT_MODULES($1) RESULT";
    const params = [project_id];
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

  async chkModules(project_id, module_id, chk) {
    project_id = project_id || "-1";
    module_id = module_id || "-1";
    chk = chk || false;
    const query = "SELECT * FROM js_core.CHK_PROJECT_MODULE($1, $2, $3) RESULT";
    const params = [project_id, module_id, chk];
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
