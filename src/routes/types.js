const express = require("express");
const Service = require("../services/types");
const response = require("../lib/response");

function Api(app) {
  const router = express.Router();
  app.use("/types", router);

  const service = new Service();

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

  router.get("/", async function (req, res, next) {
    const { id } = req.query;
    const { _class } = req.query;
    const { state } = req.query;
    const { search } = req.query;
    const { page } = req.query;
    const { rows } = req.query;
    try {
      const results = await service.list({
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
