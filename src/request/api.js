import { get,post,getAwait,postAwait} from './http'
let BASE_URL =  'http://localhost:4000' 
//登录
export function getLogin(username,password){
	return postAwait(BASE_URL+'/api/login',username,password)
}
//home页面表格信息
export  function getUserInfo(param){
	return getAwait('/getUser',param)
}
//管理员菜单
export  function getMenu1(param){
	return getAwait('/getMenu1',param)
}
export  function getMenu2(param){
	return getAwait('/getMenu2',param)
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
//
export function getMyAppointment({...param}){
	return postAwait(BASE_URL+'/api/myAppointment',{...param})
}