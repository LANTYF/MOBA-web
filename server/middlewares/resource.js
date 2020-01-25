module.exports = options => {
  return async (req, res, next) => {
    const inflection = require('inflection')

    const modelname = inflection.classify(req.params.resource)
    req.Model = require(`../modules/${modelname}`)
    next()
  }
}