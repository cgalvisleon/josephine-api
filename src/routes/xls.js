const express = require("express");
const Users = require("../services/users");
const response = require("../lib/response");

function Api(app) {
  const router = express.Router();
  app.use("/xls", router);
  const service = new Users();
}

module.exports = Api;
