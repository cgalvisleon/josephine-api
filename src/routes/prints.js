const express = require("express");
const Service = require("../services/prints");
const response = require("../lib/response");

function Api(app) {
  const router = express.Router();
  app.use("/api", router);

  const service = new Service();

  router.get("/prints/:project_id", async function(req, res, next) {
    const { project_id } = req.params;
    const { _class } = req.query;
    const { single } = req.query;
    try {
      const results = await service.list({ project_id, _class, single });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = Api;
