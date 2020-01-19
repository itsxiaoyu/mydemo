import axios from 'axios';

axios.defaults.timeout = 5000;
axios.defaults.baseURL ='';
// // 环境的切换
// if (process.env.NODE_ENV == 'development') {    
//     axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV == 'debug') {    
//     axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV == 'production') {    
//     axios.defaults.baseURL = '';
// }

//http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    config.data = JSON.stringify(config.data);
    config.headers = {
      // 'Content-Type':'application/x-www-form-urlencoded'
      'Content-Type':'application/json'

    }
    // if(token){
    //   config.params = {'token':token}
    // }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    if(response.data.errCode ==2){
      router.push({
        path:"/login",
        querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)

//  封装get方法,返回promise对象
export function get(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}
// 封装post请求
export function post(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.post(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}
// 封装getAwait方法,返回async方法
export async function getAwait(url,params={}){
  let res=await axios.get(url,{params:params})
  res=res.data
  return res
}
// 封装getAwait方法,返回async方法
export async function postAwait(url,data={}){
  let res=await axios.post(url,data)
  res=res.data
  return res
}
