import { get,post,getAwait,postAwait} from './http'
let BASE_URL =  'http://localhost:4000' 

/////////////////mock方式api//////////////////////////
//home页面表格信息
export  function getUserInfo(param){
	return getAwait('/getUser',param)
}
//管理员菜单
export  function getMenu1(param){
	return getAwait('/getMenu1',param)
}
//user
export  function getMenu2(param){
	return getAwait('/getMenu2',param)
}
//////////////////mock方式api结束/////////////////////////
//登录
export function getLogin({...param}){
	return postAwait(BASE_URL+'/api/login',{...param})
}
//更新登录
export function getUpdateLogin({...param}){
	return postAwait(BASE_URL+'/api/updateLogin',{...param})
}
//首页待办事项
export function getTodo({...param}){
	return postAwait(BASE_URL+'/api/todo',{...param})
}
//添加首页待办事项
export function getAddTodo({...param}){
	return postAwait(BASE_URL+'/api/addTodo',{...param})
}
//删除首页待办事项
export function getDeleteTodo({...param}){
	return postAwait(BASE_URL+'/api/deleteTodo',{...param})
}
//教练信息
export function getTeacher({...param}){
	return postAwait(BASE_URL+'/api/teacher',{...param})
}
//添加教练信息
export function getAddTeacher({...param}){
	return postAwait(BASE_URL+'/api/addTeacher',{...param})
}
//删除教练
export function getDeleteTeacher({...param}){
	return postAwait(BASE_URL+'/api/deleteTeacher',{...param})
}
//更新教练列表
export function getUpdateTeacher({...param}){
	return postAwait(BASE_URL+'/api/updateTeacher',{...param})
}
//当前教练的学生信息
export function getMyStudent({...param}){
	return postAwait(BASE_URL+'/api/myStudent',{...param})
}
//课程安排
export function getMyCourse({...param}){
	return postAwait(BASE_URL+'/api/myCourse',{...param})
}
//所有学生信息
export function getStudent({...param}){
	return postAwait(BASE_URL+'/api/student',{...param})
}
//添加学员信息
export function getAddStudent({...param}){
	return postAwait(BASE_URL+'/api/addStudent',{...param})
}
//删除学员信息
export function getDeleteStudent({...param}){
	return postAwait(BASE_URL+'/api/deleteStudent',{...param})
}
//更新学员信息
export function getUpdateStudent({...param}){
	return postAwait(BASE_URL+'/api/updateStudent',{...param})
}
//查看此学员预约
export function getMyAppointment({...param}){
	return postAwait(BASE_URL+'/api/myAppointment',{...param})
}
//查看未交费学员
export function getNotPaying({...param}){
	return postAwait(BASE_URL+'/api/notPaying',{...param})
}
//查看所有评价
export function getComment({...param}){
	return postAwait(BASE_URL+'/api/comment',{...param})
}
//添加评价
export function getAddComment({...param}){
	return postAwait(BASE_URL+'/api/addComment',{...param})
}
//查看公告
export function getRelease({...param}){
	return postAwait(BASE_URL+'/api/release',{...param})
}
//删除公告
export function getDeleteRelease({...param}){
	return postAwait(BASE_URL+'/api/deleteRelease',{...param})
}
//添加公告
export function getAddRelease({...param}){
	return postAwait(BASE_URL+'/api/addRelease',{...param})
}
//查看登录学生信息
export function getLoginStudent({...param}){
	return postAwait(BASE_URL+'/api/loginStudent',{...param})
}
//预约教练
export function getAppointTeacher({...param}){
	return postAwait(BASE_URL+'/api/appointTeacher',{...param})
}
//更新user信息
export function getUpdateUser({...param}){
	return postAwait(BASE_URL+'/api/updateUser',{...param})
}