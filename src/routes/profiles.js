const express = require("express");
const Service = require("../services/users");
const response = require("../lib/response");
const isAuth = require("../middleware/auth");

function Api(app) {
  const router = express.Router();
  app.use("/profile", isAuth);
  app.use("/profile", router);

  const service = new Service();

  router.get("/", async function (req, res, next) {
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

  router.post("/", async function (req, res, next) {
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
}

module.exports = Api;
