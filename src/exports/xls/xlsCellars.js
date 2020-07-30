const XlsLib = require("../../lib/xls");
const xls = new XlsLib();

const report = async function (data) {
  const details = getValue(data, "details", []);
  const sendMail = getValue(data, "sendMail", false);
  const email = getValue(data, "email", "");

  xls.setData("Bodegas", details.list).then(() => {
    xls.saveFile(this._id, "bodegas.xlsx", to, this.user_id);
  });

  return await definition;
};

module.exports = report;
