const PgLib = require("../lib/postgresql");
const { respond } = require("../lib/utilities");
const { MSG0004 } = require("../lib/msg");

class Model {
  constructor(params) {
    this.params = params;
    this.db = new PgLib();
  }

  async list(project_id, _class, single) {
    project_id = project_id || "";
    _class = _class || "-1";
    single = single || false;
    if (project_id === "") {
      return respond(200, {}, 400, "Projecto requerido - /prints/<project_id>");
    } else if (_class === "-1") {
      return respond(200, {}, 400, "Clase requerida - /prints/<project_id>?_class=<_clase>&single=false");
    } else {
      const query = "SELECT * FROM js_core.GET_CLASS_PRINTS($1, $2, $3) RESULT";
      const params = [project_id, _class, single];
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
}

module.exports = Model;
