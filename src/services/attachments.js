const Model = require("../models/aws");

class Service {
  constructor() {}

  async uploadFile({ project_id, id, object_id, group_tp, _class, main_id, caption, description, user_id, filepath }) {
    const model = new Model();
    return await model.uploadFile(project_id, id, object_id, group_tp, _class, main_id, caption, description, user_id, filepath);
  }

  async uploadBase64({ project_id, id, object_id, group_tp, _class, main_id, caption, description, name, ext, size, user_id, base64 }) {
    const model = new Model();
    return await model.uploadBase64(
      project_id,
      id,
      object_id,
      group_tp,
      _class,
      main_id,
      caption,
      description,
      name,
      ext,
      size,
      user_id,
      base64
    );
  }

  async deleteFile({ object_id, main_id }) {
    const model = new Model();
    return await model.deleteFile(object_id, main_id);
  }

  async getFiles({ id, _class, state, search, page, rows }) {
    const model = new Model({});
    return await model.getFiles(id, _class, state, search, page, rows);
  }
}

module.exports = Service;
