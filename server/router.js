const express = require('express')
const router = express.Router()
const services = require('./services.js')
// router.get('/',services.start)
// 登录功能
router.post('/api/login',services.login)
// 注册功能
router.post('/api/register',services.register)
//教练列表
router.post('/api/teacher',services.teacher)
router.post('/api/addteacher',services.addteacher)
router.post('/api/updateteacher',services.updateteacher)
router.post('/api/myStudent',services.myStudent)
router.post('/api/myCourse',services.myCourse)

module.exports = router

