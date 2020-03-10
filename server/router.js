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

//添加教练
router.post('/api/addTeacher',services.addTeacher)

//删除教练
router.post('/api/deleteTeacher',services.deleteTeacher)

//更新教练列表
router.post('/api/updateTeacher',services.updateTeacher)

//学生列表
router.post('/api/myStudent',services.myStudent)

//课程安排
router.post('/api/myCourse',services.myCourse)


module.exports = router

