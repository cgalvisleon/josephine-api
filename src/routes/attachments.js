const express = require("express");
const Service = require("../services/attachments");
const response = require("../lib/response");
//const isAuth = require('../middleware/auth');

function Api(app) {
  const router = express.Router();
  //app.use('/api/attachments', isAuth);
  app.use("/attachments", router);

  const service = new Service();

  router.get("/:id", async function (req, res, next) {
    const { id } = req.params;
    const { _class } = req.query;
    const { state } = req.query;
    const { search } = req.query;
    const { page } = req.query;
    const { rows } = req.query;
    try {
      const results = await service.getFiles({
        id,
        _class,
        state,
        search,
        page,
        rows,
      });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.post("/:project_id", async function (req, res, next) {
    const { project_id } = req.params;
    const { id } = req.body;
    const { object_id } = req.body;
    const { group_tp } = req.body;
    const { _class } = req.body;
    const { main_id } = req.body;
    const { caption } = req.body;
    const { description } = req.body;
    const { user_id } = req.body;
    const { filepath } = req.body;
    try {
      const results = await service.uploadFile({
        project_id,
        id,
        object_id,
        group_tp,
        _class,
        main_id,
        caption,
        description,
        user_id,
        filepath,
      });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.post("/base64/:project_id", async function (req, res, next) {
    const { project_id } = req.params;
    const { id } = req.body;
    const { object_id } = req.body;
    const { group_tp } = req.body;
    const { _class } = req.body;
    const { main_id } = req.body;
    const { caption } = req.body;
    const { description } = req.body;
    const { name } = req.body;
    const { ext } = req.body;
    const { size } = req.body;
    const { user_id } = req.body;
    const { base64 } = req.body;
    try {
      const results = await service.uploadBase64({
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
        base64,
      });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:object_id", async function (req, res, next) {
    const { object_id } = req.params;
    const { main_id } = req.body;
    try {
      const results = await service.deleteFile({ object_id, main_id });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = Api;
