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

//当前教练的学生列表
router.post('/api/myStudent',services.myStudent)

//课程安排
router.post('/api/myCourse',services.myCourse)

//所有学员信息
router.post('/api/student',services.student)

//添加学员
router.post('/api/addStudent',services.addStudent)

//删除学员信息
router.post('/api/deleteStudent',services.deleteStudent)

//更新学员信息
router.post('/api/updateStudent',services.updateStudent)

//
router.post('/api/myAppointment',services.myAppointment)

module.exports = router

