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
