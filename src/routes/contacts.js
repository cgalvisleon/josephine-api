const express = require("express");
const Service = require("../services/contacts");
const response = require("../lib/response");
//const isAuth = require("../middleware/auth");

function Api(app) {
  const router = express.Router();
  //app.use("/contacts", isAuth);
  app.use("/contacts", router);

  const service = new Service();

  router.get("/", async function (req, res, next) {
    const { id } = req.query;
    const { state } = req.query;
    const { search } = req.query;
    const { page } = req.query;
    const { rows } = req.query;
    try {
      const results = await service.list({ id, state, search, page, rows });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = Api;
