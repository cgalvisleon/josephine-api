const express = require("express");
const response = require("../lib/response");

function Api(app) {
  const router = express.Router();
  app.use("/webhook", router);

  router.get("", async function(req, res, next) {
    //const { id } = req.params;
    try {
      const results = { status: 200, results: {} };
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.post("", async function(req, res, next) {
    //const { id } = req.params;
    //const { body: params } = req;
    try {
      const results = { status: 200, results: {} };
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = Api;
