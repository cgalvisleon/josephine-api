const express = require("express");
const fs = require("fs");

function Api(app) {
  const router = express.Router();
  app.use("/", router);

  router.get("/stream", async function(req, res, next) {
    try {
      const src = fs.createReadStream("./big");
      src.pipe(res);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = Api;
