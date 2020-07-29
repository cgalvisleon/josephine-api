const Model = require('../models/types')

class Service {
  constructor() {
  }

  async get({ id }) {
    const params = { _id: id }
    const model = new Model(params)
    return await model.get()
  }

  async set({ id, params } = {}) {
    params._id = id
    const model = new Model(params)
    return await model.set()
  }
  
  async state({ id, state }) {
    const params = { _id: id }
    const model = new Model(params)
    return await model.state(state)
  }

}

module.exports = Service