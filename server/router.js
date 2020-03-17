const express = require('express')
const router = express.Router()
const services = require('./services.js')
// router.get('/',services.start)
// 登录功能
router.post('/api/login',services.login)

// 更新登录信息
router.post('/api/updateLogin',services.updateLogin)

//首页待办事项列表
router.post('/api/todo',services.todo)

//添加首页待办事项列表
router.post('/api/addTodo',services.addTodo)

//删除首页待办事项列表
router.post('/api/deleteTodo',services.deleteTodo)

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

//查看此学员预约
router.post('/api/myAppointment',services.myAppointment)

//查看此学员预约
router.post('/api/notPaying',services.notPaying)

//查看所有评价
router.post('/api/comment',services.comment)

//添加评价
router.post('/api/addComment',services.addComment)

//查看所有公告
router.post('/api/release',services.release)

//删除公告
router.post('/api/deleteRelease',services.deleteRelease)

//添加公告
router.post('/api/addRelease',services.addRelease)

//登录学生信息
router.post('/api/loginStudent',services.loginStudent)

//预约教练
router.post('/api/appointTeacher',services.appointTeacher)

//更新user信息
router.post('/api/updateUser',services.updateUser)


module.exports = router

