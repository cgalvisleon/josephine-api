const PgLib = require("../lib/postgresql");
const PdfMake = require("../lib/pdfmake");
const { getValue, validEmail, validCellPhone, respond } = require("../lib/utilities");
const {
  MSG0001,
  MSG0002,
  MSG0003,
  MSG0004,
  MSG0005,
  MSG0006,
  MSG0008,
  MSG0009,
  MSG0010,
  MSG0011,
  MSG0012,
  MSG0013,
  MSG0014,
  MSG0015,
  MSG0016,
  MSG0017,
  MSG0018,
} = require("../lib/msg");
const { getSession, getSecret, secret, cleanSecret, userId } = require("./auth");
const Mailer = require("./mailer");
const AWS = require("./aws");
const { config } = require("../config/index");
const pdfUsers = require("../exports/pdf/pdfUsers");
const Project = require("./projects");
const urlIssues = config.urlIssues;
const url = config.url;
const project = config.project;
const serviceEmail = config.serviceEmail;

class Model {
  constructor(params) {
    this.db = new PgLib();
    this.pdfmake = new PdfMake({});
    this.mailer = new Mailer({});
    this.aws = new AWS({});
    this.params = params;
    this.project = new Project();
  }

  scheme(data) {
    return {
      _id: getValue(data, "_id", "-1"),
      _state: getValue(data, "_state", "0"),
      username: getValue(data, "username", ""),
      caption: getValue(data, "caption", ""),
      description: getValue(data, "description", ""),
      email: getValue(data, "email", ""),
      phone: getValue(data, "phone", ""),
      cellphone: getValue(data, "cellphone", ""),
      address: getValue(data, "address", ""),
      city_id: getValue(data, "city_id", ""),
      city: getValue(data, "city", ""),
      identification: getValue(data, "identification", ""),
      identification_tp: getValue(data, "identification_tp", "-1"),
      identification_type: getValue(data, "identification_type", ""),
      _data: getValue(data, "_data", {}),
      avatar: getValue(data, "avatar", ""),
      header_foto: getValue(data, "header_foto", ""),
      projects: getValue(data, "projects", []),
      _v: getValue(data, "_v", 0),
    };
  }

  async signIn(username, password, app) {
    username = username || "";
    password = password || "";
    app = app || "";
    if (username === "") {
      return respond(200, {}, 206, MSG0001);
    } else if (password === "") {
      return respond(200, {}, 206, MSG0002);
    } else if (app === "") {
      return respond(200, {}, 400, MSG0015);
    } else {
      const query = "SELECT * FROM js_core.SIGNIN($1, $2) RESULT";
      const params = [username, password];
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
            return getSession(userId, app).then((result) => {
              return result;
            });
          }
        })
        .then((result) => {
          if (validEmail(username)) {
            this.mailer.sendAlertMail(
              username,
              "Alerta de seguridad, inicio de sesión",
              "Inicio de sesión",
              "Te damos nuevamente la bienvenida a tu cuenta",
              `Acabas de iniciar sesión con tu cuenta <strong>${username}</strong>. Si crees que otra persona accedio sin permiso, reportanos la inconcistencia.`,
              "Reportar",
              `${urlIssues}`,
              "Gracias por trabajar con nosotros"
            );
          } else if (validCellPhone(username)) {
            this.aws.sendSMS(username, "Inicio de sesión", `${project}; Acabas de iniciar sesión`);
          }
          return respond(200, result);
        })
        .catch((err) => {
          return respond(200, { err }, 400, MSG0003);
        });
    }
  }

  async profile(_id) {
    _id = _id || "-1";
    const query = "SELECT * FROM js_core.GET_USER($1) RESULT";
    const params = [_id];
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

  async user(_id, project_id) {
    _id = _id || "-1";
    project_id = project_id || "-1";
    if (_id === "-1") {
      return respond(200, {}, 400, "Usuario requerido");
    } else if (project_id === "-1") {
      return respond(200, {}, 400, "Projecto requerido");
    } else {
      const query = "SELECT * FROM js_core.GET_USER($1, $2) RESULT";
      const params = [_id, project_id];
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

  async setProfile(
    id,
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
    _data
  ) {
    caption = caption || "";
    description = description || "";
    cellphone = cellphone || "";
    phone = phone || "";
    email = email || "";
    country_id = country_id || "-1";
    city_id = city_id || "-1";
    address = address || "";
    identification_tp = identification_tp || "-1";
    identification = identification || "";
    _data = _data || {};
    if (!caption || caption === "") {
      return respond(200, {}, 206, MSG0010);
    } else {
      const query = "SELECT * FROM js_core.SET_USER($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RESULT";
      const params = [
        id,
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
        _data,
      ];
      return await this.db
        .post(query, params)
        .then((result) => {
          const res = result.result;
          const msg = getValue(res, "msg", "");
          if (msg !== "") {
            throw msg;
          } else {
            this.db.pub(`users/${id}`, res);
            this.db.pub(`profile/${id}`, res);
            return respond(200, res);
          }
        })
        .catch((err) => {
          return respond(200, { err }, 400, MSG0003);
        });
    }
  }

  async setPassword(id, password, confirmation) {
    id = id || "-1";
    password = password || "";
    confirmation = confirmation || "";
    if (password === "") {
      return respond(200, {}, 206, MSG0002);
    } else if (password.length < 8) {
      return respond(200, {}, 206, MSG0006);
    } else if (password !== confirmation) {
      return respond(200, {}, 206, MSG0009);
    } else {
      const query = "SELECT * FROM js_core.SET_PASSWORD($1, $2, $3) RESULT";
      const params = [id, password, confirmation];
      return await this.db
        .post(query, params)
        .then((result) => {
          const res = result.result;
          const msg = getValue(res, "msg", "");
          if (msg !== "") {
            throw msg;
          } else {
            return respond(200, res);
          }
        })
        .catch((err) => {
          return respond(200, { err }, 400, MSG0003);
        });
    }
  }

  async folders(user_id, id) {
    user_id = user_id || "-1";
    id = id || "-1";
    if (user_id === "-1") {
      return respond(200, {}, 400, "Usuario requerido");
    } else if (id === "-1") {
      return respond(200, {}, 400, "Projecto requerido");
    } else {
      const query = "SELECT * FROM js_core.GET_USER_FOLDER($1, $2) RESULT";
      const params = [user_id, id];
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

  async valid(username) {
    username = username || "";
    if (username === "") {
      return respond(200, {}, 206, MSG0001);
    } else {
      const query = "SELECT * FROM js_core.USER_VALID($1) RESULT";
      const params = [username];
      return await this.db
        .post(query, params)
        .then((result) => {
          let code = result.result;
          if (validEmail(username)) {
            this.mailer.sendAlertMail(
              username,
              "Verifica tu dirección de correo electrónico",
              "Código de validación",
              "Verificación de dirección de correo electrónico",
              `Usa el siguiente código para verificar que la dirección de correo electrónico <strong>${username}</strong> te pertenece.<h2>Código de validación ${code}</h2><p></p><p>Si crees que otra persona accedio sin permiso, reportanos la inconcistencia.</p>`,
              "Reportar",
              `${urlIssues}`,
              "Gracias por trabajar con nosotros"
            );
            const msg = "Código enviado";
            return respond(200, { msg });
          } else if (validCellPhone(username)) {
            this.aws.sendSMS(username, "Código de validación", `${project}; Código de validación ${code}`);
            const msg = "Código enviado";
            return respond(200, { msg });
          } else {
            throw MSG0005;
          }
        })
        .catch((err) => {
          return respond(200, { err }, 400, MSG0004);
        });
    }
  }

  async signup(username, password, confirmation, caption, project, module_id, city_id, code, app) {
    username = username || "";
    password = password || "";
    confirmation = confirmation || "";
    caption = caption || "";
    project = project || "";
    module_id = module_id || "-1";
    city_id = city_id || "-1";
    code = code || "";
    app = app || "";
    if (username === "") {
      return respond(200, {}, 206, MSG0001);
    } else if (!validEmail(username) && !validCellPhone(username)) {
      return respond(200, {}, 206, MSG0008);
    } else if (password === "") {
      return respond(200, {}, 206, MSG0002);
    } else if (password.length < 8) {
      return respond(200, {}, 206, MSG0006);
    } else if (password !== confirmation) {
      return respond(200, {}, 206, MSG0009);
    } else if (caption === "") {
      return respond(200, {}, 400, MSG0010);
    } else if (project === "") {
      return respond(200, {}, 400, MSG0011);
    } else if (module_id === "-1") {
      return respond(200, {}, 400, MSG0012);
    } else if (city_id === "-1") {
      return respond(200, {}, 400, MSG0013);
    } else if (code === "") {
      return respond(200, {}, 400, MSG0014);
    } else if (app === "") {
      return respond(200, {}, 400, MSG0015);
    } else {
      const query = "SELECT * FROM js_core.NEW_USER($1, $2, $3, $4, $5, $6, $7, $8) RESULT";
      const params = [username, password, confirmation, caption, project, module_id, city_id, code];
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
            return getSession(userId, app).then((result) => {
              return result;
            });
          }
        })
        .then((result) => {
          if (validCellPhone(username)) {
            this.aws.sendSMS(username, "Inicio de sesión", "${project}; Acabas de iniciar sesión");
          }
          return respond(200, result);
        })
        .catch((err) => {
          if (err === "PASSWORD_NOT_CONFIRM") {
            return respond(200, { err }, 400, MSG0009);
          } else if (err === "USER_DELETED") {
            return respond(200, { err }, 400, MSG0016);
          } else if (err === "USER_EXIST") {
            return respond(200, { err }, 400, MSG0017);
          } else if (err === "CODE_NOT_VALID") {
            return respond(200, { err }, 400, MSG0018);
          } else {
            return respond(200, { err }, 400, MSG0004);
          }
        });
    }
  }

  async forgot(username, password, confirmation, code, app) {
    username = username || "";
    password = password || "";
    confirmation = confirmation || "";
    code = code || "";
    app = app || "";
    if (username === "") {
      return respond(200, {}, 206, MSG0001);
    } else if (password === "") {
      return respond(200, {}, 206, MSG0002);
    } else if (password.length < 8) {
      return respond(200, {}, 206, MSG0006);
    } else if (password !== confirmation) {
      return respond(200, {}, 206, MSG0009);
    } else if (code === "") {
      return respond(200, {}, 400, MSG0014);
    } else if (app === "") {
      return respond(200, {}, 400, MSG0015);
    } else {
      const query = "SELECT * FROM js_core.FORGOT_PASSWORD($1, $2, $3, $4) RESULT";
      const params = [username, password, confirmation, code];
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
            return getSession(userId, app).then((result) => {
              return result;
            });
          }
        })
        .then((result) => {
          if (validEmail(username)) {
            this.mailer.sendAlertMail(
              username,
              "Alerta de seguridad, recuperación de contraseña",
              "Recuperación de contraseña",
              "Te damos nuevamente la bienvenida a tu cuenta",
              `Acabas de recuperar la contraseña de tu cuenta <strong>${username}</strong>. Si crees que otra persona accedio sin permiso, reportanos la inconcistencia.`,
              "Reportar",
              `${urlIssues}`,
              "Gracias por trabajar con nosotros"
            );
          } else if (validCellPhone(username)) {
            this.aws.sendSMS(username, "Recuperación de contraseña", "${project}; Acabas de recuperar tu contraseña");
          }
          return respond(200, result);
        })
        .catch((err) => {
          return respond(200, { err }, 400, MSG0003);
        });
    }
  }

  async set(username, caption, project_id, profile_tp, user_id) {
    username = username || "";
    caption = caption || "";
    project_id = project_id || "-1";
    profile_tp = profile_tp || "-1";
    user_id = user_id || "-1";
    if (username === "") {
      return respond(200, {}, 206, MSG0001);
    } else if (caption === "") {
      return respond(200, {}, 206, MSG0010);
    } else {
      const query = "SELECT * FROM js_core.SET_USER($1, $2, $3, $4, $5) RESULT";
      const params = [username, caption, project_id, profile_tp, user_id];
      return await this.db
        .post(query, params)
        .then((result) => {
          const res = result.result;
          const msg = getValue(res, "msg", "");
          if (msg !== "") {
            throw msg;
          } else {
            const isNew = getValue(res, "isNew", false);
            if (validEmail(username)) {
              const profile = getValue(res, "profile", "");
              const project = getValue(res, "project", "");
              if (isNew) {
                this.mailer.sendAlertMail(
                  username,
                  "Bienvenido, asignación de perfil",
                  "Asignación de perfil",
                  "Te damos la bienvenida",
                  `Acabas de ser asignado como <strong>${profile}</strong> para el proyecto <strong>${project}</strong>, con el usuario <strong>${username}</strong>. Si crees que otra persona accedio sin permiso, <a href=${urlIssues}>reportanos</a> la inconcistencia.`,
                  "Iniciar sesión",
                  `${url}/seek`,
                  "Gracias por trabajar con nosotros"
                );
              } else {
                this.mailer.sendAlertMail(
                  username,
                  "Bienvenido, asignación de perfil",
                  "Asignación de perfil",
                  "Te damos la bienvenida",
                  `Acabas de ser asignado como <strong>${profile}</strong> para el proyecto <strong>${project}</strong>, con el usuario <strong>${username}</strong>. Si crees que otra persona accedio sin permiso, <a href=${urlIssues}>reportanos</a> la inconcistencia.`,
                  "Iniciar sesión",
                  `${url}/signin`,
                  "Gracias por trabajar con nosotros"
                );
              }
            } else if (validCellPhone(username)) {
              if (isNew) {
                this.aws.sendSMS(
                  username,
                  `Asignación de perfil`,
                  `${project}; Bienvenido, acabas de ser asignado como ${profile} al proyecto ${project}. ${url}/seek`
                );
              } else {
                this.aws.sendSMS(
                  username,
                  `Asignación de perfil`,
                  `${project}; Bienvenido, acabas de ser asignado como ${profile} al proyecto ${project}. ${url}/signin`
                );
              }
            }
            this.db.pub(`users/${project_id}`, res);
            return respond(200, res);
          }
        })
        .catch((err) => {
          return respond(200, { err }, 400, MSG0003);
        });
    }
  }

  async finish(user_id, project_id) {
    user_id = user_id || "-1";
    project_id = project_id || "-1";
    if (user_id === "-1") {
      return respond(200, {}, 400, "Usuario requerido");
    } else if (project_id === "-1") {
      return respond(200, {}, 400, "Proyecto requerido");
    } else {
      const query = "SELECT * FROM js_core.CHK_PROJECT_USER($1, $2, $3, $4) RESULT";
      const params = [project_id, user_id, "ALL", false];
      return await this.db
        .post(query, params)
        .then((result) => {
          const res = result.result;
          this.db.pub(`users/${project_id}`, { _id: user_id, _state: "2" });
          return respond(200, { res });
        })
        .catch((err) => {
          return respond(200, { err }, 400, MSG0003);
        });
    }
  }

  async getSecret(id, group) {
    id = id || "-1";
    if (id === "-1") {
      return respond(200, {}, 400, "Id requerido");
    } else {
      return await getSecret(id, group)
        .then((result) => {
          const res = result.token;
          return respond(200, { token: res });
        })
        .catch((err) => {
          return respond(200, { err }, 400, MSG0004);
        });
    }
  }

  async auto(search) {
    search = search || "";
    if (search.length < 2) {
      return respond(200, {});
    } else {
      const query = "SELECT * FROM js_core.AUTO_USERS($1, $2) RESULT";
      const params = [search, 15];
      return await this.db
        .post(query, params)
        .then((result) => {
          const res = result.result;
          return respond(200, res);
        })
        .catch((err) => {
          return respond(200, { err }, 400, MSG0003);
        });
    }
  }

  async issues(username, access, use) {
    username = username || "";
    access = access || false;
    use = use || false;
    this.mailer.sendAlertMail(
      serviceEmail,
      "Reporte de acceso indebido",
      "Solicitud de revisión",
      `El usuario ${username}`,
      `Acabas de reportar una solicitud de revisión de uso indebido: <p>${
        Boolean(access) ? "<strong>Reporta acceso indebido</strong>" : ""
      }</p><p>${Boolean(use) ? "<strong>Reporta uso indebido de tus datos</strong>" : ""}</p>`,
      `Iniciar sesión`,
      `${url}/signin`,
      "<strong>Atención prioritaria</strong>"
    );
    return respond(200, {});
  }

  async delete(session) {
    session = session || {};
    const _id = userId(session);
    if (_id === "") {
      return respond(400, {}, 400, "Usuario invalido");
    } else {
      const query = "SELECT * FROM js_core.TRASH_USERS($1) RESULT";
      const params = [_id];
      return await this.db
        .post(query, params)
        .then((result) => {
          const res = result.result;
          const msg = getValue(res, "msg", "-1");
          if (msg === "-2") {
            this.db.pub(`tokens/${session}`, {});
            return respond(200, { _id, _state: msg });
          } else {
            return respond(400, {}, 400, msg);
          }
        })
        .catch((err) => {
          return respond(200, { err }, 400, MSG0004);
        });
    }
  }

  async list(_id, state, search, page, rows) {
    _id = _id || "-1";
    state = state || "";
    search = search || "";
    page = page || 1;
    rows = rows || 30;
    const query = "SELECT * FROM js_core.LIST_USERS($1, $2, $3, $4, $5) RESULT";
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

  async pdfUsers({ state, token }, callback) {
    state = state || "0";
    try {
      const project_id = await secret(token).then();
      cleanSecret(project_id);
      const project = await this.project.getData(project_id).then();
      const query = "SELECT * FROM js_core.LIST_USERS($1, $2, $3, $4, $5) RESULT";
      const params = [project_id, state, "", 1, 1000];
      const details = await this.db.get(query, params).then((result) => {
        return result.result;
      });
      const data = { project_id, project, details };
      const definition = await pdfUsers(data);
      const options = {};
      return await this.pdfmake.toStream(definition, options, callback);
    } catch (err) {
      return respond(200, { err }, 400, MSG0004);
    }
  }
}

module.exports = Model;
