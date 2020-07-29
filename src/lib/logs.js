const MongoLib = require("./mongo");
const db = new MongoLib();
const { genId } = require("./utilities");

class LogLib {
  constructor(app, context) {
    this.app = app;
    this.context = context;
  }

  log(content) {
    const now = new Date();
    const log = {
      _id: genId("-1"),
      level: "log",
      app: this.app,
      context: this.context,
      date: now,
      content: content
    };
    const _id = db.insert("debug", log);
    db.pub("logs", log);
    return _id;
  }

  error(content) {
    const now = new Date();
    const log = {
      _id: genId("-1"),
      level: "error",
      app: this.app,
      context: this.context,
      date: now,
      content: content
    };
    const _id = db.insert("debug", log);
    db.pub("logs", log);
    return _id;
  }

  async get(id) {
    return await db
      .select("debug", { _id: id })
      .then(result => {
        return result;
      })
      .catch(error => {
        throw error;
      });
  }

  async logs(query, rows, offset, sort) {
    return await db
      .select("debug", query, rows, offset, sort)
      .then(result => {
        return result;
      })
      .catch(error => {
        throw error;
      });
  }

  async delete(id) {
    return await db
      .delete("debug", { _id: id })
      .then(result => {
        db.pub("logs", { _id: id, _state: "-2" });
        return result;
      })
      .catch(error => {
        throw error;
      });
  }
}

module.exports = LogLib;
