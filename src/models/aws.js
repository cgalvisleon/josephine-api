const AwsLib = require("../lib/aws");
const PgLib = require("../lib/postgresql");
const fs = require("fs");
const path = require("path");
const { genId, validStr, respond } = require("josephine/utilities");
const { MSG0004 } = require("../lib/msg");

class Model {
  constructor() {
    this.aws = new AwsLib();
    this.db = new PgLib();
  }

  async uploadFile(project_id, id, object_id, group_tp, _class, main_id, caption, description, user_id, filepath) {
    project_id = project_id || "-1";
    id = id || "-1";
    object_id = object_id || "-1";
    group_tp = group_tp || "FILES_GROUP_OO1";
    _class = _class || "-1";
    main_id = main_id || "-1";
    caption = caption || "";
    description = description || "";
    user_id = user_id || "-1";
    filepath = filepath || "";
    if (object_id === "-1") {
      return respond(200, {}, 400, "Objeto requerida");
    } else if (_class === "-1") {
      return respond(200, {}, 400, "Clase requerida");
    } else if (user_id === "-1") {
      return respond(200, {}, 400, "Usuario requerido");
    } else if (filepath === "") {
      return respond(200, {}, 400, "Archivo requerido");
    } else {
      const ext = path.extname(filepath);
      const sub = ext.replace(".", "");
      const basename = path.basename(filepath);
      const name = path.basename(filepath, ext);
      const size = fs.statSync(filepath).size;
      return await this.aws
        .uploadFile(filepath, `${project_id}/${sub}`, ext, name, size)
        .then((result) => {
          id = genId(id);
          main_id = main_id === "-1" ? id : main_id;
          caption = caption === "" ? basename : caption;
          const location = result.Location;
          const _data = {
            ext: ext,
            name: name,
            size: size,
            key: result.key,
            Bucket: result.Bucket,
          };
          const query = "SELECT * FROM js_core.SET_FILE($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RESULT";
          const params = [project_id, _class, id, main_id, object_id, group_tp, caption, description, location, size, _data, user_id];
          return this.db
            .post(query, params)
            .then((result) => {
              const res = result.result;
              this.db.pub(`files/${project_id}`, res);
              this.db.pub(`files/${object_id}`, res);
              return respond(200, res);
            })
            .catch((err) => {
              return respond(200, { err }, 400, MSG0004);
            });
        })
        .catch((err) => {
          return respond(200, { err }, 400, MSG0004);
        });
    }
  }

  async uploadBase64(project_id, id, object_id, group_tp, _class, main_id, caption, description, name, ext, size, user_id, base64) {
    project_id = project_id || "-1";
    id = id || "-1";
    object_id = object_id || "-1";
    group_tp = group_tp || "FILES_GROUP_OO1";
    _class = _class || "-1";
    main_id = main_id || "-1";
    caption = caption || "";
    description = description || "";
    size = size || 0;
    user_id = user_id || "-1";
    base64 = base64 || "";
    if (object_id === "-1") {
      return respond(200, {}, 400, "Objeto requerida");
    } else if (_class === "-1") {
      return respond(200, {}, 400, "Clase requerida");
    } else if (user_id === "-1") {
      return respond(200, {}, 400, "Usuario requerido");
    } else if (base64 === "") {
      return respond(200, {}, 400, "Archivo base64 requerido");
    } else {
      const sub = ext.replace(".", "");
      return await this.aws
        .uploadBase64(base64, `${project_id}/${sub}`, name, ext)
        .then((result) => {
          id = genId(id);
          main_id = main_id === "-1" ? id : main_id;
          caption = caption === "" ? name : caption;
          const location = result.Location;
          const _data = {
            ext: ext,
            name: name,
            size: size,
            key: result.key,
            Bucket: result.Bucket,
          };
          const query = "SELECT * FROM js_core.SET_FILE($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RESULT";
          const params = [project_id, _class, id, main_id, object_id, group_tp, caption, description, location, size, _data, user_id];
          return this.db
            .post(query, params)
            .then((result) => {
              const res = result.result;
              this.db.pub(`files/${project_id}`, res);
              this.db.pub(`files/${object_id}`, res);
              return respond(200, res);
            })
            .catch((err) => {
              return respond(200, { err }, 400, MSG0004);
            });
        })
        .catch((err) => {
          return respond(200, { err }, 400, MSG0004);
        });
    }
  }

  async deleteFile(object_id, main_id) {
    if (object_id === "-1") {
      return respond(200, {}, 400, "Objeto requerido");
    } else if (main_id === "-1") {
      return respond(200, {}, 400, "Tipo requerido");
    } else {
      const query = "SELECT * FROM js_core.DEL_FILE($1, $2) RESULT";
      const params = [object_id, main_id];
      return await this.db
        .post(query, params)
        .then((result) => {
          const key = result.result.key;
          const filepath = result.result.filepath;
          if (key === "") {
            return respond(200, {}, 400, "Archivo ya fue eliminado");
          } else {
            return this.aws
              .deleteFile(key)
              .then(() => {
                const res = {
                  _state: "-2",
                  object_id: object_id,
                  main_id: main_id,
                  key: key,
                  filepath: filepath,
                };
                return respond(200, res);
              })
              .catch((err) => {
                return respond(200, { err }, 400, MSG0004);
              });
          }
        })
        .catch((err) => {
          return respond(200, { err }, 400, MSG0004);
        });
    }
  }

  async getFiles(id, _class, state, search, page, rows) {
    _class = _class || "DOC";
    state = state || "0";
    search = search || "";
    page = page || 1;
    rows = rows || 30;
    const query = "SELECT * FROM js_core.LIST_FILES($1, $2, $3, $4, $5, $6) RESULT";
    const params = [id, _class, state, search, page, rows];
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

  async sendSMS(cellPhone, subject, message) {
    if (!validStr(cellPhone, 10)) {
      return respond(200, {}, 400, "Numero requerido - cellPhone");
    } else if (!validStr(subject)) {
      return respond(200, {}, 400, "Asunto requerido - subject");
    } else if (!validStr(message)) {
      return respond(200, {}, 400, "Mensaje requerido - message");
    } else {
      return await this.aws.sendSMS(cellPhone, subject, message).then((result) => {
        const message_id = result.MessageId;
        return respond(200, { message_id });
      });
    }
  }
}

module.exports = Model;
