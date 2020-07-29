const Model = require('../models/aws')

class Service {
  constructor() {   
  }

  async sendSMS({ cellPhone, subject, message } = {}) {
    const model = new Model({})
    return await model.sendSMS(cellPhone, subject, message)
  }

}

module.exports = Service