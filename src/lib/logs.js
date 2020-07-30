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
      content: content,
    };
    const _id = db.insert("debug", log);
    db.pub("log", log);
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
      content: content,
    };
    const _id = db.insert("debug", log);
    db.pub("error", log);
    return _id;
  }

  monitor(params) {
    const _id = db.insert("monitor", params);
    db.pub("monitor", params);
    return _id;
  }

  async get(collection, id) {
    return await db
      .select(collection, { _id: id })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  }

  async logs(collection, query, rows, offset, sort) {
    return await db
      .select(collection, query, rows, offset, sort)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  }

  async delete(collection, id) {
    return await db
      .delete(collection, { _id: id })
      .then((result) => {
        const theme = collection === "monitor" ? monitor : "log";
        db.pub(theme, { _id: id, _state: "-2" });
        return result;
      })
      .catch((error) => {
        throw error;
      });
  }
}

module.exports = LogLib;
