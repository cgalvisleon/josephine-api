const express = require("express");
const Service = require("../services/projects");
const response = require("../lib/response");
const isAuth = require("../middleware/auth");

function Api(app) {
  const router = express.Router();
  app.use("/prints", isAuth);
  app.use("/projects", router);

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

  router.get("/types/:id", async function (req, res, next) {
    const { id } = req.params;
    const { _class } = req.query;
    const { state } = req.query;
    const { search } = req.query;
    const { page } = req.query;
    const { rows } = req.query;
    try {
      const results = await service.types({
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

  router.get("/users/:id", async function (req, res, next) {
    const { id } = req.params;
    const { state } = req.query;
    const { search } = req.query;
    const { page } = req.query;
    const { rows } = req.query;
    try {
      const results = await service.users({ id, state, search, page, rows });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.get("/contacts/:id", async function (req, res, next) {
    const { id } = req.params;
    const { state } = req.query;
    const { search } = req.query;
    const { page } = req.query;
    const { rows } = req.query;
    try {
      const results = await service.contacts({ id, state, search, page, rows });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.get("/warehouses/:id", async function (req, res, next) {
    const { id } = req.params;
    try {
      const results = await service.warehouse({ id });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.get("/cellars/:id", async function (req, res, next) {
    const { id } = req.params;
    const { state } = req.query;
    const { search } = req.query;
    const { page } = req.query;
    const { rows } = req.query;
    try {
      const results = await service.cellars({ id, state, search, page, rows });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.get("/references/:id", async function (req, res, next) {
    const { id } = req.params;
    const { state } = req.query;
    const { search } = req.query;
    const { page } = req.query;
    const { rows } = req.query;
    try {
      const results = await service.references({
        id,
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

  router.get("/typeReferences/:id", async function (req, res, next) {
    const { id } = req.params;
    const { _class } = req.query;
    const { state } = req.query;
    const { search } = req.query;
    const { page } = req.query;
    const { rows } = req.query;
    try {
      const results = await service.typeReferences({
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

  router.get("/documents/:id", async function (req, res, next) {
    const { id } = req.params;
    const { _class } = req.query;
    const { state } = req.query;
    const { search } = req.query;
    const { page } = req.query;
    const { rows } = req.query;
    try {
      const results = await service.documents({
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

  router.get("/document/:id", async function (req, res, next) {
    const { id } = req.params;
    const { _class } = req.query;
    try {
      const results = await service.document({ _class, id });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.get("/kardex/:cellar_id", async function (req, res, next) {
    const { cellar_id } = req.params;
    const { search } = req.query;
    const { page } = req.query;
    const { rows } = req.query;
    try {
      const results = await service.kardex({ cellar_id, search, page, rows });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.get("/stocks/:cellar_id", async function (req, res, next) {
    const { cellar_id } = req.params;
    const { search } = req.query;
    const { page } = req.query;
    const { rows } = req.query;
    try {
      const results = await service.stocks({ cellar_id, search, page, rows });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.get("/cellars/xls/:id", async function (req, res, next) {
    const { id } = req.params;
    const { state } = req.query;
    const { search } = req.query;
    const { page } = req.query;
    const { rows } = req.query;
    const { to } = req.query;
    const { username } = req.query;
    try {
      const results = await service.xlsCellars({
        id,
        state,
        search,
        page,
        rows,
        to,
        username,
      });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.get("/pdf/users/:id", async function (req, res, next) {
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
