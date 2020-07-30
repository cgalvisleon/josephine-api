const PgLib = require('../lib/postgresql');
const db = new PgLib();

async function clearUserValid() {
  const query = 'SELECT * FROM js_core.CLEAR_USER_ISVALID() RESULT';
  const params = [];
  return await db
    .post(query, params)
    .then(result => {
      return result.result;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

module.exports = { clearUserValid };
