const express = require("express");
const Service = require("../services/logs");
const response = require("../lib/response");
const isAuth = require("../middleware/auth");

function Api(app) {
  const router = express.Router();
  app.use("/logs", isAuth);
  app.use("/logs", router);

  const service = new Service();

  router.get("/", async function (req, res, next) {
    const { search } = req.query;
    const { rows } = req.query;
    const { page } = req.query;
    try {
      const results = await service.logs({ collection: "debug", search, rows, page });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:id", async function (req, res, next) {
    const { id } = req.params;
    try {
      const results = await service.get({ collection: "debug", id });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:id", async function (req, res, next) {
    const { id } = req.params;
    try {
      const results = await service.delete({ collection: "debug", id });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = Api;
