const jwt = require("jwt-simple");
const getUnixTime = require("date-fns/getUnixTime");
const { config } = require("../config");
const PgLib = require("../lib/postgresql");
const db = new PgLib();

function encoding(sub, secret) {
  try {
    let payload = {
      sub: sub,
    };
    return jwt.encode(payload, secret);
  } catch (err) {
    return { err };
  }
}

function decoding(token, secret) {
  try {
    return jwt.decode(token, secret, true);
  } catch (err) {
    return { err };
  }
}

function encode(payload) {
  try {
    return encoding(payload, config.secret);
  } catch (err) {
    return { err };
  }
}

function decode(token) {
  try {
    return decoding(token, config.secret);
  } catch (err) {
    return { err };
  }
}

async function getToken(userId, app) {
  const now = new Date();
  let payload = {
    iat: getUnixTime(now),
    sub: userId,
    app: app,
  };
  const token = encode(payload);
  const query = "SELECT * FROM match360.REG_TOKEN($1, $2, $3) RESULT";
  const params = [userId, app, token];
  return await db
    .post(query, params)
    .then(() => {
      const res = { token };
      db.pub(`match360/${app}/${userId}`, res);
      return res;
    })
    .catch(() => {
      return {};
    });
}

async function authorization(token) {
  const query = "SELECT * FROM match360.CHECK_TOKEN($1) RESULT";
  const params = [token];
  return await db
    .get(query, params)
    .then((result) => {
      const res = result.result;
      if (res === "-1") {
        return { authorization: false, user_id: "-1" };
      } else {
        return { authorization: true, user_id: res };
      }
    })
    .catch(() => {
      return { authorization: false, user_id: "-1" };
    });
}

async function userId(token) {
  const query = "SELECT * FROM match360.CHECK_TOKEN($1) RESULT";
  const params = [token];
  return await db
    .get(query, params)
    .then((result) => {
      return result;
    })
    .catch(() => {
      return "-1";
    });
}

module.exports = {
  encoding,
  decoding,
  encode,
  decode,
  getToken,
  authorization,
  userId,
};
