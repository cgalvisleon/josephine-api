function cors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Session, language, hostname, Timezone, Josephine_Key, josephine_key, Accept-Language"
  );
  next();
}

module.exports = cors;
