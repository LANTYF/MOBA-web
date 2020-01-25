module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../modules/AdminUser')
  const assert = require('http-assert')
  const authMiddleware = require('../../middlewares/Auth')
  const resourceMiddleware = require('../../middlewares/resource')
  //新建资源
  router.post('/', authMiddleware(),async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  //资源列表
  router.get('/', authMiddleware(), async (req, res) => {
      const queryOptions = {}
      if (req.Model.modelName === 'Category') {
        queryOptions.populate = 'parents'
      }
      else if (req.Model.modelName === 'Article') {
        queryOptions.populate = 'categories'
      }
      const items = await req.Model.find().setOptions(queryOptions).limit(200)
      res.send(items)
  })

  //查找资源
  router.get('/:id', authMiddleware(),async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  //资源更新
  router.put('/:id', authMiddleware(),async (req, res) => {
    await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send()
  })

  //资源删除
  router.delete('/:id', authMiddleware(),async (req, res) => {
    const id = req.params.id
    await req.Model.findByIdAndRemove(id)
    res.send()
  })

  //通用接口
  app.use('/admin/api/test/:resource', authMiddleware(),resourceMiddleware(), router)

  //上传图片
  const multer = require('multer')
  const upload = multer({dest:__dirname + '/../../uploads'})
  app.post('/admin/api/upload', authMiddleware(),upload.single('file'),async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })  

  //管理员登录
  app.post('/admin/api/login', async(req, res) => {
    //1.判断用户
    const {username, password} = req.body
    const user = await AdminUser.findOne({username}).select('+password')
    assert(user, 422, '用户不存在')
    //2.验证密码
    const isValid = require('bcryptjs').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    //3.传递token
    const token = jwt.sign({id: user._id}, app.get('secret'))
    res.send({token})
  })

  //错误处理
  app.use( async (err, req, res, next) => {
    res.status(err.status || 500).send({message: err.message})
  })
}