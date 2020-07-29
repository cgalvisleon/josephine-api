const QRCode = require('qrcode');

class QrLib {
  constructor() {}

  async genQRCode(value) {
    return await QRCode.toDataURL(value)
      .then(url => {
        return url;
      })
      .catch(err => {
        return err.stack;
      });
  }
}

module.exports = QrLib;
