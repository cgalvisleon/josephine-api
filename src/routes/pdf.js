const express = require("express");
const Users = require("../services/users");

function Api(app) {
  const router = express.Router();
  app.use("/pdf", router);

  router.get("/users/:id", async function (req, res, next) {
    const { id } = req.params;
    const { state } = req.query;
    const { search } = req.query;
    const { page } = req.query;
    const { rows } = req.query;
    try {
      const service = new Users();
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
