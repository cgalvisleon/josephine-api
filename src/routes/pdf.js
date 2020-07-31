const express = require("express");
const Users = require("../services/users");

function Api(app) {
  const router = express.Router();
  app.use("/pdf", router);

  router.get("/users/:token", async function (req, res, next) {
    const { token } = req.params;
    const { state } = req.query;
    try {
      const service = new Users();
      await service.pdfUsers({ state, token }, function (binary) {
        res.setHeader("Content-type", "application/pdf");
        res.send(binary);
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = Api;
