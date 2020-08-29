const { Client } = require("pg");
const { config } = require("../config/index");
const { socket } = require("./socket");
const debug = require("debug")("app:postgresql");
const LogLib = require("./logs");

const USER = config.pgUser;
const PASSWORD = config.pgPassword;
const DB_NAME = config.pgName;
const DB_HOST = config.pgHost;
const DB_PORT = config.pgPort;

const USER_MASTER = config.pgReadUser;
const PASSWORD_MASTER = config.pgReadPassword;
const DB_MASTER_NAME = config.pgReadName;
const DB_MASTER_HOST = config.pgReadHost;
const DB_MASTER_PORT = config.pgReadPort;

const USER_READ = config.pgReadUser;
const PASSWORD_READ = config.pgReadPassword;
const DB_READ_NAME = config.pgReadName;
const DB_READ_HOST = config.pgReadHost;
const DB_READ_PORT = config.pgReadPort;

class PgLib {
  constructor() {
    this.log = new LogLib("postgresql");
    this.type = "Postgresql";
    this.db = new Client({
      user: USER,
      host: DB_HOST,
      database: DB_NAME,
      password: PASSWORD,
      port: DB_PORT,
    });
    this.dbMaster = new Client({
      user: USER_MASTER,
      host: DB_MASTER_HOST,
      database: DB_MASTER_NAME,
      password: PASSWORD_MASTER,
      port: DB_MASTER_PORT,
    });
    this.dbRead = new Client({
      user: USER_READ,
      host: DB_READ_HOST,
      database: DB_READ_NAME,
      password: PASSWORD_READ,
      port: DB_READ_PORT,
    });
  }

  connect() {
    if (!PgLib.connection) {
      PgLib.connection = new Promise((resolve, reject) => {
        this.db.connect((err) => {
          if (err) {
            this.log.error(err);
            reject(err);
          }
          debug("Connected succesfully to postgresql");
          resolve(this.db);
        });
      });
    }
    return PgLib.connection;
  }

  connectMaster() {
    if (!PgLib.master) {
      PgLib.master = new Promise((resolve, reject) => {
        this.dbMaster.connect((err) => {
          if (err) {
            this.log.error(err);
            reject(err);
          }
          debug("Connected succesfully to master");
          resolve(this.dbMaster);
        });
      });
    }
    return PgLib.master;
  }

  connectRead() {
    if (!PgLib.connectionRead) {
      PgLib.connectionRead = new Promise((resolve, reject) => {
        this.dbRead.connect((err) => {
          if (err) {
            this.log.error(err);
            reject(err);
          }
          debug("Connected succesfully to read");
          this.listen(this.dbRead);
          resolve(this.dbRead);
        });
      });
    }
    return PgLib.connectionRead;
  }

  listen(db) {
    db.query("LISTEN set");
    db.on("notification", (msg) => {
      const res = JSON.parse(msg.payload);
      const project_id = res.project_id || "-1";
      const _class = res._class || "-1";
      const _state = res._state || "0";
      socket.io.emit(`${_class}/${project_id}`, res);
      this.count(project_id, _class, _state);
      if (_state !== "0") {
        this.count(project_id, _class, "0");
      }
    });
  }

  async get(query, params) {
    const db = await this.connectRead();
    return await db
      .query(query, params)
      .then((res) => {
        return res.rows[0];
      })
      .catch((err) => {
        this.log.error(err);
        throw err;
      });
  }

  async post(query, params) {
    const db = await this.connect();
    return await db
      .query(query, params)
      .then((res) => {
        return res.rows[0];
      })
      .catch((err) => {
        this.log.error(err);
        throw err;
      });
  }

  pub(theme, res) {
    socket.io.emit(theme, res);
  }

  count(project_id, _class, _state) {
    const query = "SELECT * FROM js_core.GET_SUMMARY_STATE($1, $2, $3) RESULT";
    const params = [project_id, _class, _state];
    return this.get(query, params)
      .then((result) => {
        const count = result.result;
        this.pub(`counts/${project_id}`, { project_id, _class, _state, count });
        return count;
      })
      .catch((err) => {
        this.log("error", err);
        throw err;
      });
  }
}

module.exports = PgLib;
