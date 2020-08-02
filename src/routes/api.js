const express = require("express");
const response = require("../lib/response");
const Users = require("../services/users");
const Projects = require("../services/projects");
const Types = require("../services/types");
const { config } = require("../config/index");
const { encoding, decoding } = require("../models/auth");

function Api(app) {
  const router = express.Router();
  app.use("/", router);

  const version = {
    version: config.version,
    project: config.project,
    company: config.company,
    web: config.url,
  };

  const users = new Users();
  const projects = new Projects();
  const types = new Types();

  router.get("/", async function (req, res, next) {
    try {
      res.status(200).json(version);
    } catch (err) {
      next(err);
    }
  });

  router.get("/encoding/:payload", async function (req, res, next) {
    const { payload } = req.params;
    const { secret } = req.query;
    try {
      const key = encoding(payload, secret);
      res.status(200).json({ key });
    } catch (err) {
      next(err);
    }
  });

  router.get("/decoding/:key", async function (req, res, next) {
    const { key } = req.params;
    const { secret } = req.query;
    try {
      const payload = decoding(key, secret);
      res.status(200).json({ payload });
    } catch (err) {
      next(err);
    }
  });

  router.post("/signin", async function (req, res, next) {
    const { username } = req.body;
    const { password } = req.body;
    const { app } = req.body;
    try {
      const results = await users.signIn({ username, password, app });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.get("/valid/:username", async function (req, res, next) {
    const { username } = req.params;
    try {
      const results = await users.valid({ username });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.post("/signup", async function (req, res, next) {
    const { username } = req.body;
    const { password } = req.body;
    const { confirmation } = req.body;
    const { caption } = req.body;
    const { project } = req.body;
    const { module_id } = req.body;
    const { city_id } = req.body;
    const { code } = req.body;
    const { app } = req.body;
    try {
      const results = await users.signup({
        username,
        password,
        confirmation,
        caption,
        project,
        module_id,
        city_id,
        code,
        app,
      });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.post("/forgot", async function (req, res, next) {
    const { username } = req.body;
    const { password } = req.body;
    const { confirmation } = req.body;
    const { code } = req.body;
    const { app } = req.body;
    try {
      const results = await users.forgot({
        username,
        password,
        confirmation,
        code,
        app,
      });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.post("/message", async function (req, res, next) {
    const { theme } = req.body;
    const { message } = req.body;
    try {
      socket.io.emit(theme, { message });
      const status = 200;
      req = { message };
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.get("/dpas/:id", async function (req, res, next) {
    const { id } = req.params;
    try {
      const results = await projects.dpa({ id });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });

  router.get("/dpas", async function (req, res, next) {
    const { id } = req.query;
    const { _class } = req.query;
    const { state } = req.query;
    const { search } = req.query;
    const { page } = req.query;
    const { rows } = req.query;
    try {
      const results = await projects.dpas({
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

  router.get("/types", async function (req, res, next) {
    const { id } = req.query;
    const { _class } = req.query;
    const { state } = req.query;
    const { search } = req.query;
    const { page } = req.query;
    const { rows } = req.query;
    try {
      const results = await types.list({
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

  router.post("/issues", async function (req, res, next) {
    const { username } = req.body;
    const { access } = req.body;
    const { use } = req.body;
    try {
      const results = await users.issues({ username, access, use });
      const status = results.status;
      req = results.results;
      response.success(req, res, status);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = Api;
