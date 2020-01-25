module.exports = options => {
  return async (req, res, next) => {
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../modules/AdminUser')
    const assert = require('http-assert')
    assert(req.headers.authorization, 401, '请先登录')
    const token = String(req.headers.authorization).split(' ').pop()
    assert(token, 401, '请先登录')
    const {id} = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, '请先登录')
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请先登录')
    await next()
  }
}