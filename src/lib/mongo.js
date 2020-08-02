const { MongoClient } = require("mongodb");
const { config } = require("../config/index");
const { socket } = require("./socket");
const debug = require("debug")("app:db:mongo");
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
const DB_URI = config.dev
  ? `mongodb://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`
  : `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.type = "MongoDB";
    this.db = new MongoClient(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.db.connect((err) => {
          if (err) {
            reject(err);
          }
          debug("Connected succesfully to mongo");
          resolve(this.db.db(this.dbName));
        });
      });
    }
    return MongoLib.connection;
  }

  createCollection(name) {
    return this.connect().then((db) => {
      return db.createCollection(name);
    });
  }

  createIndex(collection, name, params) {
    return this.connect().then((db) => {
      return db.collection(collection).createIndex(name, params || {});
    });
  }

  async select(collection, query, rows, offset, sort) {
    query = query || "";
    rows = rows || 1;
    offset = offset || 0;
    sort = sort || "";
    return await this.connect().then((db) => {
      if (Number(rows) === 1) {
        return db.collection(collection).findOne(query);
      } else {
        return db.collection(collection).find(`{${query}}`).limit(Number(rows)).sort(sort).toArray();
      }
    });
  }

  async insert(collection, params) {
    return await this.connect().then((db) => {
      if (Array.isArray(params)) {
        let results = [];
        for (let i = 0; i < params.length; i++) {
          const param = params[i];
          results[i] = this.insert(collection, param);
        }
        return results;
      } else {
        try {
          return db.collection(collection).insertOne(params);
        } catch (err) {
          return { err };
        }
      }
    });
  }

  async update(collection, query, params, upsert) {
    return await this.connect().then((db) => {
      return db.collection(collection).updateOne(query, { $set: params }, { upsert: upsert });
    });
  }

  async delete(collection, query) {
    return await this.connect().then((db) => {
      return db.collection(collection).deleteMany(query);
    });
  }

  pub(theme, res) {
    socket.io.emit(theme, res);
  }
}

module.exports = MongoLib;
