import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import User from '@/pages/user'
import Admin from '@/pages/admin'
import Menu1 from '@/pages/menu1'
import Menu2 from '@/pages/menu2'
import Menu3 from '@/pages/menu3'
import Menu4 from '@/pages/menu4'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: User ,meta:{needLogin:true}},//needLogin判断是否需要登录才可以进入
    { path: '/login', component: Login },
    { 
      path: '/user',
      component: User,
      meta:{needLogin:true},
      children:[
        {
          path:'/menu1',
          component:Menu1
        },
        {
          path:'/menu2',
          component:Menu2
        },
      ]
    },
    { 
      path: '/admin',
      component: Admin,
      meta:{needLogin:true},
      children:[
        {
          path:'/index',
          component:()=>import('@/pages/index')
        },
        {
          path:'/menu3',
          component:Menu3
        },
        {
          path:'/menu4',
          component:Menu4
        },
      ]
    },
  ]
})
