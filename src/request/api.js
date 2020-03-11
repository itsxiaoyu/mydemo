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
//渲染教练列表
export function getTeacher({...params}){
	return postAwait(BASE_URL+'/api/teacher',{...params})
}

export function getaddteacher({...params}){
	return postAwait(BASE_URL+'/api/addteacher',{...params})
}
export function getupdateteacher({...params}){
	return postAwait(BASE_URL+'/api/updateteacher',{...params})
}
export function getMyStudent({...params}){
	return postAwait(BASE_URL+'/api/myStudent',{...params})
}
export function getMyCourse({...params}){
	return postAwait(BASE_URL+'/api/MyCourse',{...params})
}