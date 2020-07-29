const Model = require('../models/mailer')

class Service {
  constructor() {   
  }

  async sendMail({ key, to, subject, text, html }) {
    const params = { key: key }
    const model = new Model(params)
    return await model.sendMail(to, subject, text, html)
  }

}

module.exports = Service