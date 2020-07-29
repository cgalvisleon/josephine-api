const PgLib = require("../lib/postgresql");
const debug = require("debug")("app:josephineQL");
const { respond, genId } = require("josephine/utilities");

class _object {
  constructor(_id) {
    this.date_make = new Date();
    this.date_update = this.date_make;
    this._id = genId(_id);
    this._v = 1;
  }
}

class Collections {
  constructor() {
    this.db = new PgLib();
    this.dictionary = {
      collections: [
        {
          name: "projects",
          label: "project",
        },
      ],
    };
  }

  data() {
    if (!Collections.data) {
      Collections.data = new Promise((resolve, reject) => {
        try {
          const project1 = new _object("37860631");
          project1.name = "Dploy";
          const project2 = new _object("37860632");
          project2.name = "Igestion";
          Collections.data = {
            projects: [project1, project2],
          };
          debug("Connected succesfully");
          resolve(Collections.data);
        } catch (err) {
          reject(err);
        }
      });
    }
    return Collections.data;
  }

  getCollectionName(label) {
    const index = this.dictionary.collections.findIndex((element) => element.label === label);
    if (index === -1) {
      return "";
    } else {
      return this.dictionary.collections[index].name;
    }
  }

  async getData(collection, _id) {
    collection = collection || "";
    _id = _id || "-1";
    if (collection === "") {
      return {};
    } else if (_id === "-1") {
      return {};
    } else {
      const db = await this.data();
      const data = db[collection] || [];
      const index = data.findIndex((element) => element._id === _id);
      if (index === -1) {
        return {};
      } else {
        return data[index];
      }
    }
  }

  async newData(_id, params) {
    const obj = new _object(_id);
    const keys = Object.keys(params);
    keys.forEach((key) => {
      if (typeof params[key] === "object") {
        const __id = params[key]._id || "-1";
        if (__id === "-1") {
          obj[key] = params[key];
        } else {
          const collection = this.getCollectionName(key);
          this.getData(collection, __id).then((result) => {
            obj[key] = result;
            return result;
          });
        }
      } else {
        obj[key] = params[key];
      }
    });
    return obj;
  }

  async setData(obj, params) {
    const keys = Object.keys(params);
    keys.forEach((key) => {
      if (typeof params[key] === "object") {
        const __id = params[key]._id || "-1";
        if (__id === "-1") {
          obj[key] = params[key];
        } else {
          const collection = this.getCollectionName(key);
          this.getData(collection, __id).then((result) => {
            obj[key] = result.name;
            return result;
          });
        }
      } else {
        obj[key] = params[key];
      }
    });
    obj._v = obj._v + 1;
    return obj;
  }

  async get(collection, _id) {
    collection = collection || "";
    _id = _id || "";
    if (collection === "") {
      return respond(200, {}, 400, "¡Colección requerida! - collection");
    } else if (_id === "") {
      return respond(200, {}, 400, "¡Identificador requerido! - _id");
    } else if (_id === "-1") {
      return respond(200, {}, 400, "¡Identificador requerido! - _id");
    } else {
      const db = await this.data();
      const data = db[collection] || [];
      const index = data.findIndex((element) => element._id === _id);
      if (index === -1) {
        return respond(200, {}, 400, "No existen datos");
      } else {
        const params = data[index];
        return respond(200, params);
      }
    }
  }

  async set(collection, _id, params) {
    collection = collection || "";
    _id = _id || "-1";
    params = params || {};
    if (collection === "") {
      return respond(200, {}, 400, "¡Colección requerida! - collection");
    } else {
      const db = await this.data();
      if (!db[collection]) {
        const obj = await this.newData(_id, params);
        db[collection] = [];
        db[collection].push(obj);
        return respond(200, obj);
      } else {
        const index = db[collection].findIndex((element) => element._id === _id);
        if (index === -1) {
          const obj = await this.newData(_id, params);
          db[collection].push(obj);
          return respond(200, obj);
        } else {
          let obj = db[collection][index];
          obj = await this.setData(obj, params);
          db[collection][index] = obj;
          return respond(200, obj);
        }
      }
    }
  }

  async state(collection, _id, _state) {
    collection = collection || "";
    _id = _id || "-1";
    _state = _state || "";
    if (collection === "") {
      return respond(200, {}, 400, "¡Colección requerida! - collection");
    } else if (_id === "-1") {
      return respond(200, {}, 400, "¡Identificador requerido! - _id");
    } else if (_state === "") {
      return respond(200, {}, 400, "Estado requerido! - _state (0, 1, 2)");
    } else {
      const db = await this.data();
      const data = db[collection] || [];
      const index = data.findIndex((element) => element._id === _id);
      if (index === -1) {
        return respond(200, {}, 400, "No existen datos");
      } else {
        const params = data[index];
        params.date_make = params.date_make || new Date();
        params.date_update = new Date();
        params.project_id = params.project_id || "-1";
        params._id = genId(_id);
        params._state = _state;
        params._v = params._v === undefined ? 1 : Number(params._v) + 1;
        return respond(200, params);
      }
    }
  }

  async query(collection, query) {
    collection = collection || "";
    query = query || "";
    if (collection === "") {
      return respond(200, {}, 400, "¡Colección requerida! - collection");
    } else {
      const db = await this.data();
      const data = db[collection] || [];
      const index = data.findIndex(query);
      if (index === -1) {
        return respond(200, {}, 400, "No existen datos");
      } else {
        const params = data[index];
        return respond(200, params);
      }
    }
  }
}

module.exports = Collections;
