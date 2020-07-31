const XlsLib = require("../../lib/xls");
const xls = new XlsLib();
<<<<<<< HEAD

const report = async function (data) {
  const details = getValue(data, "details", []);
  const sendMail = getValue(data, "sendMail", false);
  const email = getValue(data, "email", "");

  xls.setData("Bodegas", details.list).then(() => {
    xls.saveFile(this._id, "bodegas.xlsx", to, this.user_id);
=======
const { getValue } = require("../../lib/utilities");

const report = async function (data) {
  const details = getValue(data, "details", []);
  const project_id = getValue(data, "project_id", "-1");
  const to = getValue(data, "to", "");
  const user_id = getValue(data, "user_id", "-1");

  xls.setData("Bodegas", details.list).then(() => {
    xls.saveFile(project_id, "bodegas.xlsx", to, user_id);
>>>>>>> projects
  });

  return await definition;
};

module.exports = report;
