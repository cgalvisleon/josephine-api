const jwt = require("jwt-simple");
const getUnixTime = require("date-fns/getUnixTime");
const { config } = require("../config");
const PgLib = require("../lib/postgresql");
const db = new PgLib();

function encoding(payload, secret) {
  try {
    return jwt.encode(payload, secret);
  } catch (err) {
    return { err };
  }
}

function decoding(key, secret) {
  try {
    return jwt.decode(key, secret);
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

async function getSession(userId, app) {
  const now = new Date();
  let payload = {
    sub: userId,
    app: app,
  };
  const session = encode(payload);
  payload.iat = getUnixTime(now);
  const token = encode(payload);
  const query = "SELECT * FROM js_core.REG_TOKEN($1, $2, $3, $4) RESULT";
  const params = [userId, app, token, session];
  return await db
    .post(query, params)
    .then(() => {
      const res = { token, session };
      db.pub(`tokens/${session}`, res);
      return res;
    })
    .catch(() => {
      return {};
    });
}

async function verify(token, session) {
  const query = "SELECT * FROM js_core.CHECK_TOKEN($1, $2) RESULT";
  const params = [token, session];
  return await db
    .get(query, params)
    .then((result) => {
      const res = result.result;
      if (res === "-1") {
        return { verify: false, user_id: "-1" };
      } else {
        return { verify: true, user_id: res };
      }
    })
    .catch(() => {
      return { verify: false, user_id: "" };
    });
}

async function userId(session) {
  const query = "SELECT * FROM js_core.SESSION_USER_ID($1) RESULT";
  const params = [session];
  return await db
    .get(query, params)
    .then((result) => {
      return result;
    })
    .catch(() => {
      return "-1";
    });
}

async function getSecret(id, group) {
  const now = new Date();
  const token = getUnixTime(now);
  const query = "SELECT * FROM js_core.REG_TOKEN($1, $2, $3, $4) RESULT";
  const params = [id, `secret/${group}`, token.toString(), token.toString()];
  return await db
    .post(query, params)
    .then(() => {
      return { token };
    })
    .catch(() => {
      return {};
    });
}

function cleanSecret(group) {
  const query = "SELECT * FROM js_core.CLEAN_SECRET($1) RESULT";
  const params = [`secret/${group}`];
  return db
    .post(query, params)
    .then(() => {
      return {};
    })
    .catch(() => {
      return {};
    });
}

async function secret(token) {
  const query = "SELECT * FROM js_core.GET_SECRET($1) RESULT";
  const params = [token];
  return await db
    .get(query, params)
    .then((result) => {
      return result.result;
    })
    .catch(() => {
      return "-1";
    });
}

module.exports = {
  encode,
  decode,
  getSession,
  getSecret,
  verify,
  userId,
  secret,
  cleanSecret,
};
