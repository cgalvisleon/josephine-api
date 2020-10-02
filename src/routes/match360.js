const express = require("express");
const Service = require("../services/match360");
const response = require("../lib/response");
const isAuth = require("../middleware/auth");

function Api(app) {
  const router = express.Router();
  app.use("/match360", isAuth);
  app.use("/match360", router);

  const service = new Service();

  router.post("/", async function (req, res, next) {
    const { user_id } = req.body;
    const { token } = req.body;
    const { app } = req.body;
    try {
      const results = await service.signIn({ token, user_id, app });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = Api;
