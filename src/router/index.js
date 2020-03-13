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
      component:()=>import('@/pages/user/user'),
      meta:{needLogin:true},
      children:[
         {
          path:'/user/index',
          name:'user/index',
          component:()=>import('@/pages/user/index'),
          meta:{needLogin:true,title:'首页'},
        },
        {
          path:'/user/menu1',
          name:'user/menu1',
          component:()=>import('@/pages/user/menu1'),
          meta:{needLogin:true,title:'菜单1'},
        },
        {
          path:'/user/menu2',
          name:'user/menu2',
          component:()=>import('@/pages/user/menu2'),
          meta:{needLogin:true,title:'菜单2'},
        },
      ]
    },
    { 
      path: '/admin',
      component:()=>import('@/pages/admin/admin'),
      meta:{needLogin:true},
      children:[
        {
          path:'/admin/index',
          name:'admin/index',
          component:()=>import('@/pages/admin/index'),
          meta:{needLogin:true,title:'首页'},
        },
        {
          path:'/admin/teacherList',
          name:'admin/teacherList',
          component:()=>import('@/pages/admin/teacherList'),
          meta:{needLogin:true,title:'教练列表'},
        },
        {
          path:'/admin/studentList',
          name:'admin/studentList',
          component:()=>import('@/pages/admin/studentList'),
          meta:{needLogin:true,title:'学员列表'},
        },
        {
          path:'/admin/comment',
          name:'admin/comment',
          component:()=>import('@/pages/admin/comment'),
          meta:{needLogin:true,title:'评论汇总'},
        },
        {
          path:'/admin/release',
          name:'admin/release',
          component:()=>import('@/pages/admin/release'),
          meta:{needLogin:true,title:'发布公告'},
        },
        {
          path:'/admin/addRelease',
          name:'admin/addRelease',
          component:()=>import('@/pages/admin/addRelease'),
          meta:{needLogin:true,title:'新增公告'},
        },
        {
          path:'/admin/viewRelease',
          name:'admin/viewRelease',
          component:()=>import('@/pages/admin/viewRelease'),
          meta:{needLogin:true,title:'公告详情'},
        },
      ]
    },
  ]
})
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}