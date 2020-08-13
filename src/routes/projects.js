const express = require("express");
const Service = require("../services/projects");
const response = require("../lib/response");
const isAuth = require("../middleware/auth");

function Api(app) {
  const router = express.Router();
  app.use("/projects", isAuth);
  app.use("/projects", router);

  const service = new Service();

  router.get("/documents/", async function (req, res, next) {
    const { project_id } = req.query;
    const { _class } = req.query;
    const { state } = req.query;
    const { search } = req.query;
    const { page } = req.query;
    const { rows } = req.query;
    try {
      const results = await service.documents({
        project_id,
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

  router.get("/documents/:id", async function (req, res, next) {
    const { id } = req.params;
    const { _class } = req.query;
    try {
      const results = await service.document({ _class, id });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.get("/modules/:project_id", async function (req, res, next) {
    const { project_id } = req.params;
    try {
      const results = await service.modules({ project_id });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.post("/modules/:project_id", async function (req, res, next) {
    const { project_id } = req.params;
    const { module_id } = req.body;
    const { chk } = req.body;
    try {
      const results = await service.chkModules({ project_id, module_id, chk });
      const status = results.status;
      req = results.results;
      console.log(results);
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:id", async function (req, res, next) {
    const { id } = req.params;
    try {
      const results = await service.get({ id });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.post("/:id", async function (req, res, next) {
    const { id } = req.params;
    const { body: params } = req;
    try {
      const results = await service.set({ id, params });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.patch("/:id", async function (req, res, next) {
    const { id } = req.params;
    const { state } = req.body;
    try {
      const results = await service.state({ id, state });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = Api;
