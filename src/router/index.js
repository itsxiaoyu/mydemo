import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    //needLogin判断是否需要登录才可以进入
    { path: '/', component:()=>import('@/pages/login')},
    { path: '/login', component:()=>import('@/pages/login')},
    { 
      path: '/user',
      component:()=>import('@/pages/user'),
      meta:{needLogin:true},
      children:[
        {
          path:'/menu1',
          component:()=>import('@/pages/menu1'),
          meta:{needLogin:true},
        },
        {
          path:'/menu2',
          component:()=>import('@/pages/menu2'),
          meta:{needLogin:true},
        },
      ]
    },
    { 
      path: '/admin',
      component:()=>import('@/pages/admin'),
      meta:{needLogin:true},
      children:[
        {
          path:'/index',
          name:'index',
          component:()=>import('@/pages/index'),
          meta:{needLogin:true,title:'首页'},
        },
        {
          path:'/menu3',
          name:'menu3',
          component:()=>import('@/pages/menu3'),
          meta:{needLogin:true,title:'教练列表'},

        },
        {
          path:'/menu4',
          name:'menu4',
          component:()=>import('@/pages/menu4'),
          meta:{needLogin:true,title:'请假记录'},

        },
      ]
    },
  ]
})
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}