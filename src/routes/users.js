const express = require("express");
const Service = require("../services/users");
const response = require("../lib/response");
const isAuth = require("../middleware/auth");

function Api(app) {
  const router = express.Router();
  app.use("/users", isAuth);
  app.use("/users", router);

  const service = new Service();

  router.get("/:id", async function (req, res, next) {
    const { id } = req.params;
    const { project_id } = req.query;
    try {
      const results = await service.user({ id, project_id });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

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

  router.post("/password", async function (req, res, next) {
    const { user_id } = req.body;
    const { password } = req.body;
    const { confirmation } = req.body;
    try {
      const results = await service.setPassword(user_id, password, confirmation);
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.get("/folders/:id", async function (req, res, next) {
    const { id } = req.params;
    const { user_id } = req.body;
    try {
      const results = await service.folders({ user_id, id });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.post("/:project_id", async function (req, res, next) {
    const { project_id } = req.params;
    const { username } = req.body;
    const { caption } = req.body;
    const { profile_tp } = req.body;
    const { user_id } = req.body;
    try {
      const results = await service.set(username, caption, project_id, profile_tp, user_id);
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.patch("/finish/:id", async function (req, res, next) {
    const { id } = req.params;
    const { project_id } = req.body;
    try {
      const results = await service.finish(id, project_id);
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.get("/typehead/:search", async function (req, res, next) {
    const { search } = req.params;
    try {
      const results = await service.auto(search);
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:session", async function (req, res, next) {
    const { session } = req.params;
    try {
      const results = await service.delete({ session });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.get("/pdf/:id", async function (req, res, next) {
    const { id } = req.params;
    const { state } = req.query;
    const { search } = req.query;
    const { page } = req.query;
    const { rows } = req.query;
    try {
      await service.pdfUsers({ id, state, search, page, rows }, function (binary) {
        res.setHeader("Content-type", "application/pdf");
        res.send(binary);
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = Api;
