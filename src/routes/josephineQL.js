const express = require("express");
const Service = require("../services/josephineQL");
const response = require("../lib/response");

function Api(app) {
  const router = express.Router();
  app.use("/josephinQL", router);

  const service = new Service();

  router.get("/:collection", async function (req, res, next) {
    const { collection } = req.params;
    const { _id } = req.query;
    try {
      const results = await service.get({ collection, _id });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.post("/:collection", async function (req, res, next) {
    const { collection } = req.params;
    const { body: params } = req;
    const { _id } = params;
    try {
      const results = await service.set({ collection, _id, params });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.patch("/:icollectiond", async function (req, res, next) {
    const { collection } = req.params;
    const { _id } = req.body;
    const { _state } = req.body;
    try {
      const results = await service.state({ collection, _id, _state });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.get("/query/:collection", async function (req, res, next) {
    const { collection } = req.params;
    const { query } = req.query;
    try {
      const results = await service.query({ collection, query });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = Api;
