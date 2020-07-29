const express = require("express");
const Service = require("../services/users");
const response = require("../lib/response");
const isAuth = require("../middleware/auth");

function Api(app) {
  const router = express.Router();
  app.use("/api/users", isAuth);
  app.use("/api/users", router);

  const service = new Service();

  router.get("/user/:id", async function(req, res, next) {
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

  router.get("/profile", async function(req, res, next) {
    const { user_id } = req.body;
    try {
      const results = await service.profile({ id: user_id });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.post("/profile", async function(req, res, next) {
    const { user_id } = req.body;
    const { caption } = req.body;
    const { description } = req.body;
    const { cellphone } = req.body;
    const { phone } = req.body;
    const { email } = req.body;
    const { country_id } = req.body;
    const { city_id } = req.body;
    const { address } = req.body;
    const { identification_tp } = req.body;
    const { identification } = req.body;
    const { _data } = req.body;
    try {
      const results = await service.setProfile(
        user_id,
        caption,
        description,
        cellphone,
        phone,
        email,
        country_id,
        city_id,
        address,
        identification_tp,
        identification,
        _data
      );
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.post("/password", async function(req, res, next) {
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

  router.get("/folders/:id", async function(req, res, next) {
    const { id } = req.params;
    const { user_id } = req.body;
    try {
      const results = await service.folders({ id, user_id });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.post("/:project_id", async function(req, res, next) {
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

  router.patch("/finish/:id", async function(req, res, next) {
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

  router.get("/typehead/:search", async function(req, res, next) {
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

  router.delete("/:session", async function(req, res, next) {
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

  router.get("/stock/:id", async function(req, res, next) {
    const { id } = req.params;
    const { document_id } = req.query;
    const { reference_id } = req.query;
    try {
      const results = await service.stock({ id, document_id, reference_id });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.get("/stocks/:id", async function(req, res, next) {
    const { id } = req.params;
    const { document_id } = req.query;
    const { search } = req.query;
    const { page } = req.query;
    const { rows } = req.query;
    try {
      const results = await service.stocks({
        id,
        document_id,
        search,
        page,
        rows
      });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = Api;
