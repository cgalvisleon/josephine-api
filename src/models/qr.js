const QrLib = require("../lib/qr");
const { respond } = require("../lib/utilities");

class Model {
  constructor() {
    this.qr = new QrLib();
  }

  async gen(value) {
    return await this.qr.genQRCode(value).then(result => {
      return respond(200, result);
    });
  }
}

module.exports = Model;
