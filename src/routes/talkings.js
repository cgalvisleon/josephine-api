const express = require("express");
const Service = require("../services/talkings");
const response = require("../lib/response");
const isAuth = require("../middleware/auth");

function Api(app) {
  const router = express.Router();
  app.use("/talkings", isAuth);
  app.use("/talkings", router);

  const service = new Service();

  router.get("/:id", async function (req, res, next) {
    const { id } = req.params;
    const { user_id } = req.body;
    const { search } = req.query;
    const { page } = req.query;
    const { rows } = req.query;
    try {
      const results = await service.talkings({
        id,
        user_id,
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

  router.get("/talk/:toId", async function (req, res, next) {
    const { toId } = req.params;
    const { user_id } = req.body;
    const { search } = req.query;
    const { page } = req.query;
    const { rows } = req.query;
    try {
      const results = await service.talk(toId, user_id, search, page, rows);
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.post("/talk/:toId", async function (req, res, next) {
    const { toId } = req.params;
    const { user_id } = req.body;
    const { message } = req.body;
    try {
      const results = await service.setTalk(toId, user_id, message);
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/talk/:id", async function (req, res, next) {
    const { id } = req.params;
    try {
      const results = await service.delTalk(id);
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = Api;
