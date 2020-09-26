const { authorization } = require("../models/auth");
const response = require("../lib/response");

function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(200).json({ msg: "Usuario sin permisos" });
  }
  const token = req.headers.authorization.split(" ")[1];
  return authorization(token).then((result) => {
    if (!result.authorization) {
      return response.success(req, res, 401);
    } else {
      req.body["user_id"] = result.user_id;
      next();
    }
  });
}

module.exports = isAuth;
