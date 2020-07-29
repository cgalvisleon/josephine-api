const { verify } = require("../models/auth");
const response = require("../lib/response");

function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(200).json({ msg: "Usuario sin permisos" });
    //return response.success(req, res, 401);
  }
  if (!req.headers.session) {
    return res.status(200).json({ msg: "Usuario sin permisos - Session" });
    //return response.success(req, res, 401);
  }
  const token = req.headers.authorization.split(" ")[1];
  const session = req.headers.session;
  return verify(token, session).then(result => {
    if (!result.verify) {
      return response.success(req, res, 401);
    } else {
      req.body["user_id"] = result.user_id;
      next();
    }
  });
}

module.exports = isAuth;
